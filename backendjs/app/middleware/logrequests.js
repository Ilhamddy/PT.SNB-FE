import * as dotenv from "dotenv"
import * as path from "path"
import * as fs from "fs"

dotenv.config();

export const logRequests = (req, res, next) => {
    let method = req.method;
    let url = req.url;
    let body = req.body;
    let params = req.params;

    let status = res.statusCode;
    const logger = createLogger();
    logger.info(`${method}: ${url} ${status}`)
    logger.info(`BODY: ${JSON.stringify(body, null, 2)}`, true)
    logger.info(`PARAMS: ${JSON.stringify(params, null, 2)}`, true)
    logger.print();
    next();
}


const createLogger = () => {
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

    const fnTrace = (content) => {
        const formatted_date_time = createFormattedDateTime()
        let log = `[${formatted_date_time}] [TRACE] ${content}`;
        finalLog = finalLog + log + "\n";
    }

    const fnDebug = (content) => {
        const formatted_date_time = createFormattedDateTime()
        let log = `[${formatted_date_time}] [DEBUG] ${content}`;
        finalLog = finalLog + log + "\n";
    }

    const fnInfo = (content) => {
        const formatted_date_time = createFormattedDateTime()
        let log = `[${formatted_date_time}] [INFO] ${content}`;
        finalLog = finalLog + log + "\n";
    }

    const fnWarn = (content) => {
        const formatted_date_time = createFormattedDateTime()
        let log = `[${formatted_date_time}] [WARN] ${content}`;
        finalLog = finalLog + log + "\n";
    }

    const fnError = (content) => {
        const formatted_date_time = createFormattedDateTime()
        let log = `[${formatted_date_time}] [ERROR] ${content}`;
        finalLog = finalLog + log + "\n";
    }

    const fnFatal = (content) => {
        const formatted_date_time = createFormattedDateTime()
        let log = `[${formatted_date_time}] [FATAL] ${content}`;
        finalLog = finalLog + log + "\n";
    }

    const fnPrint = () => {
        let current_datetime = new Date();
        const formatted_date = current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate() +
            " "
        
        const __dirname = path.resolve(path.dirname(''));
        const dirPath = path.join(__dirname, "logs");
    
        const filePath = path.join(__dirname, "logs", `${formatted_date}.log`);
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
        if(process.env.NODE_ENV === "development"){
            console.log(finalLog) 
            console.log("=============================================\n")
        } else{
            const stream = fs.createWriteStream(filePath, {flags: 'a'});
            stream.write(finalLog + "\n");
            stream.write("=============================================\n")
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