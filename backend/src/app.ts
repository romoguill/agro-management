import express, { Request, Response } from 'express';
import createHttpError from 'http-errors';
import morgan from 'morgan';
import pinoHttp from 'pino-http';
import { logger } from './utils/logger';

import userRouter from './routes/user.route';

import { errorHandler } from './middlewares/errorHandler';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

app.use(pinoHttp({ logger }));

// ROUTES
app.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use('/api/users', userRouter);

// DEFAULT ROUTE
app.use((req, res, next) => next(createHttpError(404, 'Endpoint not found')));

// ERROR HANDLING
app.use(errorHandler);

export default app;
