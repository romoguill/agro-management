import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export function validate(validationSchema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      validationSchema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error) {
      next(error);
    }
  };
}
