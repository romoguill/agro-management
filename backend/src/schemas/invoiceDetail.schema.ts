import mongoose from 'mongoose';
import { z } from 'zod';

export const InvoiceDetail = z.object({
  product: z.custom<mongoose.Types.ObjectId>(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
});

export type InvoiceDetail = z.infer<typeof InvoiceDetail>;
