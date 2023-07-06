import supertest from 'supertest';
import app from '../app';
import { connectDB, clearCollections, dropDB } from './utils/connectMemoryDB';
import { MongoMemoryServer } from 'mongodb-memory-server';

let db: MongoMemoryServer | null = null;

describe('user', () => {
  beforeAll(async () => {
    db = await connectDB();
  });

  afterAll(async () => {
    await dropDB(db);
  });

  describe('user creation', () => {
    beforeAll(async () => {
      await clearCollections(db);
      console.log('Deleting collections');
    });

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
        const payload = {
          email: 'test@test.com',
          firstName: 'My',
          lastName: 'Test',
          password: '123456',
          passwordConfirmation: '123456',
        };

        const response = await supertest(app).post('/api/users').send(payload);
        const response2 = await supertest(app).post('/api/users').send(payload);

        expect(response.status).toBe(201);
        console.log(response2.body);
        expect(response2.status).toBe(409);
      });

      it('should not create a duplicate user with same email throwing a 409', async () => {
        const newPayload = {
          email: 'test@test.com',
          firstName: 'John',
          lastName: 'Lennon',
          password: '456789',
          passwordConfirmation: '456789',
        };

        const response = await supertest(app)
          .post('/api/users')
          .send(newPayload);

        expect(response.status).toBe(409);
      });
    });
  });
});
