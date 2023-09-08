import createHttpError from 'http-errors';
import * as InvoiceService from '../services/invoice.service';
import { NextFunction, Request, Response } from 'express';
import {
  RequestCreateInvoice,
  RequestDeleteInvoice,
  RequestGetInvoiceById,
  RequestUpdateInvoice,
} from '../schemas/invoice.schema';

export const createInvoice = async (
  req: Request<unknown, unknown, RequestCreateInvoice['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoice = await InvoiceService.createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllInvoices = async (req: Request, res: Response) => {
  const invoices = await InvoiceService.getAllInvoices();
  res.status(200).json(invoices);
};

export const getInvoice = async (
  req: Request<RequestGetInvoiceById['params']>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const invoice = await InvoiceService.getInvoiceById(id);
    if (!invoice)
      return next(createHttpError(404, `Invoice with id: ${id} not found`));

    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (
  req: Request<
    RequestUpdateInvoice['params'],
    unknown,
    RequestUpdateInvoice['body']
  >,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const invoice = await InvoiceService.updateInvoice(id, req.body);
    if (!invoice)
      return next(createHttpError(404, `Invoice with id: ${id} not found`));

    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const deleteInvoice = async (
  req: Request<RequestDeleteInvoice['params']>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const invoice = await InvoiceService.deleteInvoice(id);
    if (!invoice)
      return next(createHttpError(404, `Invoice with id: ${id} not found`));

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
