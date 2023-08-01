import mongoose from 'mongoose';
import { z } from 'zod';

export const supplierSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string().optional(),
  category: z.array(z.enum(['Seeds', 'Fertilizers', 'Herbicides', 'Labor'])),
  status: z.enum(['Active', 'Inactive']),
  phone: z.string({ required_error: 'Phone is required' }),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
  cuit: z.string({ required_error: 'CUIT is required' }),
});

export type Supplier = z.infer<typeof supplierSchema>;
