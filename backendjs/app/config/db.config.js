import dotenv from "dotenv"

dotenv.config();

export default {
    HOST: process.env.API_HOST,
    USER: process.env.API_USER,
    PASSWORD: process.env.API_PASSWORD,
    DB: process.env.API_DB,
    dialect: process.env.API_USER,
    PORT: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  };
