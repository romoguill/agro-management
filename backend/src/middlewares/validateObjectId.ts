import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export function validateObjectId(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.log(req.params.id);
  console.log(mongoose.Types.ObjectId.isValid(req.params.id));
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log('invalid');
    next(createHttpError(400, 'ID is invalid'));
  }
  next();
}
