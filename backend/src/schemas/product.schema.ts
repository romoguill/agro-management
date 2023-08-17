import { z } from 'zod';
import { objectIdValidator } from '../utils/idValidator';
import mongoose from 'mongoose';

export const ProductCategories = z.array(
  z.enum(['Seeds', 'Fertilizers', 'Herbicides', 'Labor', 'Pesticides'], {
    invalid_type_error: 'Invalid category',
  }),
  { required_error: 'Category must be an array' }
);

export type ProductCategories = z.infer<typeof ProductCategories>;

export const Product = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string().optional(),
  category: ProductCategories,
  status: z.enum(['Active', 'Inactive']),
  suppliers: z.string().refine((val) => mongoose.isValidObjectId(val), {
    message: 'Id is not valid',
  }),
});

export type Product = z.infer<typeof Product>;
