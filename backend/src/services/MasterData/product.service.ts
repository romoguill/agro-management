import ProductModel from '../../models/MasterData/product.model';
import { Product } from '../../schemas/product.schema';

export const createSupplier = (newSupplier: Product) => {
  return ProductModel.create(newSupplier);
};

export const getAllSuppliers = () => {
  return ProductModel.find({}).lean().exec();
};

export const getSupplierByName = (name: string) => {
  return ProductModel.findOne({ name }).lean().exec();
};

export const getSupplierById = (id: string) => {
  return ProductModel.findById(id).lean().exec();
};

export const updateSupplier = (id: string, fields: Partial<Product>) => {
  return ProductModel.findByIdAndUpdate(id, fields, {
    returnDocument: 'after',
    runValidators: true,
  })
    .lean()
    .exec();
};

export const deleteSupplier = (id: string) => {
  return ProductModel.findByIdAndRemove(id).lean().exec();
};
