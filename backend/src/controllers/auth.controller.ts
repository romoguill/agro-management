import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { MongoServerError } from 'mongodb';
import { RequestLoginUser, RequestRegisterUser } from '../schemas/user.schemas';
import * as UserService from '../services/user.service';

export interface TokenPayload extends jwt.JwtPayload {
  userId: string;
  roles: string[];
}

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
    const user = await UserService.getUser({ email }, true);

    if (!user) throw createHttpError(401, 'Invalid credentials');

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) throw createHttpError(401, 'Invalid credentials');

    const accessToken = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET_ACCESS_TOKEN as string,
      { expiresIn: Number(process.env.ACCESS_TOKEN_TTL) }
    );

    const refreshToken = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET_REFRESH_TOKEN as string,
      { expiresIn: Number(process.env.REFRESH_TOKEN_TTL) }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 1000 * Number(process.env.REFRESH_TOKEN_TTL),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...responseUser } = user;

    res.json({ user: responseUser, accessToken });
  } catch (error) {
    next(error);
  }
}

export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  try {
    const jwtPayload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN as string
    ) as TokenPayload;

    const user = await UserService.getUserById(jwtPayload.id);

    const accessToken = jwt.sign(
      { id: jwtPayload.id, roles: jwtPayload.roles },
      process.env.JWT_SECRET_ACCESS_TOKEN as string,
      { expiresIn: Number(process.env.ACCESS_TOKEN_TTL) }
    );

    res.status(200).json({ user, accessToken });
  } catch (error) {
    next(error);
  }
}

export function logout(req: Request, res: Response) {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  res.sendStatus(204);
}
