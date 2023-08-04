import bcrypt from 'bcrypt';
import { Express } from 'express';
import supertest from 'supertest';
import UserModel from '../../models/user.model';
import { RequestCreateUser } from '../../schemas/user.schemas';

export const createUserAndLogin = async (
  app: Express,
  userData: RequestCreateUser['body']
) => {
  const hashedPassword = bcrypt.hash(userData.password, 10);

  UserModel.create({ ...userData, hashedPassword });

  const response = await supertest(app)
    .post('/api/auth/login')
    .send({ email: userData.email, password: userData.password });

  return response.body.accessToken;
};
