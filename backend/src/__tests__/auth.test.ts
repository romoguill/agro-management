import supertest from 'supertest';
import app from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, dropDB } from './utils/connectMemoryDB';

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
          roles: ['user'],
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
});
