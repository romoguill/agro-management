import { FilterQuery } from 'mongoose';
import InvoiceModel from '../models/invoice.model';
import { Invoice } from '../schemas/invoice.schema';

export const createInvoice = (newInvoice: Invoice) => {
  return InvoiceModel.create(newInvoice);
};

export const getAllInvoices = (filter?: FilterQuery<Invoice>) => {
  return (
    InvoiceModel.find({ ...filter })
      // .populate({
      //   path: 'detail',
      //   populate: {
      //     path: 'product',
      //   },
      // })
      .lean()
      .exec()
  );
};

export const getInvoiceById = (id: string) => {
  return InvoiceModel.findById(id).lean().exec();
};

export const updateInvoice = (id: string, fields: Partial<Invoice>) => {
  return InvoiceModel.findByIdAndUpdate(id, fields, {
    returnDocument: 'after',
    runValidators: true,
  })
    .lean()
    .exec();
};

export const deleteInvoice = (id: string) => {
  return InvoiceModel.findByIdAndRemove(id).lean().exec();
};
