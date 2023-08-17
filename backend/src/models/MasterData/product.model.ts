import mongoose from 'mongoose';
import { PRODUCT_CATEGORIES, Product } from '../../schemas/product.schema';

const productSchema = new mongoose.Schema<Product>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    maxLength: 50,
  },
  category: {
    type: [
      {
        type: String,
        enum: PRODUCT_CATEGORIES,
      },
    ],
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Active',
    enum: ['Active', 'Inactive'],
  },
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
