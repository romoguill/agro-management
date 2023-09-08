import createHttpError from 'http-errors';
import * as CampaignService from '../services/campaign.service';
import { NextFunction, Request, Response } from 'express';
import {
  RequestCreateCampaign,
  RequestDeleteCampaign,
  RequestGetCampaignById,
  RequestUpdateCampaign,
} from '../schemas/campaign.schema';

export const createCampaign = async (
  req: Request<unknown, unknown, RequestCreateCampaign['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaign = await CampaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllCampaigns = async (req: Request, res: Response) => {
  const campaigns = await CampaignService.getAllCampaigns();
  res.status(200).json(campaigns);
};

export const getCampaign = async (
  req: Request<RequestGetCampaignById['params']>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const campaign = await CampaignService.getCampaignById(id);
    if (!campaign)
      return next(createHttpError(404, `Campaign with id: ${id} not found`));

    res.status(200).json(campaign);
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (
  req: Request<
    RequestUpdateCampaign['params'],
    unknown,
    RequestUpdateCampaign['body']
  >,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const campaign = await CampaignService.updateCampaign(id, req.body);
    if (!campaign)
      return next(createHttpError(404, `Campaign with id: ${id} not found`));

    res.status(200).json(campaign);
  } catch (error) {
    next(error);
  }
};

export const deleteCampaign = async (
  req: Request<RequestDeleteCampaign['params']>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const campaign = await CampaignService.deleteCampaign(id);
    if (!campaign)
      return next(createHttpError(404, `Campaign with id: ${id} not found`));

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
