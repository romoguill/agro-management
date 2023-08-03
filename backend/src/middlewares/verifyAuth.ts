import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../controllers/auth.controller';
import { Roles } from '../schemas/roles.schema';

export function verifyAuth(roles: Roles[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw createHttpError(401, 'Must be authenticated');
    }

    const bearerToken = authHeader.replace('Bearer ', '');

    try {
      const jwtPayload = jwt.verify(
        bearerToken,
        process.env.JWT_SECRET_ACCESS_TOKEN as string
      ) as TokenPayload;

      // Permision is granted if that user has one role that matches the requirement in validator
      if (roles.some((role) => jwtPayload.roles.includes(role))) {
        res.locals.userId = jwtPayload.userId;
        res.locals.roles = jwtPayload.roles;
        next();
      } else {
        next(
          createHttpError(
            403,
            "Your user doesn't have permission to perform this action"
          )
        );
      }
    } catch (error) {
      next(error);
    }
  };
}
