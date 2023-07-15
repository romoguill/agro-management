import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../controllers/auth.controller';

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createHttpError(401, 'Must be authenticated');
  }

  const bearerToken = authHeader.replace('Bearer ', '');

  try {
    const jwtPayload = jwt.verify(
      bearerToken,
      process.env.JWT_SECRET_REFRESH_TOKEN as string
    ) as TokenPayload;

    res.locals.userId = jwtPayload.userId;
    res.locals.roles = jwtPayload.roles;

    next();
  } catch (error) {
    next(error);
  }
}
