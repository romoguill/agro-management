import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export function validate(validationSchema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const data = validationSchema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      console.log(data);

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
