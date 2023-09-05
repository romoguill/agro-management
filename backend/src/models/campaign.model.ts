import mongoose from 'mongoose';
import { Campaign } from '../schemas/campaign.schema';

const campaignSchema = new mongoose.Schema<Campaign>({
  // TODO
});

const CampaignModel = mongoose.model<Campaign>('Campaign', campaignSchema);

export default CampaignModel;
