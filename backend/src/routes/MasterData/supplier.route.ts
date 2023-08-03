import { Router } from 'express';
import * as SupplierController from '../../controllers/MasterData/supplier.controller';
import { validate } from '../../middlewares/requestValidation';
import {
  RequestCreateSupplier,
  RequestDeleteSupplier,
  RequestGetSupplierById,
  RequestUpdateSupplier,
} from '../../schemas/supplier.schema';
import { verifyAuth } from '../../middlewares/verifyAuth';

const router = Router();

router.get(
  '/',
  verifyAuth(['Admin', 'User', 'Visitor']),
  SupplierController.getAllSuppliers
);

router.get(
  '/:id',
  verifyAuth(['Admin', 'User', 'Visitor']),
  validate(RequestGetSupplierById),
  SupplierController.getSupplier
);

router.post(
  '/',
  verifyAuth(['Admin', 'User']),
  validate(RequestCreateSupplier),
  SupplierController.createSupplier
);

router.patch(
  '/:id',
  verifyAuth(['Admin', 'User']),
  validate(RequestUpdateSupplier),
  SupplierController.updateSupplier
);

router.delete(
  '/:id',
  verifyAuth(['Admin']),
  validate(RequestDeleteSupplier),
  SupplierController.deleteSupplier
);

export default router;
