import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { MongoServerError } from 'mongodb';
import { RequestRegisterUser } from '../schemas/user.schemas';
import * as UserService from '../services/user.service';

export async function register(
  req: Request<unknown, unknown, RequestRegisterUser['body']>,
  res: Response,
  next: NextFunction
) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const user = await UserService.createUser({
      ...req.body,
      password: hashedPassword,
      roles: ['user'],
    });

    const responseBody = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    // Use mongodb driver because mongo errors don't propagate to mongoose
    if (error instanceof MongoServerError) {
      if (error.code === 11000) {
        return next(createHttpError(409, 'User email already in use'));
      }
    }
    next(error);
  }
}
