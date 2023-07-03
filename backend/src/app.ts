import express, { Request, Response, NextFunction } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';
import session from 'express-session';
import env from './utils/validateEnv';
import MongoStore from 'connect-mongo';
import { logger } from './utils/logger';
import pinoHttp from 'pino-http';

import userRouter from './routes/userRoutes';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

app.use(
  session({
    secret: env.SESSION_SECRET,
    name: 'agro-userId',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_URI,
    }),
  })
);

app.use(pinoHttp({ logger }));

// ROUTES
app.use('/api/users', userRouter);

// DEFAULT ROUTE
app.use((req, res, next) => next(createHttpError(404, 'Endpoint not found')));

// ERROR HANDLING
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An error occured';
  let statusCode = 500;

  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }

  res.status(statusCode).send({ error: errorMessage });
});

export default app;
