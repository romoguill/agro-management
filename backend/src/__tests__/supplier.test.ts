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
    category: 'Seeds',
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

  // AUTHENTICATION / AUTHORIZATION TESTS
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

  // describe(`POST ${apiRoot} - supplier creation`, () => {
  //   describe('given an invalid request body', () => {
  //     it('should return a 400 with errors', async () => {
  //       const payload = {
  //         name: 'SupplierTester',
  //         description: 'A mock supplier',
  //         category: 'Seeds',
  //         status: 'Invalid Status',
  //         website: 'www.supplier.com',
  //         avatarUrl: 'url/somePic.jpg',
  //         cuit: '20314359643',
  //       };

  //       const response = await supertest(app).post(apiRoot).send(payload);

  //       expect(response.status).toEqual(400);
  //       expect(response.body.error).toEqual(['Phone is required', '']);
  //     });

  //     it('should return a 400 with errors: password must be x chars long', async () => {
  //       const payload = {
  //         email: 'test@test.com',
  //         firstName: 'My',
  //         lastName: 'Test',
  //         password: '1234',
  //         passwordConfirmation: '1234',
  //         roles: ['supplier'],
  //       };

  //       const response = await supertest(app).post(apiRoot).send(payload);

  //       expect(response.status).toEqual(400);
  //       expect(response.body.error).toEqual([
  //         'Password must be at least 6 characters',
  //       ]);
  //     });

  //     it('should return a 400 with errors: passwords must match', async () => {
  //       const payload = {
  //         email: 'test@test.com',
  //         firstName: 'My',
  //         lastName: 'Test',
  //         password: '123456',
  //         passwordConfirmation: '567891',
  //         roles: ['supplier'],
  //       };

  //       const response = await supertest(app).post(apiRoot).send(payload);

  //       expect(response.status).toEqual(400);
  //       expect(response.body.error).toEqual(["Passwords don't match"]);
  //     });
  //   });

  //   describe('given a valid request body', () => {
  //     it('should create supplier with response of 201', async () => {
  //       const response = await supertest(app)
  //         .post(apiRoot)
  //         .send(mockData.newSupplier);

  //       expect(response.status).toBe(201);
  //       expect(response.body).toEqual({});

  //       // set supplierid for future tests
  //       newSupplierId = response.body._id;
  //     });

  //     it('should not create a duplicate supplier with same email throwing a 409', async () => {
  //       const response = await supertest(app).post(apiRoot).send();

  //       expect(response.status).toBe(409);
  //       expect(response.body).toEqual({
  //         error: 'Supplier email already in use',
  //       });
  //     });
  //   });
  // });

  // describe(`GET ${apiRoot} - supplier fetching`, () => {
  //   describe('given an authorized supplier', () => {
  //     it.todo('should return a 401 if supplier not logged in');

  //     it.todo('should return a 403 if logged supplier is not admin');
  //   });

  //   describe('given correctly authenticated admin supplier', () => {
  //     it('should return a list of all suppliers stored', async () => {
  //       const response = await supertest(app).get(apiRoot);

  //       expect(response.statusCode).toBe(200);
  //       expect(response.body).toEqual([{}]);
  //     });
  //   });
  // });

  // describe(`GET ${apiRoot}/:id - supplier fetching`, () => {
  //   describe('given an invalid id', () =>
  //     testInvalidIdParam(app, apiRoot, 'get', '123'));

  //   describe(`given an authorized supplier`, () => {
  //     it.todo('should return a 401 if supplier not logged in');

  //     it.todo('should return a 403 if logged supplier is not admin');
  //   });

  //   describe('given correctly authenticated admin supplier', () => {
  //     it("should return a 404 if the supplier doesn't exist", async () => {
  //       // Just to be sure, guarantee id generated is different from newSupplier id
  //       let nonexistentId = newSupplierId;
  //       while (nonexistentId === newSupplierId) {
  //         nonexistentId = new mongoose.Types.ObjectId().toString();
  //       }

  //       const response = await supertest(app).get(
  //         `${apiRoot}/${nonexistentId}`
  //       );

  //       expect(response.statusCode).toBe(404);
  //     });

  //     it('should return the supplier if found', async () => {
  //       const response = await supertest(app).get(
  //         `/api/suppliers/${newSupplierId}`
  //       );

  //       expect(response.statusCode).toBe(200);
  //       expect(response.body).toEqual({});
  //     });
  //   });
  // });

  // describe(`PATCH ${apiRoot}/:id - supplier updating`, () => {
  //   describe('given an invalid id', () =>
  //     testInvalidIdParam(app, apiRoot, 'patch', '123'));

  //   describe(`given an authorized supplier`, () => {
  //     it.todo('should return a 401 if supplier not logged in');

  //     it.todo('should return a 403 if logged supplier is not admin');
  //   });

  //   describe('given correctly authenticated admin supplier', () => {
  //     const modifiedFields = {
  //       firstName: 'NameChanged',
  //       lastName: 'LastNameChanged',
  //     };

  //     it("should return a 404 if the supplier doesn't exist", async () => {
  //       // Just to be sure, guarantee id generated is different from newSupplier id
  //       let nonexistentId = newSupplierId;
  //       while (nonexistentId === newSupplierId) {
  //         nonexistentId = new mongoose.Types.ObjectId().toString();
  //       }

  //       const response = await supertest(app)
  //         .patch(`${apiRoot}/${nonexistentId}`)
  //         .send(modifiedFields);

  //       expect(response.statusCode).toBe(404);
  //     });

  //     it('should perform the modification with a status of 200 and a response of the updated supplier ', async () => {
  //       const response = await supertest(app)
  //         .patch(`${apiRoot}/${newSupplierId}`)
  //         .send(modifiedFields);

  //       expect(response.statusCode).toBe(200);
  //       expect(response.body).toEqual({});
  //     });
  //   });
  // });

  // describe(`DELETE ${apiRoot}/:id - supplier deleting`, () => {
  //   describe('given an invalid id', () =>
  //     testInvalidIdParam(app, apiRoot, 'delete', '123'));

  //   describe(`given an authorized supplier`, () => {
  //     it.todo('should return a 401 if supplier not logged in');

  //     it.todo('should return a 403 if logged supplier is not admin');
  //   });

  //   describe('given correctly authenticated admin supplier', () => {
  //     it("should return a 404 if the supplier doesn't exist", async () => {
  //       // Just to be sure, guarantee id generated is different from newSupplier id
  //       let nonexistentId = newSupplierId;
  //       while (nonexistentId === newSupplierId) {
  //         nonexistentId = new mongoose.Types.ObjectId().toString();
  //       }

  //       const response = await supertest(app).delete(
  //         `${apiRoot}/${nonexistentId}`
  //       );

  //       expect(response.statusCode).toBe(404);
  //     });

  //     it('should perform the deletion with a status of 200 and a response with a message ', async () => {
  //       const response = await supertest(app).delete(
  //         `${apiRoot}/${newSupplierId}`
  //       );

  //       expect(response.statusCode).toBe(200);
  //       expect(response.body).toEqual({
  //         success: `Supplier with id ${newSupplierId} was deleted`,
  //       });
  //     });
  //   });
  // });
});
