import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  RequestCreateProduct,
  RequestDeleteProduct,
  RequestGetProductById,
  RequestUpdateProduct,
} from '../../schemas/product.schema';
import * as ProductService from '../../services/MasterData/product.service';

export const createProduct = async (
  req: Request<unknown, unknown, RequestCreateProduct['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductService.getAllProducts();
  res.status(200).json(products);
};

export const getProduct = async (
  req: Request<RequestGetProductById['params']>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const product = await ProductService.getProductById(id);
    if (!product)
      return next(createHttpError(404, `Product with id: ${id} not found`));

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request<
    RequestUpdateProduct['params'],
    unknown,
    RequestUpdateProduct['body']
  >,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const product = await ProductService.updateProduct(id, req.body);
    if (!product)
      return next(createHttpError(404, `Product with id: ${id} not found`));

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request<RequestDeleteProduct['params']>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const product = await ProductService.deleteProduct(id);
    if (!product)
      return next(createHttpError(404, `Product with id: ${id} not found`));

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
