
const fs = require('fs');
const ptp = require("pdf-to-printer");
const USB = require('@node-escpos/usb-adapter');
const { printPromise } = require("../printer")

const toPrintPOS = async (e, {devicePrintBus}) => {
    const devices = await USB.findPrinter();
    // console.log(devices)
    const deviceChosen = devices.find((device) => {
        return device.busNumber === devicePrintBus
    })
    if(!deviceChosen) {
        throw new Error("Device not found")
    }
    // const datas = 'test'//await getDataNotPrinted()
    const datas = [
        {
            label: 'Input',
        },
        {
            label: 'Konfirmasi',
        },
        {
            label: 'Bukti Daftar',
        },
    ];
    const device = new USB(
      deviceChosen.deviceDescriptor.idVendor, 
      deviceChosen.deviceDescriptor.idProduct
    )

    await hPrintAll(datas, device)
    
}

const toPrint = async (e, {devicePrintBus}) => {
    // console.log(devicePrintBus)
    const hasilPrint = await hPrintFile({base64pdf:devicePrintBus})
    return hasilPrint
}

module.exports = {
    toPrint,
    toPrintPOS
}

const hPrintAll = async (datas, device) => {
    const printed = await Promise.all(
        datas.map(async (data, index) => {
            if(index >= 1) return
            console.log('masuk print')
            const print = await printPromise({device}, async (printer) => {
                console.log("masuk 2")
                let newPrinter = printer
                newPrinter
                .font("a")
                .align("ct")
                .style("b")
                .size(1, 1)
                .text("Mencoba ngeprint")
                // .barcode(112233445566, "EAN13", { width: 100, height: 80 })
                .tableCustom(
                    [
                        { text: "Nama", align: "LEFT", width: 0.5, style: "B" },
                        { text: data.label, align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .tableCustom(
                    [
                        { text: "No Regis", align: "LEFT", width: 0.5, style: "B" },
                        { text: data.label, align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .tableCustom(
                    [
                        { text: "Poli Tujuan", align: "LEFT", width: 0.5, style: "B" },
                        { text: data.label, align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .tableCustom(
                    [
                        { text: "Dokter Tujuan", align: "LEFT", width: 0.5, style: "B" },
                        { text: data.label, align: "RIGHT", width: 0.5 },
                    ],
                    { encoding: "cp857", size: [1, 1] }, // Optional
                )
                .tableCustom(
                    [
                        { text: "Tanggal Regis", align: "LEFT", width: 0.5, style: "B" },
                        { text: 'label', align: "RIGHT", width: 0.5 },
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
                
                // await printer
                //   .qrimage("https://github.com/node-escpos/driver")
                return newPrinter
            })
    
            // tidak di await gak perlu nunggu update db untuk updatedaftar pasien
            // updateDaftarPasien(data.norecdp)
            return data
        })
    )
    return printed
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