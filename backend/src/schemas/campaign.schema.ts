import { z } from 'zod';
import { Crop } from './crop.schema';
import mongoose from 'mongoose';

export const Campaign = z.object({
  crop: Crop,
  start: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start field must be a date',
  }),
  finish: z
    .date({ invalid_type_error: 'Finish field must be a date' })
    .optional(),
  // owner: z.string({ required_error: 'Owner is required' }),
  owner: z.custom<mongoose.Types.ObjectId>(),
  invoices: z.array(z.custom<mongoose.Types.ObjectId>()).optional(),
});

export type Campaign = z.infer<typeof Campaign>;
