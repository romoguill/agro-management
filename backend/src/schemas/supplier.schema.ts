import mongoose from 'mongoose';
import { z } from 'zod';

export const supplierSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string().optional(),
  category: z.instanceof(mongoose.Types.ObjectId),
  status: z.enum(['Active', 'Inactive']),
  phone: z.string({ required_error: 'Phone is required' }),
  website: z.string({ required_error: 'Website is required' }),
  avatarUrl: z.string({ required_error: 'Avatar is required' }),
  cuit: z.string({ required_error: 'CUIT is required' }),
});

export type Supplier = z.infer<typeof supplierSchema>;
