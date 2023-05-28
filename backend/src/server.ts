import 'dotenv/config';
import env from './utils/validateEnv';
import mongoose from 'mongoose';
import express from 'express';

const app = express();

mongoose
  .connect(env.MONGO_CONNECTION_URI)
  .then(() => {
    console.log('Connected to Mongo Database');

    app.listen(env.PORT, () =>
      console.log(`Server running on port ${env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
