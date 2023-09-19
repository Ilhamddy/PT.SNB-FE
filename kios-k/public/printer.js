const { Printer } = require("@node-escpos/core");
const {command} = require('@node-escpos/core');
const { RollPaperSensorStatus } = require("@node-escpos/core")
/**
 * 
 * @param {*} param0 
 * @param {(printer: Printer) => Promise<void>} printAction 
 * @returns 
 */
function printPromise({device, isCut = true}, printAction){
    return new Promise((res, rej) => {
        if(!device) rej("Device not found");
        console.log("masuk")

        device.open(async function(errPrinter){
            if(errPrinter){
                rej(errPrinter)
                console.error("print error")
                return
            }
            console.log("masuk3")

            try{
                const options = { encoding: "GB18030" }
                let printer = new Printer(device, options);
                printer = await printAction(printer);
                
                if(isCut) printer.cut();
                printer.close();
                res(printer);
            }catch(errAction){
                device.close()
                console.error("print erorr")
                rej(errAction)
            }
        });
    })
}

function checkPrinterStatus(){
    return new Promise((res, rej) => {
        device.write(command.GS)
        device.write(coba)
        device.write(String.fromCharCode(3))
        let printer = new Printer(device, options);
        const timeout = setTimeout(() => {
            rej(false)
        }, 10000)
        printer.adapter.on("data", function (data) {
            console.log(typeof data)
            if(data.length === 0) return 
            console.log(data)
            clearTimeout(timeout)
            res(data)
        });
    })
}

function hexToInt(hex) {
    if (hex.length % 2 != 0) {
        hex = "0" + hex;
    }
    var num = parseInt(hex, 16);
    var maxVal = Math.pow(2, hex.length / 2 * 8);
    if (num > maxVal / 2 - 1) {
        num = num - maxVal
    }
    return num;
}

module.exports = {
    printPromise,
}