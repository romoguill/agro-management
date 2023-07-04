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

        supertest(app).post('/api/users').send(payload).expect(400);
      });
    });
  });
});
