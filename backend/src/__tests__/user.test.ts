import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import app from '../app';
import { connectDB, dropDB } from './utils/connectMemoryDB';
import mongoose from 'mongoose';

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

let newUserId: string | null;

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
          _id: expect.any(String),
          email: mockData.newUser.email,
          firstName: mockData.newUser.firstName,
          lastName: mockData.newUser.lastName,
        });

        // set userid for future tests
        newUserId = response.body._id;
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
      it.todo('should return a 401 if user not logged in');

      it.todo('should return a 403 if logged user is not admin');
    });

    describe('given correctly authenticated admin user', () => {
      it('should return a list of all users stored', async () => {
        const response = await supertest(app).get('/api/users');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
          {
            _id: expect.any(String),
            email: mockData.newUser.email,
            firstName: mockData.newUser.firstName,
            lastName: mockData.newUser.lastName,
          },
        ]);
      });
    });
  });

  describe('GET /api/user/:id - user fetching', () => {
    describe('given an invalid id', () => {
      it('should return a 400 with a message', async () => {
        const invalidId = '123';

        const response = await supertest(app).get(`/api/users/${invalidId}`);

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'ID is invalid' });
      });
    });

    describe('given an authorized user', () => {
      it.todo('should return a 401 if user not logged in');

      it.todo('should return a 403 if logged user is not admin');
    });

    describe('given correctly authenticated admin user', () => {
      it("should return a 404 if the user doesn't exist", async () => {
        // Just to be sure, guarantee id generated is different from newUser id
        let nonexistentId = newUserId;
        while (nonexistentId === newUserId) {
          nonexistentId = new mongoose.Types.ObjectId().toString();
        }

        const response = await supertest(app).get(
          `/api/users/${nonexistentId}`
        );

        expect(response.statusCode).toBe(404);
      });
    });
  });
});
