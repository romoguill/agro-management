import mongoose from 'mongoose';
import { z } from 'zod';
import { objectIdValidator } from '../utils/idValidator';

export const Currency = z.enum(['ARS', 'USD']);

export type Currency = z.infer<typeof Currency>;

export const Invoice = z.object({
  number: z.string(),
  campaign: z.custom<mongoose.Types.ObjectId>(),
  supplier: z.custom<mongoose.Types.ObjectId>(),
  issueDate: z.coerce.date({
    errorMap: () => {
      return { message: 'Issue date format is invalid' };
    },
  }),
  dueOnDate: z.coerce.date({
    errorMap: () => {
      return { message: 'Due On date format is invalid' };
    },
  }),
  currency: Currency,
  total: z.number(),
  detail: z.array(z.custom<mongoose.Schema>()).nonempty(),
});

export type Invoice = z.infer<typeof Invoice>;

export const RequestCreateInvoice = z.object({
  params: z.any().optional(),
  query: z.any().optional(),
  body: Invoice,
});

export type RequestCreateInvoice = z.infer<typeof RequestCreateInvoice>;

export const RequestGetInvoiceById = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: z.any().optional(),
});

export type RequestGetInvoiceById = z.infer<typeof RequestGetInvoiceById>;

export const RequestUpdateInvoice = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: Invoice.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'There were no fields specified to be updated',
  }),
});

export type RequestUpdateInvoice = z.infer<typeof RequestUpdateInvoice>;

export const RequestDeleteInvoice = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: z.any().optional(),
});

export type RequestDeleteInvoice = z.infer<typeof RequestDeleteInvoice>;
