import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { HydratedDocument } from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import { RequestCreateUser } from '../schemas/user.schemas';
import { connectDB, dropDB } from './utils/connectMemoryDB';
import { createUserAndLogin } from './utils/mockUser';
import { RequestCreateSupplier, Supplier } from '../schemas/supplier.schema';
import SupplierModel from '../models/MasterData/supplier.model';
import ProductModel from '../models/MasterData/product.model';

let db: MongoMemoryServer | null = null;
let adminAccessToken = '';
let userAccessToken = '';
let visitorAccessToken = '';
let supplier: HydratedDocument<Supplier>;

const apiRoot = '/api/products';

const mockData = {
  newProduct: {
    name: 'Product1',
    description: 'Some description',
    category: ['Seeds'],
    status: 'Active',
    suppliers: [] as string[],
  },
  productModified: {
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

let newProductId: string | null;

const createSupplier = (data: RequestCreateSupplier['body']) => {
  return SupplierModel.create({ ...data });
};

describe('product', () => {
  beforeAll(async () => {
    db = await connectDB();
    adminAccessToken = await createUserAndLogin(app, mockAdmin);
    userAccessToken = await createUserAndLogin(app, mockUser);
    visitorAccessToken = await createUserAndLogin(app, mockVisitor);
    supplier = await createSupplier({
      name: 'SupplierTester',
      description: 'A mock supplier',
      category: ['Seeds'],
      status: 'Active',
      phone: '642675648',
      website: 'www.supplier.com',
      avatarUrl: 'url/somePic.jpg',
      cuit: '20314359643',
    });

    mockData.newProduct = {
      ...mockData.newProduct,
      suppliers: [supplier._id.toString()],
    };
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
          .send(mockData.newProduct)
          .set('Authorization', `Bearer ${visitorAccessToken}`);

        expect(response.status).toBe(403);
      });

      it('PATCH should return a 401 for a role of type "Visitor"', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/${fakeId}`)
          .send(mockData.productModified)
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

  describe(`POST ${apiRoot} - product creation`, () => {
    describe('given an invalid request body', () => {
      it('should return a 400 with errors', async () => {
        const payload = {
          name: 'Product2',
          description: 'Some description',
          status: 'Active',
        };

        const response = await supertest(app)
          .post(apiRoot)
          .send(payload)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual([
          `Category must be an array`,
          'Supplier array is required',
        ]);
      });
    });

    describe('given a valid request body', () => {
      it('should create product with response of 201', async () => {
        const response = await supertest(app)
          .post(apiRoot)
          .send(mockData.newProduct)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          ...mockData.newProduct,
        });

        newProductId = response.body._id;
      });

      it('should not create a duplicate product with same email throwing a 409', async () => {
        const response = await supertest(app)
          .post(apiRoot)
          .send(mockData.newProduct)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({
          error: 'name must be unique',
        });
      });
    });

    describe(`GET ${apiRoot} - product fetching`, () => {
      it('should return a list of all products stored', async () => {
        const response = await supertest(app)
          .get(apiRoot)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
          {
            __v: 0,
            _id: newProductId,
            ...mockData.newProduct,
          },
        ]);
      });
    });
  });

  describe(`GET ${apiRoot}/:id - product fetching`, () => {
    describe('given an invalid id', () => {
      it('should return a 400 error', async () => {
        const response = await supertest(app)
          .get(`${apiRoot}/123`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: ['Id is not valid'] });
      });
    });

    describe('given a nonexisting product', () => {
      it('should return a 404', async () => {
        const response = await supertest(app)
          .get(`${apiRoot}/${fakeId}`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.statusCode).toBe(404);
      });
    });

    describe('given an existing product', () => {
      it('should return the product if found', async () => {
        const response = await supertest(app)
          .get(`${apiRoot}/${newProductId}`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          __v: 0,
          _id: newProductId,
          ...mockData.newProduct,
        });
      });
    });
  });

  describe(`PATCH ${apiRoot} - product update`, () => {
    describe('given an invalid id', () => {
      it('should return a 400 error', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/123`)
          .send(mockData.productModified)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: ['Id is not valid'] });
      });
    });

    describe('given a nonexisting product', () => {
      it('should return a 404', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/${fakeId}`)
          .send(mockData.productModified)
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
      it('should return a 200 with updated product', async () => {
        const response = await supertest(app)
          .patch(`${apiRoot}/${newProductId}`)
          .send(mockData.productModified)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          __v: 0,
          _id: newProductId,
          ...mockData.newProduct,
          ...mockData.productModified,
        });
      });
    });
  });

  describe(`DELETE ${apiRoot} - product delete`, () => {
    describe('given an invalid id', () => {
      it('should return a 400 error', async () => {
        const response = await supertest(app)
          .delete(`${apiRoot}/123`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: ['Id is not valid'] });
      });
    });

    describe('given a nonexisting product', () => {
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
          .delete(`${apiRoot}/${newProductId}`)
          .set('Authorization', `Bearer ${adminAccessToken}`);

        expect(response.status).toEqual(204);
      });
    });
  });
});
