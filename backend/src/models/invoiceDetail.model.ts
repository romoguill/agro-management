import mongoose from 'mongoose';
import { InvoiceDetail } from '../schemas/invoiceDetail.schema';

export const invoiceDetailSchema = new mongoose.Schema<InvoiceDetail>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});
