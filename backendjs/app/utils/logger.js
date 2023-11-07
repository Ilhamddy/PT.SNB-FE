import * as path from "path"
import * as fs from "fs"

export const createLogger = (logname) => {
    let logName = logname
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

    const fnLogErr = (err, logName = "INFO") => {
        const formatted_date_time = createFormattedDateTime()
        let log = `[${formatted_date_time}] [${logName}] ` + 
        `\n MESSAGE: ${err.message}` + 
        `\n STACK: ${err.stack}` + 
        `\n NAME: ${err.name}`+
        `\n SEQUELIZE_VALIDATION: -${err.errors?.map(e => e.message).join('\n-') || ""}`

        finalLog = finalLog + log + "\n";
    }

    const fnTrace = (content) => fnLog(content, "TRACE")

    const fnDebug = (content) => fnLog(content, "DEBUG")

    const fnInfo = (content) => fnLog(content, "INFO")

    const fnWarn = (content) => fnLog(content, "WARN")

    const fnError = (content) => {
        if(typeof content === "string"){
            fnLog(content, "ERROR")
        }else if(typeof content === "object"){
            fnLogErr(content, "ERROR")
        }
    }

    const fnFatal = (content) => fnLog(content, "FATAL")

    const fnLogImmediate = (content) => {
        const formatted_date_time = createFormattedDateTime()
        let current_datetime = new Date();
        const formatted_date = current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate() 
        let log = `[${formatted_date_time}] [${logName}] ${content}`;
        if(process.env.NODE_ENV === "development"){
            console.log(log)
        } else{
            const __dirname = path.resolve(path.dirname(''));
            const dirPath = path.join(__dirname, "logs");
        
            const filePath = path.join(__dirname, "logs", `${formatted_date}.log`);
            if (!fs.existsSync(dirPath)){
                fs.mkdirSync(dirPath);
            }
            const stream = fs.createWriteStream(filePath, {flags: 'a'});
            stream.write(log);
            stream.end()
        }
    }

    const fnPrint = (newLogName) => {
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
            console.log(`=========${logName}=========\n`)
            console.log(finalLog) 
        } else{
            const stream = fs.createWriteStream(filePath, {flags: 'a'});
            stream.write(`\n=========${logName}=========\n`)
            stream.write(finalLog);
            stream.end()
        }
        finalLog = ""
        logName = newLogName
    }
   
    
    return {
        trace: fnTrace,
        debug: fnDebug,
        info: fnInfo,
        warn: fnWarn,
        error: fnError,
        fatal: fnFatal,
        print: fnPrint,
        infoImmediate: fnLogImmediate
    }
}