import supertest from 'supertest';
import app from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, dropDB } from './utils/connectMemoryDB';
import cookie from 'cookie';

let db: MongoMemoryServer | null = null;
const authRoute = '/api/auth';

const mockData = {
  newUser: {
    email: 'test@test.com',
    firstName: 'My',
    lastName: 'Test',
    password: '123456',
    passwordConfirmation: '123456',
  },
  newUserDuplicate: {
    email: 'test@test.com',
    firstName: 'John',
    lastName: 'Lennon',
    password: '456789',
    passwordConfirmation: '456789',
  },
};

let newUserId = '';
let validCookie: string[] = [];

describe('authentication and authorization', () => {
  beforeAll(async () => {
    db = await connectDB();
  });

  afterAll(async () => {
    await dropDB(db);
  });

  describe(`POST ${authRoute}/register - user register`, () => {
    describe('given an invalid request body', () => {
      it('should return a 400 with errors', async () => {
        const payload = {
          firstName: 'John',
          lastName: 'Test',
          password: '123456',
          passwordConfirmation: '123456',
        };

        const response = await supertest(app)
          .post(`${authRoute}/register`)
          .send(payload);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(['Email is required']);
      });
    });

    describe('given a valid request body', () => {
      it('should create user with response of 201', async () => {
        const response = await supertest(app)
          .post(`${authRoute}/register`)
          .send(mockData.newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          _id: expect.any(String),
          email: mockData.newUser.email,
          firstName: mockData.newUser.firstName,
          lastName: mockData.newUser.lastName,
          roles: ['User'],
        });

        // set userid for future tests
        newUserId = response.body._id;
      });

      it('should not create a duplicate user with same email throwing a 409', async () => {
        const response = await supertest(app)
          .post(`${authRoute}/register`)
          .send(mockData.newUserDuplicate);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ error: 'User email already in use' });
      });
    });
  });

  describe(`POST ${authRoute}/login - user login`, () => {
    describe('given an invalid request body', () => {
      it('should return a 400 with errors', async () => {
        const payload = {
          email: 'test@test.com',
        };

        const response = await supertest(app)
          .post(`${authRoute}/login`)
          .send(payload);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(['Password is required']);
      });
    });

    describe('given an valid request body', () => {
      it('should return a 401 if the credentials are invalid', async () => {
        const payload = {
          email: 'test@test.com',
          password: '654321',
        };

        const response = await supertest(app)
          .post(`${authRoute}/login`)
          .send(payload);

        expect(response.status).toEqual(401);
        expect(response.body.error).toBe('Invalid credentials');
      });

      it('should return 200 if the credentials are valid, respond with body user and access token, set the cookie with refresh token', async () => {
        const payload = {
          email: 'test@test.com',
          password: '123456',
        };

        const response = await supertest(app)
          .post(`${authRoute}/login`)
          .send(payload);

        expect(response.status).toEqual(200);

        // Store it for later tests
        validCookie = response.headers['set-cookie'];

        const cookieParsed = cookie.parse(response.headers['set-cookie'][0]);

        expect(cookieParsed.jwt).toBeTruthy();

        expect(response.body.user).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
          firstName: 'My',
          lastName: 'Test',
          roles: ['User'],
        });

        expect(response.body.accessToken).toEqual(expect.any(String));
      });
    });
  });

  describe(`POST ${authRoute}/refresh - renew access token`, () => {
    describe('given an invalid cookie', () => {
      it('should return a 401', async () => {
        const response = await supertest(app)
          .post(`${authRoute}/refresh`)
          .set('Cookie', ['jwt=testing']);

        expect(response.status).toEqual(401);
        expect(response.body.error).toBe('Invalid/Expired session');
      });
    });

    describe('given an valid cookie', () => {
      it('should return a 200 with the new access token', async () => {
        const response = await supertest(app)
          .post(`${authRoute}/refresh`)
          .set('Cookie', validCookie);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          user: {
            _id: expect.any(String),
            email: 'test@test.com',
            firstName: 'My',
            lastName: 'Test',
            roles: ['User'],
          },
          accessToken: expect.any(String),
        });
      });
    });
  });

  describe(`POST ${authRoute}/logout - logout user`, () => {
    describe('given an invalid cookie', () => {
      it('should return a 401', async () => {
        const response = await supertest(app)
          .post(`${authRoute}/refresh`)
          .set('Cookie', ['test=testing']);

        expect(response.status).toEqual(401);
      });
    });

    describe('given an valid cookie', () => {
      it('should return a 204 and delete cookie', async () => {
        const response = await supertest(app)
          .post(`${authRoute}/logout`)
          .set('Cookie', validCookie);

        expect(response.status).toEqual(204);

        const parsedCookie = cookie.parse(response.headers['set-cookie'][0]);

        expect(parsedCookie).toEqual(
          expect.objectContaining({
            jwt: '',
            Expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
          })
        );
      });
    });
  });
});
