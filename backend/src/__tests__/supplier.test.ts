import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';
import app from '../app';
import { connectDB, dropDB } from './utils/connectMemoryDB';
import mongoose from 'mongoose';
import { testInvalidIdParam } from './utils/reusableTests';
import { createUserAndLogin } from './utils/mockUser';
import { RequestCreateUser } from '../schemas/user.schemas';

let db: MongoMemoryServer | null = null;
let adminAccessToken = '';
let userAccessToken = '';
let visitorAccessToken = '';

const apiRoot = '/api/suppliers';

const mockData = {
  newSupplier: {
    name: 'SupplierTester',
    description: 'A mock supplier',
    category: ['Seeds'],
    status: 'Active',
    phone: '642675648',
    website: 'www.supplier.com',
    avatarUrl: 'url/somePic.jpg',
    cuit: '20314359643',
  },
  supplierModified: {
    description: 'Mock supplier updated',
  },
};

const mockAdmin: RequestCreateUser['body'] = {
  email: 'admin@test.com',
  firstName: 'Tester',
  lastName: 'Admin',
  password: '123456',
  passwordConfirmation: '123456',
  roles: ['Admin'],
};

const mockUser: RequestCreateUser['body'] = {
  email: 'user@test.com',
  firstName: 'Tester',
  lastName: 'User',
  password: '123456',
  passwordConfirmation: '123456',
  roles: ['User'],
};

const mockVisitor: RequestCreateUser['body'] = {
  email: 'visitor@test.com',
  firstName: 'Tester',
  lastName: 'User',
  password: '123456',
  passwordConfirmation: '123456',
  roles: ['Visitor'],
};

const fakeId = new mongoose.Types.ObjectId();

let newSupplierId: string | null;

describe('supplier', () => {
  beforeAll(async () => {
    db = await connectDB();
    adminAccessToken = await createUserAndLogin(app, mockAdmin);
    userAccessToken = await createUserAndLogin(app, mockUser);
    visitorAccessToken = await createUserAndLogin(app, mockVisitor);
  });

  afterAll(async () => {
    await dropDB(db);
  });

  describe('auth validation', () => {
    describe('given an unauthenticated user', () => {
      it('POST to endpoint should return 401', async () => {
        const response = await supertest(app).post(apiRoot);

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Must be authenticated');
      });

      it('PATCH to endpoint should return 401', async () => {
        const response = await supertest(app).patch(
          `${apiRoot}/${fakeId.toString()}`
        );

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Must be authenticated');
      });

      it('DELETE to endpoint should return 401', async () => {
        const response = await supertest(app).delete(
          `${apiRoot}/${fakeId.toString()}`
        );

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Must be authenticated');
      });
    });

    describe('given an authenticated user', () => {
      it('POST should return a 401 for a role of type "Visitor"', async () => {
        const response = await supertest(app)
          .post(apiRoot)
          .send(mockData.newSupplier)
          .set('Authorization', `Bearer ${visitorAccessToken}`);

        expect(response.status).toBe(403);
      });

      it('PATCH should return a 401 for a role of type "Visitor"', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/${fakeId}`)
          .send(mockData.supplierModified)
          .set('Authorization', `Bearer ${visitorAccessToken}`);

        expect(response.status).toBe(403);
      });

      it('DELETE should return a 401 for a role of type "User"', async () => {
        const response = await supertest(app)
          .delete(`${apiRoot}/${fakeId}`)
          .set('Authorization', `Bearer ${visitorAccessToken}`);

        expect(response.status).toBe(403);
      });
    });
  });

  describe(`POST ${apiRoot} - supplier creation`, () => {
    describe('given an invalid request body', () => {
      it('should return a 400 with errors', async () => {
        const payload = {
          name: 'SupplierTester',
          description: 'A mock supplier',
          category: ['Seeds'],
          status: 'Invalid Status',
          website: 'www.supplier.com',
          avatarUrl: 'url/somePic.jpg',
          cuit: '20314359643',
        };

        const response = await supertest(app)
          .post(apiRoot)
          .send(payload)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual([
          `Invalid enum value. Expected 'Active' | 'Inactive', received 'Invalid Status'`,
          'Phone is required',
        ]);
      });
    });

    describe('given a valid request body', () => {
      it('should create supplier with response of 201', async () => {
        const response = await supertest(app)
          .post(apiRoot)
          .send(mockData.newSupplier)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          ...mockData.newSupplier,
        });

        // set supplierid for future tests
        newSupplierId = response.body._id;
      });

      it('should not create a duplicate supplier with same email throwing a 409', async () => {
        const response = await supertest(app)
          .post(apiRoot)
          .send(mockData.newSupplier)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({
          error: 'name must be unique',
        });
      });
    });

    describe(`GET ${apiRoot} - supplier fetching`, () => {
      it('should return a list of all suppliers stored', async () => {
        const response = await supertest(app)
          .get(apiRoot)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
          {
            __v: 0,
            _id: newSupplierId,
            ...mockData.newSupplier,
          },
        ]);
      });
    });
  });

  describe(`GET ${apiRoot}/:id - supplier fetching`, () => {
    describe('given an invalid id', () => {
      it('should return a 400 error', async () => {
        const response = await supertest(app)
          .get(`${apiRoot}/123`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: ['Id is not valid'] });
      });
    });

    describe('given a nonexisting supplier', () => {
      it('should return a 404', async () => {
        const response = await supertest(app)
          .get(`${apiRoot}/${fakeId}`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given an existing supplier', () => {
      it('should return the supplier if found', async () => {
        const response = await supertest(app)
          .get(`/api/suppliers/${newSupplierId}`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          __v: 0,
          _id: newSupplierId,
          ...mockData.newSupplier,
        });
      });
    });
  });

  describe(`PATCH ${apiRoot} - supplier update`, () => {
    describe('given an invalid id', () => {
      it('should return a 400 error', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/123`)
          .send(mockData.supplierModified)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: ['Id is not valid'] });
      });
    });

    describe('given a nonexisting supplier', () => {
      it('should return a 404', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/${fakeId}`)
          .send(mockData.supplierModified)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given an invalid request body', () => {
      it('should return a 400 with errors', async () => {
        const payload = {
          description: 123,
        };

        const response = await supertest(app)
          .patch(`${apiRoot}/${fakeId}`)
          .send(payload)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual([
          'Expected string, received number',
        ]);
      });
    });

    describe('given a valid request body and existing id', () => {
      it('should return a 200 with updated supplier', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/${newSupplierId}`)
          .send(mockData.supplierModified)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          __v: 0,
          _id: newSupplierId,
          ...mockData.newSupplier,
          ...mockData.supplierModified,
        });
      });
    });
  });

  describe(`DELETE ${apiRoot} - supplier delete`, () => {
    describe('given an invalid id', () => {
      it('should return a 400 error', async () => {
        const response = await supertest(app)
          .delete(`${apiRoot}/123`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: ['Id is not valid'] });
      });
    });

    describe('given a nonexisting supplier', () => {
      it('should return a 404', async () => {
        const response = await supertest(app)
          .delete(`${apiRoot}/${fakeId}`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given an existing id', () => {
      it('should send status 204', async () => {
        const response = await supertest(app)
          .delete(`${apiRoot}/${newSupplierId}`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toEqual(204);
      });
    });
  });
});
