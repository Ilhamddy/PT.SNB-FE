const config = require("../config/db.config.js");

const Pool = require("pg").Pool;

const pool = new Pool({
    user: config.USER,
    host: config.HOST,
    database: config.DB,
    password: config.PASSWORD,
    port: config.PORT,
});

module.exports = pool;