import { cleanEnv, str } from 'envalid';

export default cleanEnv(process.env, {
  MONGO_CONNECTION_URI: str(),
  PORT: str(),
});
