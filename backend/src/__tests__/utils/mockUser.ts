import supertest from 'supertest';
import { Express } from 'express';
import { RequestRegisterUser } from '../../schemas/user.schemas';

export const createUserAndLogin = async (
  app: Express,
  userData: RequestRegisterUser['body']
) => {
  await supertest(app).post('/api/auth/register').send(userData);

  const response = await supertest(app)
    .post('/api/auth/login')
    .send({ email: userData.email, password: userData.password });

  return response.body.accessToken;
};
