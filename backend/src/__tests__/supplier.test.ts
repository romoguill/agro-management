import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import app from '../app';
import { connectDB, dropDB } from './utils/connectMemoryDB';
import mongoose from 'mongoose';
import { testInvalidIdParam } from './utils/reusableTests';

let db: MongoMemoryServer | null = null;

const apiRoot = '/api/suppliers';

const mockData = {
  newSupplier: {
    name: 'SupplierTester',
    description: 'A mock supplier',
    category: 'Seeds',
    status: 'Active',
    phone: '642675648',
    website: 'www.supplier.com',
    avatarUrl: 'url/somePic.jpg',
    cuit: '20314359643',
  },
};

let newSupplierId: string | null;

describe('user', () => {
  beforeAll(async () => {
    db = await connectDB();
  });

  afterAll(async () => {
    await dropDB(db);
  });

  describe(`POST ${apiRoot} - user creation`, () => {
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
          roles: ['user'],
        };

        const response = await supertest(app).post(apiRoot).send(payload);

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
          roles: ['user'],
        };

        const response = await supertest(app).post(apiRoot).send(payload);

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
          roles: ['user'],
        };

        const response = await supertest(app).post(apiRoot).send(payload);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(["Passwords don't match"]);
      });
    });

    describe('given a valid request body', () => {
      it('should create user with response of 201', async () => {
        const response = await supertest(app)
          .post(apiRoot)
          .send(mockData.newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          _id: expect.any(String),
          email: mockData.newUser.email,
          firstName: mockData.newUser.firstName,
          lastName: mockData.newUser.lastName,
          roles: mockData.newUser.roles,
        });

        // set userid for future tests
        newUserId = response.body._id;
      });

      it('should not create a duplicate user with same email throwing a 409', async () => {
        const response = await supertest(app)
          .post(apiRoot)
          .send(mockData.newUserDuplicate);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ error: 'User email already in use' });
      });
    });
  });

  describe(`GET ${apiRoot} - user fetching`, () => {
    describe('given an authorized user', () => {
      it.todo('should return a 401 if user not logged in');

      it.todo('should return a 403 if logged user is not admin');
    });

    describe('given correctly authenticated admin user', () => {
      it('should return a list of all users stored', async () => {
        const response = await supertest(app).get(apiRoot);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
          {
            _id: expect.any(String),
            email: mockData.newUser.email,
            firstName: mockData.newUser.firstName,
            lastName: mockData.newUser.lastName,
            roles: mockData.newUser.roles,
          },
        ]);
      });
    });
  });

  describe(`GET ${apiRoot}/:id - user fetching`, () => {
    describe('given an invalid id', () =>
      testInvalidIdParam(app, apiRoot, 'get', '123'));

    describe(`given an authorized user`, () => {
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
          `${apiRoot}/${nonexistentId}`
        );

        expect(response.statusCode).toBe(404);
      });

      it('should return the user if found', async () => {
        const response = await supertest(app).get(`/api/users/${newUserId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          _id: newUserId,
          email: mockData.newUser.email,
          firstName: mockData.newUser.firstName,
          lastName: mockData.newUser.lastName,
          roles: mockData.newUser.roles,
        });
      });
    });
  });

  describe(`PATCH ${apiRoot}/:id - user updating`, () => {
    describe('given an invalid id', () =>
      testInvalidIdParam(app, apiRoot, 'patch', '123'));

    describe(`given an authorized user`, () => {
      it.todo('should return a 401 if user not logged in');

      it.todo('should return a 403 if logged user is not admin');
    });

    describe('given correctly authenticated admin user', () => {
      const modifiedFields = {
        firstName: 'NameChanged',
        lastName: 'LastNameChanged',
      };

      it("should return a 404 if the user doesn't exist", async () => {
        // Just to be sure, guarantee id generated is different from newUser id
        let nonexistentId = newUserId;
        while (nonexistentId === newUserId) {
          nonexistentId = new mongoose.Types.ObjectId().toString();
        }

        const response = await supertest(app)
          .patch(`${apiRoot}/${nonexistentId}`)
          .send(modifiedFields);

        expect(response.statusCode).toBe(404);
      });

      it('should perform the modification with a status of 200 and a response of the updated user ', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/${newUserId}`)
          .send(modifiedFields);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          _id: newUserId,
          email: mockData.newUser.email,
          firstName: modifiedFields.firstName,
          lastName: modifiedFields.lastName,
          roles: mockData.newUser.roles,
        });
      });
    });
  });

  describe(`DELETE ${apiRoot}/:id - user deleting`, () => {
    describe('given an invalid id', () =>
      testInvalidIdParam(app, apiRoot, 'delete', '123'));

    describe(`given an authorized user`, () => {
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

        const response = await supertest(app).delete(
          `${apiRoot}/${nonexistentId}`
        );

        expect(response.statusCode).toBe(404);
      });

      it('should perform the deletion with a status of 200 and a response with a message ', async () => {
        const response = await supertest(app).delete(`${apiRoot}/${newUserId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          success: `User with id ${newUserId} was deleted`,
        });
      });
    });
  });
});
