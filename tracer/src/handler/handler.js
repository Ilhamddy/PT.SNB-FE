const { printPromise } = require("../printer")
const fs = require('fs');
const USB = require('@node-escpos/usb-adapter');
const { getDataNotPrinted, updateDaftarPasien } = require("../controller");
const ptp = require("pdf-to-printer");
const os = require('os');
const path = require('path');


const toPrintPOS = async (e, {devicePrintBus}) => {
    const devices = await USB.findPrinter();
    console.log(devices)
    const deviceChosen = devices.find((device) => {
        return device.busNumber === devicePrintBus
    })
    if(!deviceChosen) {
        throw new Error("Device not found")
    }
    const datas = await getDataNotPrinted()
    const device = new USB(
      deviceChosen.deviceDescriptor.idVendor, 
      deviceChosen.deviceDescriptor.idProduct
    )

    await hPrintAll(datas, device)
    
}
  
const toGetHTML = async (e, options) => {
    const htmlContent = fs.readFileSync('../renderer/report/invoice.html', 'utf8');
    return htmlContent
}

const toGetListPosPrinter = async (e) => {
    let devices = (await USB.findPrinter());
    devices = devices.map((device) => {
        return {
            busNumber: device.busNumber,
            deviceDescriptor: {
                idVendor: device.deviceDescriptor.idVendor,
                idProduct: device.deviceDescriptor.idProduct
            }
        }
    })
    return devices
}

const toPrint = async (e, props) => {
    props.dest = path.join(os.homedir(), 'imageresizer');
    const hasilPrint = await hPrintFile(props)
    return hasilPrint
}

const toGetListPrinter = async (e) => {
    const printers = await ptp.getPrinters();
    return printers
}


module.exports = {
    toPrintPOS,
    toGetHTML,
    toGetListPosPrinter,
    toPrint,
    toGetListPrinter
}

//helper
const hPrintAll = async (datas, device) => {
    const printed = await Promise.all(
        datas.map(async (data, index) => {
            if(index >= 10) return

            const print = await printPromise({device}, async (printer) => {
                let newPrinter = printer
                newPrinter
                .font("a")
                .align("ct")
                .style("b")
                .size(1, 1)
                .tableCustom(
                    [
                        { text: "Nama", align: "LEFT", width: 0.5, style: "B" },
                        { text: data.namapasien, align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .tableCustom(
                    [
                        { text: "No Regis", align: "LEFT", width: 0.5, style: "B" },
                        { text: data.noregistrasi, align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .tableCustom(
                    [
                        { text: "Poli Tujuan", align: "LEFT", width: 0.5, style: "B" },
                        { text: data.namaunit, align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .tableCustom(
                    [
                        { text: "Dokter Tujuan", align: "LEFT", width: 0.5, style: "B" },
                        { text: data.namadokter, align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .tableCustom(
                    [
                        { text: "Tanggal Regis", align: "LEFT", width: 0.5, style: "B" },
                        { text: new Date(data.tglregistrasi).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }), align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .size(5, 5)
                .style("B")
                .text("BARU")
                .size(1, 1)
                .style("normal")
                .tableCustom(
                    [
                        { 
                            text: "Tanggal Cetak: " + (new Date()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }), 
                            align: "CENTER", 
                            width: 1
                        },
                    ],
                    { encoding: "cp857", size: [1, 1] },
                )
                
                return newPrinter
            })
    
            // tidak di await gak perlu nunggu update db untuk updatedaftar pasien
            updateDaftarPasien(data.norecdp)
            return data
        })
    )
    return printed
}

const hPrintFile = async ({
    height,
    width,
    printer,
    base64pdf,
    idPrint
}) => {
    try{
        let base64Data = base64pdf.replace(/^data:application\/pdf;filename\=generated\.pdf;base64,/, "");

        fs.writeFileSync("../hasil.pdf", base64Data, 'base64')
        await ptp.print("../hasil.pdf", {printer: idPrint})
    }catch(error){
        console.error(error)
    }
}