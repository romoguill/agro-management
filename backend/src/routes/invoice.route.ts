import { Router } from 'express';
import * as InvoiceController from '../controllers/invoice.controller';
import { validate } from '../middlewares/requestValidation';
import {
  RequestCreateInvoice,
  RequestDeleteInvoice,
  RequestGetInvoiceById,
  RequestUpdateInvoice,
} from '../schemas/invoice.schema';
import { verifyAuth } from '../middlewares/verifyAuth';

const router = Router();

router.get(
  '/',
  verifyAuth(['Admin', 'User']),
  InvoiceController.getAllInvoices
);

router.get(
  '/:id',
  verifyAuth(['Admin', 'User']),
  validate(RequestGetInvoiceById),
  InvoiceController.getInvoice
);

router.post(
  '/',
  verifyAuth(['Admin', 'User']),
  validate(RequestCreateInvoice),
  InvoiceController.createInvoice
);

router.patch(
  '/:id',
  verifyAuth(['Admin', 'User']),
  validate(RequestUpdateInvoice),
  InvoiceController.updateInvoice
);

router.delete(
  '/:id',
  verifyAuth(['Admin', 'User']),
  validate(RequestDeleteInvoice),
  InvoiceController.deleteInvoice
);

export default router;
