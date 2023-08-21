import { Router } from 'express';
import * as ProductController from '../../controllers/MasterData/product.controller';
import { validate } from '../../middlewares/requestValidation';
import {
  RequestCreateProduct,
  RequestDeleteProduct,
  RequestGetProductById,
  RequestUpdateProduct,
} from '../../schemas/product.schema';
import { verifyAuth } from '../../middlewares/verifyAuth';

const router = Router();

router.get(
  '/',
  verifyAuth(['Admin', 'User', 'Visitor']),
  ProductController.getAllProducts
);

router.get(
  '/:id',
  verifyAuth(['Admin', 'User', 'Visitor']),
  validate(RequestGetProductById),
  ProductController.getProduct
);

router.post(
  '/',
  verifyAuth(['Admin', 'User']),
  validate(RequestCreateProduct),
  ProductController.createProduct
);

router.patch(
  '/:id',
  verifyAuth(['Admin', 'User']),
  validate(RequestUpdateProduct),
  ProductController.updateProduct
);

router.delete(
  '/:id',
  verifyAuth(['Admin']),
  validate(RequestDeleteProduct),
  ProductController.deleteProduct
);

export default router;
