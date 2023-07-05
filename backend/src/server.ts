import '../env.config';
import mongoose from 'mongoose';
import app from './app';
import { logger } from './utils/logger';

mongoose
  .connect(process.env.MONGO_CONNECTION_URI as string)
  .then(() => {
    logger.info('Connected to Mongo Database');

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
