import mongoose from 'mongoose';
import { z } from 'zod';

export const Currency = z.enum(['ARS', 'USD']);

export type Currency = z.infer<typeof Currency>;

export const Invoice = z.object({
  number: z.string(),
  supplier: z.custom<mongoose.Types.ObjectId>(),
  issueDate: z.date(),
  dueOnDate: z.date(),
  currency: Currency,
  total: z.number(),
  detail: z.array(z.custom<mongoose.Schema>()).nonempty(),
});

export type Invoice = z.infer<typeof Invoice>;
