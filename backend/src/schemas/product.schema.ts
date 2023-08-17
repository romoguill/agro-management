import mongoose from 'mongoose';
import { z } from 'zod';

export const PRODUCT_CATEGORIES = [
  'Seeds',
  'Fertilizers',
  'Herbicides',
  'Labor',
  'Pesticides',
] as const;

export const ProductCategories = z.array(
  z.enum(PRODUCT_CATEGORIES, {
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
  suppliers: z.array(z.instanceof(mongoose.Schema.Types.ObjectId)).nonempty(),
});

export type Product = z.infer<typeof Product>;
