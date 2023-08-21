import ProductModel from '../../models/MasterData/product.model';
import { Product } from '../../schemas/product.schema';

export const createProduct = (newProduct: Product) => {
  return ProductModel.create(newProduct);
};

export const getAllProducts = () => {
  return ProductModel.find({}).lean().exec();
};

export const getProductByName = (name: string) => {
  return ProductModel.findOne({ name }).lean().exec();
};

export const getProductById = (id: string) => {
  return ProductModel.findById(id).lean().exec();
};

export const updateProduct = (id: string, fields: Partial<Product>) => {
  return ProductModel.findByIdAndUpdate(id, fields, {
    returnDocument: 'after',
    runValidators: true,
  })
    .lean()
    .exec();
};

export const deleteProduct = (id: string) => {
  return ProductModel.findByIdAndRemove(id).lean().exec();
};
