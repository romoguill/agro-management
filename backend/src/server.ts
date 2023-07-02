import 'dotenv/config';
import env from './utils/validateEnv';
import mongoose from 'mongoose';
import app from './app';
import { logger } from './utils/logger';

mongoose
  .connect(env.MONGO_CONNECTION_URI)
  .then(() => {
    logger.info('Connected to Mongo Database');

    app.listen(env.PORT, () =>
      console.log(`Server running on port ${env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
