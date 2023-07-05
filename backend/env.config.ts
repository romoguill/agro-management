import dotenv from 'dotenv';

const result = dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

if (result.error) {
  throw new Error('Error loading environment variables');
}
