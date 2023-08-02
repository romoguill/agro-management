import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  RequestCreateSupplier,
  RequestGetSupplierById,
  RequestUpdateSupplier,
} from '../../schemas/supplier.schema';
import * as SupplierService from '../../services/MasterData/supplier.service';

export const createSupplier = async (
  req: Request<unknown, unknown, RequestCreateSupplier['body']>,
  res: Response
) => {
  const supplier = await SupplierService.createSupplier(req.body);
  res.status(200).json({ supplier });
};

export const getAllSuppliers = async (req: Request, res: Response) => {
  const suppliers = await SupplierService.getAllSuppliers();
  res.status(200).json({ suppliers });
};

export const getSupplier = async (
  req: Request<RequestGetSupplierById['params']>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const supplier = await SupplierService.getSupplierById(id);
    if (!supplier)
      return next(createHttpError(404, `Supplier with id: ${id} not found`));

    res.status(200).json({ supplier });
  } catch (error) {
    next(error);
  }
};

export const updateSupplier = async (
  req: Request<
    RequestUpdateSupplier['params'],
    unknown,
    RequestUpdateSupplier['body']
  >,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const supplier = await SupplierService.updateSupplier(id, req.body);

    res.status(200).json({ supplier });
  } catch (error) {
    next(error);
  }
};
