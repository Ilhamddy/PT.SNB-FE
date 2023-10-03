const pg = require("pg");

const dotenv = require("dotenv")

dotenv.config();
const environment = {
    NODE_ENV: "development",
    PORT: 8085,
    API_HOST: "103.149.177.11",
    API_USER: "postgres",
    API_PASSWORD: "@b3rd1k4r1@",
    API_DB: "standart_v1",
    API_dialect: "postgres"
}


const dbConfig =  {
    HOST: environment.API_HOST,
    USER: environment.API_USER,
    PASSWORD: environment.API_PASSWORD,
    DB: environment.API_DB,
    dialect: environment.API_USER,
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
    dbConfig,
    environment
} ;