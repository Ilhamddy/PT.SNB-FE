import * as dotenv from "dotenv"
import { createLogger } from "../utils/logger";


dotenv.config();

export const logRequests = (req, res, next) => {
    let method = req.method;
    let url = req.url;
    let body = req.body;
    let params = req.params;
    let query = req.query;
    let clientUrl = req.get("X-Client-Url")

    let status = res.statusCode;
    const logger = createLogger("request express");
    logger.info(`CLIENT-URL: ${clientUrl}`)
    logger.info(`METHOD: ${method} ${url} ${status}`)
    logger.info(`BODY: ${JSON.stringify(body, null, 2)}`, true)
    logger.info(`PARAMS: ${JSON.stringify(params, null, 2)}`, true)
    logger.info(`QUERY: ${JSON.stringify(query, null, 2)}`, true)
    logger.print();
    next();
}


