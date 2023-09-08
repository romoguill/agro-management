import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import createHttpError from 'http-errors';
import pinoHttp from 'pino-http';
import { logger } from './utils/logger';

import supplierRouter from './routes/MasterData/supplier.route';
import productRouter from './routes/MasterData/product.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import invoiceRouter from './routes/invoice.route';

import { errorHandler } from './middlewares/errorHandler';

const app = express();

// MIDDLEWARES
app.use(express.json());

app.use(helmet());
app.use(cookieParser());

app.use(pinoHttp({ logger }));

// ROUTES
app.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/products', productRouter);
app.use('/api/invoices', invoiceRouter);

// DEFAULT ROUTE
app.use((req, res, next) => next(createHttpError(404, 'Endpoint not found')));

// ERROR HANDLING
app.use(errorHandler);

export default app;
