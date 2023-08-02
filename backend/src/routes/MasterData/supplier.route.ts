import { Router } from 'express';
import * as SupplierController from '../../controllers/MasterData/supplier.controller';
import { validate } from '../../middlewares/requestValidation';
import { RequestCreateSupplier } from '../../schemas/supplier.schema';

const router = Router();

router.get('/', SupplierController.getAllSuppliers);
router.post(
  '/',
  validate(RequestCreateSupplier),
  SupplierController.createSupplier
);

export default router;
