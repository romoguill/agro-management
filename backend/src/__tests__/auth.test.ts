import supertest from 'supertest';
import app from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, dropDB } from './utils/connectMemoryDB';

let db: MongoMemoryServer | null = null;
const authRoute = '/api/auth';

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
  });
});
