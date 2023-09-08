import { FilterQuery } from 'mongoose';
import CampaignModel from '../models/campaign.model';
import { Campaign } from '../schemas/campaign.schema';

export const createCampaign = (newCampaign: Campaign) => {
  return CampaignModel.create(newCampaign);
};

export const getAllCampaigns = (filter?: FilterQuery<Campaign>) => {
  return CampaignModel.find({ ...filter })
    .lean()
    .exec();
};

export const getCampaignById = (id: string) => {
  return CampaignModel.findById(id).lean().exec();
};

export const updateCampaign = (id: string, fields: Partial<Campaign>) => {
  return CampaignModel.findByIdAndUpdate(id, fields, {
    returnDocument: 'after',
    runValidators: true,
  })
    .lean()
    .exec();
};

export const deleteCampaign = (id: string) => {
  return CampaignModel.findByIdAndRemove(id).lean().exec();
};
