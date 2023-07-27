import * as dotenv from "dotenv"
import * as path from "path"
import * as fs from "fs"

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


export const createLogger = (logname) => {
    let finalLog = "";
    const createFormattedDateTime = () => {
        let current_datetime = new Date();
        let formatted_date_time =
            current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate() +
            " " +
            current_datetime.getHours() +
            ":" +
            current_datetime.getMinutes() +
            ":" +
            current_datetime.getSeconds();
        return formatted_date_time
    }

    const fnLog = (content, logName = "INFO") => {
        const formatted_date_time = createFormattedDateTime()
        let log = `[${formatted_date_time}] [${logName}] ${content}`;
        finalLog = finalLog + log + "\n";
    }

    const fnTrace = (content) => fnLog(content, "TRACE")

    const fnDebug = (content) => fnLog(content, "DEBUG")

    const fnInfo = (content) => fnLog(content, "INFO")

    const fnWarn = (content) => fnLog(content, "WARN")

    const fnError = (content) => fnLog(content, "ERROR")

    const fnFatal = (content) => fnLog(content, "FATAL")

    const fnPrint = () => {
        let current_datetime = new Date();
        const formatted_date = current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate() 
        
        const __dirname = path.resolve(path.dirname(''));
        const dirPath = path.join(__dirname, "logs");
    
        const filePath = path.join(__dirname, "logs", `${formatted_date}.log`);
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
        if(process.env.NODE_ENV === "development"){
            console.log(`=========${logname.toLocaleUpperCase()}=========\n`)
            console.log(finalLog) 
        } else{
            const stream = fs.createWriteStream(filePath, {flags: 'a'});
            stream.write(`\n=========${logname.toLocaleUpperCase()}=========\n`)
            stream.write(finalLog);
            stream.end()
        }
    }
   
    
    return {
        trace: fnTrace,
        debug: fnDebug,
        info: fnInfo,
        warn: fnWarn,
        error: fnError,
        fatal: fnFatal,
        print: fnPrint
    }
}