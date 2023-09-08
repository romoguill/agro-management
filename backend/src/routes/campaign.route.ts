import { Router } from 'express';
import * as CampaignController from '../controllers/campaign.controller';
import { validate } from '../middlewares/requestValidation';
import {
  RequestCreateCampaign,
  RequestDeleteCampaign,
  RequestGetCampaignById,
  RequestUpdateCampaign,
} from '../schemas/campaign.schema';
import { verifyAuth } from '../middlewares/verifyAuth';

const router = Router();

router.get(
  '/',
  verifyAuth(['Admin', 'User']),
  CampaignController.getAllCampaigns
);

router.get(
  '/:id',
  verifyAuth(['Admin', 'User']),
  validate(RequestGetCampaignById),
  CampaignController.getCampaign
);

router.post(
  '/',
  verifyAuth(['Admin', 'User']),
  validate(RequestCreateCampaign),
  CampaignController.createCampaign
);

router.patch(
  '/:id',
  verifyAuth(['Admin', 'User']),
  validate(RequestUpdateCampaign),
  CampaignController.updateCampaign
);

router.delete(
  '/:id',
  verifyAuth(['Admin', 'User']),
  validate(RequestDeleteCampaign),
  CampaignController.deleteCampaign
);

export default router;
