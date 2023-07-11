import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { MongoServerError } from 'mongodb';
import { RequestLoginUser, RequestRegisterUser } from '../schemas/user.schemas';
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
      roles: user.roles,
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

export async function login(
  req: Request<unknown, unknown, RequestLoginUser['body']>,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await UserService.getUser({ email });

    if (!user) throw createHttpError(401, 'Invalid credentials');

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) throw createHttpError(401, 'Invalid credentials');

    const accessToken = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET_ACCESS_TOKEN as string,
      { expiresIn: 10 }
    );

    const refreshToken = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET_REFRESH_TOKEN as string,
      { expiresIn: 30 }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 1000 * 30,
    });

    res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
}
