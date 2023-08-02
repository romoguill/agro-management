import mongoose from 'mongoose';
import { z } from 'zod';

export const objectIdValidator = () => {
  return z.object({
    id: z.string().refine((val) => mongoose.isValidObjectId(val), {
      message: 'Id is not valid',
    }),
  });
};
