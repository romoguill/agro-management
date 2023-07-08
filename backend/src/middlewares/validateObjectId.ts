import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export function validateObjectId(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    next(createHttpError(400, 'ID is invalid'));
  }
  next();
}
