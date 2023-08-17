import mongoose from 'mongoose';
import { Product } from '../../schemas/product.schema';

const productSchema = new mongoose.Schema<Product>({});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
