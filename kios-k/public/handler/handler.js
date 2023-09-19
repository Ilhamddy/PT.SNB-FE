
const fs = require('fs');
const ptp = require("pdf-to-printer");
const USB = require('@node-escpos/usb-adapter');
const { printPromise } = require("../printer")
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const filePath = 'C:\\settingprinter.json';

async function readJsonFile() {
    try {
      const data = await readFileAsync(filePath, 'utf8');
      let jsonData = JSON.stringify(data);
      let jsonData2 = JSON.parse(jsonData);
      const jsonData3 = {jsonData2}
      console.log(jsonData3.jsonData2.printerantrean);
    } catch (err) {
      console.error(err);
    }
  }

const toPrintPOS = async (e, { devicePrintBus, jenisantrean, captionjenisantrean, sisaantrean, tujuanpoli }) => {
   readJsonFile();

    const devices = await USB.findPrinter();
    // console.log(devices)
    const deviceChosen = devices.find((device) => {
        return device.busNumber === devicePrintBus
    })
    if (!deviceChosen) {
        throw new Error("Device not found")
    }
    // const datas = 'test'//await getDataNotPrinted()
    const datas = [
        {
            label: 'Input',
        }
    ];
    const device = new USB(
        deviceChosen.deviceDescriptor.idVendor,
        deviceChosen.deviceDescriptor.idProduct
    )

    await hPrintAll(datas, device, jenisantrean, captionjenisantrean, sisaantrean, tujuanpoli)

}

const toPrint = async (e, { devicePrintBus }) => {
    // console.log(devicePrintBus)
    const hasilPrint = await hPrintFile({ base64pdf: devicePrintBus })
    return hasilPrint
}

module.exports = {
    toPrint,
    toPrintPOS
}

const hPrintAll = async (datas, device, jenisantrean, captionjenisantrean, sisaantrean, tujuanpoli) => {
    const printed = await Promise.all(
        datas.map(async (data, index) => {
            if (index >= 1) return
            const print = await printPromise({ device }, async (printer) => {
                let newPrinter = printer
                newPrinter
                    .font("a")
                    .align("ct")
                    .style("b")
                    .size(2, 2)
                    .text(captionjenisantrean)

                    .size(5, 5)
                    .style("B")
                    .text(jenisantrean)

                    .size(2, 2)
                    .style("b")
                    .text(tujuanpoli)

                    .size(1, 1)
                    .style("b")
                    .text(`Sisa ${sisaantrean} Antrean Untuk Dipanggil`)

                    .size(1, 1)
                    .style("normal")
                    .tableCustom(
                        [
                            // { 
                            //     text: "Tanggal Cetak: " + (new Date()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric',second:'numeric' }), 
                            //     align: "CENTER", 
                            //     width: 1
                            // },
                            {
                                text: "Tanggal Cetak: " + (new Date()).toLocaleDateString('id-ID', { hour: 'numeric', minute: 'numeric', second: 'numeric' }),
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
    try {
        let base64Data = base64pdf.replace(/^data:application\/pdf;filename\=generated\.pdf;base64,/, "");

        fs.writeFileSync("../hasil.pdf", base64Data, 'base64')
        await ptp.print("../hasil.pdf", { printer: 'Canon E480 series Printer' })
    } catch (error) {
        console.error(error)
    }
}