import supertest from 'supertest';
import app from '../app';

describe('user', () => {
  describe('user creation', () => {
    describe('given an invalid request body', () => {
      it('should return a 400 with errors', async () => {
        const payload = {
          email: 'test@test.com',
          lastName: 'Doe',
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
    });
  });
});
