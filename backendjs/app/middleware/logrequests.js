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
    const logger = createLogger("REQUEST EXPRESS");
    let isShowBodyRes = false
    res.locals.showBodyRes = () => {
        isShowBodyRes = true
    }
    res.locals.logger = logger
    logger.info(`CLIENT-URL: ${clientUrl}`)
    logger.info(`METHOD: ${method} ${url} ${status}`)
    logger.info(`BODY: ${JSON.stringify(body, null, 2)}`, true)
    logger.info(`PARAMS: ${JSON.stringify(params, null, 2)}`, true)
    logger.info(`QUERY: ${JSON.stringify(query, null, 2)}`, true)
    res.on("finish", () => {
        logger.info(`STATUS: ${status}`)
        if(isShowBodyRes){
            logger.info(`RESPONSE-BODY: ${JSON.stringify(JSON.parse(res.locals.body), null, 2)}`, true)
        }else{
            logger.info(`RESPONSE-BODY: to show body use \nres.locals.showBodyRes()`, true)
        }
        logger.print();
    })

    next();
}

export const addResBody = (req, res, next) => {
    const send = res.send;
    res.send = function (body) {
      res.locals.body = body
      send.call(this, body);
    };
    next()
}