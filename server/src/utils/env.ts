import dotenv from "dotenv";

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV,
  APP_LISTEN_PORT: process.env.APP_LISTEN_PORT,
  SERVER_HOST: process.env.SERVER_HOST,
  //
};

export default env;
