import SupplierModel from '../../models/MasterData/supplier.model';
import { Supplier } from '../../schemas/supplier.schema';

export const createSupplier = (newSupplier: Supplier) => {
  return SupplierModel.create(newSupplier);
};

export const getAllSuppliers = () => {
  return SupplierModel.find({}).lean().exec();
};
