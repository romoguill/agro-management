import { NextFunction, Request, Response } from 'express';
import { RequestCreateUser } from '../schemas/user.schemas';
import bcrypt from 'bcrypt';
import * as UserService from '../services/user.service';
import { MongoServerError } from 'mongodb';
import createHttpError from 'http-errors';

export async function createUser(
  req: Request<unknown, unknown, RequestCreateUser['body']>,
  res: Response,
  next: NextFunction
) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const user = await UserService.createUser({
      ...req.body,
      password: hashedPassword,
    });

    const responseBody = {
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

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
