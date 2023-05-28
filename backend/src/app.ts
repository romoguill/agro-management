import express, { Request, Response, NextFunction } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.get('/', (req, res) => res.send('working'));

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
