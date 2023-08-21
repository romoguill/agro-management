import mongoose from 'mongoose';
import { z } from 'zod';
import { objectIdValidator } from '../utils/idValidator';

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

export const RequestCreateProduct = z.object({
  params: z.any().optional(),
  query: z.any().optional(),
  body: Product,
});

export type RequestCreateProduct = z.infer<typeof RequestCreateProduct>;

export const RequestUpdateProduct = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: Product.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'There were no fields specified to be updated',
  }),
});

export type RequestUpdateProduct = z.infer<typeof RequestUpdateProduct>;

export const RequestGetProductById = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: z.any().optional(),
});

export type RequestGetProductById = z.infer<typeof RequestGetProductById>;

export const RequestDeleteProduct = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: z.any().optional(),
});

export type RequestDeleteProduct = z.infer<typeof RequestDeleteProduct>;
