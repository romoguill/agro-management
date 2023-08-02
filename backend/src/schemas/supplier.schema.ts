import mongoose from 'mongoose';
import { z } from 'zod';
import { objectIdValidator } from '../utils/idValidator';

export const Supplier = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string().optional(),
  category: z.array(z.enum(['Seeds', 'Fertilizers', 'Herbicides', 'Labor'])),
  status: z.enum(['Active', 'Inactive']),
  phone: z.string({ required_error: 'Phone is required' }),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
  cuit: z.string({ required_error: 'CUIT is required' }),
});

export type Supplier = z.infer<typeof Supplier>;

export const RequestCreateSupplier = z.object({
  params: z.any().optional(),
  query: z.any().optional(),
  body: Supplier,
});

export type RequestCreateSupplier = z.infer<typeof RequestCreateSupplier>;

export const RequestUpdateSupplier = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: Supplier.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'There were no fields specified to be updated',
  }),
});

export type RequestUpdateSupplier = z.infer<typeof RequestUpdateSupplier>;

export const RequestGetSupplierById = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: z.any().optional(),
});

export type RequestGetSupplierById = z.infer<typeof RequestGetSupplierById>;
