import { RequestHandler, Request, Response } from 'express';
import UserModel from '../models/userModel';
import createHttpError from 'http-errors';

interface UserDetails {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  UserDetails,
  unknown
> = async (req, res, next) => {
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

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};
