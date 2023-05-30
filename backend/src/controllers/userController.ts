import { RequestHandler, Request, Response } from 'express';
import UserModel from '../models/userModel';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

interface SignUpBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (
      firstName === undefined ||
      lastName === undefined ||
      email === undefined ||
      password === undefined
    ) {
      throw createHttpError(400, 'Some fields are missing. Could not Sign Up');
    }

    const existingEmail = await UserModel.findOne({ email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        'Email already in use. Please try another or login'
      );
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: passwordHashed,
    });

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  email?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (email === undefined || password === undefined) {
      throw createHttpError(400, 'Some fields are missing. Could not Login');
    }

    const existingUser = await UserModel.findOne({ email }).exec();

    if (!existingUser) {
      throw createHttpError(401, 'Invalid credentials');
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      throw createHttpError(401, 'Invalid credentials');
    }

    req.session.userId = existingUser._id;

    res.status(200).send(existingUser);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next): void => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    }
  });

  res.sendStatus(200);
};
