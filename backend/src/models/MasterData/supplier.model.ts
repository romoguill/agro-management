import mongoose from 'mongoose';
import { Supplier } from '../../schemas/supplier.schema';

const supplierSchema = new mongoose.Schema<Supplier>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Active',
    enum: ['Active', 'Inactive'],
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  cuit: {
    type: String,
    required: true,
  },
});

const SupplierModel = mongoose.model<Supplier>('Supplier', supplierSchema);

export default SupplierModel;
