import { NextFunction, Request, Response } from 'express';
import * as SupplierService from '../../services/MasterData/supplier.service';

export const createSupplier = async (req: Request, res: Response) => {
  const supplier = await SupplierService.createSupplier(req.body);
  res.status(200).json({ supplier });
};

export const getAllSuppliers = async (req: Request, res: Response) => {
  const suppliers = await SupplierService.getAllSuppliers();
  res.status(200).json({ suppliers });
};

export const getSupplier = async (req: Request, res: Response) => {};
