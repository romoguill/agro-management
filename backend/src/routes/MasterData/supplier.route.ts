import { Router } from 'express';
import * as SupplierController from '../../controllers/MasterData/supplier.controller';
import { validate } from '../../middlewares/requestValidation';
import {
  RequestCreateSupplier,
  RequestGetSupplierById,
  RequestUpdateSupplier,
} from '../../schemas/supplier.schema';

const router = Router();

router.get('/', SupplierController.getAllSuppliers);
router.get(
  '/:id',
  validate(RequestGetSupplierById),
  SupplierController.getSupplier
);
router.post(
  '/',
  validate(RequestCreateSupplier),
  SupplierController.createSupplier
);
router.patch(
  '/:id',
  validate(RequestUpdateSupplier),
  SupplierController.updateSupplier
);

export default router;
