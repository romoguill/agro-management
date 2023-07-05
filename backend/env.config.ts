import dotenv from 'dotenv';

const result = dotenv.config({
  path: `./.env.${process.env.NODE_ENV ?? 'development'}`,
});

if (result.error) {
  throw new Error(`Error loading env variables: ${result.error.message}`);
}
