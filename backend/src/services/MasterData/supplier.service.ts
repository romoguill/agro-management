import SupplierModel from '../../models/MasterData/supplier.model';
import { Supplier } from '../../schemas/supplier.schema';

export const createSupplier = (newSupplier: Supplier) => {
  return SupplierModel.create(newSupplier);
};

export const getAllSuppliers = () => {
  return SupplierModel.find({}).lean().exec();
};

export const getSupplierByName = (name: string) => {
  return SupplierModel.findOne({ name }).lean().exec();
};

export const getSupplierById = (id: string) => {
  return SupplierModel.findById(id).lean().exec();
};

export const updateSupplier = (id: string, fields: Partial<Supplier>) => {
  return SupplierModel.findByIdAndUpdate(id, fields, {
    returnDocument: 'after',
    runValidators: true,
  })
    .lean()
    .exec();
};
