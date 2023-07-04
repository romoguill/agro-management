import { InferSchemaType, Schema, model } from 'mongoose';

const supplierSchema = new Schema({
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
  status: {
    type: String,
    required: true,
    default: 'active',
    enum: ['active', 'inactive'],
  },
  phone: {
    type: Number,
  },
  website: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  CUIT: {
    type: String,
  },
});

type Supplier = InferSchemaType<typeof supplierSchema>;

export default model<Supplier>('Supplier', supplierSchema);
