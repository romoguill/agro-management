import { NextFunction, Request, Response } from 'express';
import { isHttpError } from 'http-errors';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ZodError } from 'zod';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  let errorMessage: string | string[] = 'An error occured';
  let statusCode = 500;

  if (error instanceof ZodError) {
    errorMessage = error.issues.map((issue) => issue.message);
    statusCode = 400;
  }

  if (
    error instanceof JsonWebTokenError ||
    error instanceof TokenExpiredError
  ) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    errorMessage = 'Invalid/Expired session';
    statusCode = 401;
  }

  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }

  res.status(statusCode).send({ error: errorMessage });
}
