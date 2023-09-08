import { z } from 'zod';
import { Crop } from './crop.schema';
import mongoose from 'mongoose';
import { objectIdValidator } from '../utils/idValidator';

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

export const RequestCreateCampaign = z.object({
  params: z.any().optional(),
  query: z.any().optional(),
  body: Campaign,
});

export type RequestCreateCampaign = z.infer<typeof RequestCreateCampaign>;

export const RequestGetCampaignById = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: z.any().optional(),
});

export type RequestGetCampaignById = z.infer<typeof RequestGetCampaignById>;

export const RequestUpdateCampaign = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: Campaign.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'There were no fields specified to be updated',
  }),
});

export type RequestUpdateCampaign = z.infer<typeof RequestUpdateCampaign>;

export const RequestDeleteCampaign = z.object({
  params: objectIdValidator(),
  query: z.any().optional(),
  body: z.any().optional(),
});

export type RequestDeleteCampaign = z.infer<typeof RequestDeleteCampaign>;
