import mongoose from 'mongoose';
import { Campaign } from '../schemas/campaign.schema';

const campaignSchema = new mongoose.Schema<Campaign>({
  crop: {
    type: String,
    required: true,
    unique: true,
  },
  start: {
    type: Date,
    required: true,
  },
  finish: {
    type: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }],
});

const CampaignModel = mongoose.model<Campaign>('Campaign', campaignSchema);

export default CampaignModel;
