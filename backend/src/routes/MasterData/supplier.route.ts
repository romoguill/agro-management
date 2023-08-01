import { Router } from 'express';
import * as SupplierController from '../../controllers/MasterData/supplier.controller';

const router = Router();

router.get('/', SupplierController.getAllSuppliers);
router.post('/', SupplierController.createSupplier);

export default router;
