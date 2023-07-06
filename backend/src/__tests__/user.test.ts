import supertest from 'supertest';
import app from '../app';
import { connectDB, clearCollections, dropDB } from './utils/connectMemoryDB';
import { MongoMemoryServer } from 'mongodb-memory-server';

let db: MongoMemoryServer | null = null;

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

describe('user', () => {
  beforeAll(async () => {
    db = await connectDB();
  });

  afterAll(async () => {
    await dropDB(db);
  });

  describe('POST /api/user - user creation', () => {
    // beforeAll(async () => {
    //   await clearCollections(db);
    //   console.log('Deleting collections');
    // });

    describe('given an invalid request body', () => {
      it('should return a 400 with errors: first name and password are required', async () => {
        const payload = {
          email: 'test@test.com',
          lastName: 'Test',
          password: '123456',
        };

        const response = await supertest(app).post('/api/users').send(payload);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual([
          'First name is required',
          'Password confirmation is required',
        ]);
      });

      it('should return a 400 with errors: password must be x chars long', async () => {
        const payload = {
          email: 'test@test.com',
          firstName: 'My',
          lastName: 'Test',
          password: '1234',
          passwordConfirmation: '1234',
        };

        const response = await supertest(app).post('/api/users').send(payload);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual([
          'Password must be at least 6 characters',
        ]);
      });

      it('should return a 400 with errors: passwords must match', async () => {
        const payload = {
          email: 'test@test.com',
          firstName: 'My',
          lastName: 'Test',
          password: '123456',
          passwordConfirmation: '567891',
        };

        const response = await supertest(app).post('/api/users').send(payload);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(["Passwords don't match"]);
      });
    });

    describe('given a valid request body', () => {
      it('should create user with response of 201', async () => {
        const response = await supertest(app)
          .post('/api/users')
          .send(mockData.newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          user: {
            email: mockData.newUser.email,
            firstName: mockData.newUser.firstName,
            lastName: mockData.newUser.lastName,
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        });
      });

      it('should not create a duplicate user with same email throwing a 409', async () => {
        const response = await supertest(app)
          .post('/api/users')
          .send(mockData.newUserDuplicate);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ error: 'User email already in use' });
      });
    });
  });

  describe('GET /api/user - user fetching', () => {
    describe('given an authorized user', () => {
      it.todo('should return a 401 if user not logged in', async () => {
        // TODO: create auth flow
      });

      it.todo('should return a 403 if logged user is not admin', async () => {
        // TODO: create auth flow
      });
    });

    describe('given correctly authenticated admin user', () => {
      it('should return a list of all users stored', async () => {
        const response = await supertest(app).get('/api/user');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData.newUser);
      });
    });
  });
  describe.skip('GET /api/user/:id - user fetching', () => {
    // describe('');
  });
});
