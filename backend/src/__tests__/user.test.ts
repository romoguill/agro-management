import supertest from 'supertest';
import app from '../app';

console.log(process.env.ENV);

describe('user', () => {
  describe('user creation', () => {
    describe('given an invalid request body', () => {
      it('should return a 400 with errors: first name and password are required', async () => {
        const payload = {
          email: 'test@test.com',
          lastName: 'Test',
          password: '123456',
        };

        const response = await supertest(app)
          .post('/api/users/signup')
          .send(payload);

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

        const response = await supertest(app)
          .post('/api/users/signup')
          .send(payload);

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

        const response = await supertest(app)
          .post('/api/users/signup')
          .send(payload);

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual(["Passwords don't match"]);
      });
    });
  });
});
