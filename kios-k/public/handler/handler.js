
const fs = require('fs');
const ptp = require("pdf-to-printer");

const toPrint = async (e, {devicePrintBus}) => {
    // console.log(devicePrintBus)
    const hasilPrint = await hPrintFile({base64pdf:devicePrintBus})
    return hasilPrint
}

module.exports = {
    toPrint,
}

const hPrintFile = async ({
    base64pdf
}) => {
    try{
        let base64Data = base64pdf.replace(/^data:application\/pdf;filename\=generated\.pdf;base64,/, "");

        fs.writeFileSync("../hasil.pdf", base64Data, 'base64')
        await ptp.print("../hasil.pdf", {printer: 'Canon E480 series Printer'})
    }catch(error){
        console.error(error)
    }
}