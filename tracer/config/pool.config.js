const config = require("./pool.config.js");
const pg = require("pg");

const dotenv = require("dotenv")

dotenv.config();

const dbConfig =  {
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


const Pool = pg.Pool;
const pool = new Pool({
    user: dbConfig.USER,
    host: dbConfig.HOST,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT,
});

module.exports = {
    pool,
    dbConfig
} ;