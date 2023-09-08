import mongoose from 'mongoose';
import { Currency, Invoice } from '../schemas/invoice.schema';
import { invoiceDetailSchema } from './invoiceDetail.model';

const invoiceSchema = new mongoose.Schema<Invoice>({
  number: {
    type: String,
    required: true,
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  dueOnDate: {
    type: Date,
    required: true,
  },
  currency: {
    type: String,
    enum: Currency.options,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  detail: {
    type: [invoiceDetailSchema],
    required: true,
  },
});

const InvoiceModel = mongoose.model<Invoice>('Invoice', invoiceSchema);

export default InvoiceModel;
