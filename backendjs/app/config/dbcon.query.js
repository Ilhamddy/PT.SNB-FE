import config from "../config/db.config.js";
import pg from "pg";

const Pool = pg.Pool;
const pool = new Pool({
    user: config.USER,
    host: config.HOST,
    database: config.DB,
    password: config.PASSWORD,
    port: config.PORT,
});

export default pool;