const {ipcMain } = require("electron")

const {
    toPrintPOS,
    toGetHTML,
    toGetListPosPrinter,
    toPrint,
    toGetListPrinter
} = require("./handler")

const handlerRoutes = () => {
    ipcMain.handle('printer:toGetListPrinter', toGetListPrinter)
    ipcMain.handle('printer:toGetListPOSPrinters', toGetListPosPrinter);
    ipcMain.handle('printer:toPrintPOS', toPrintPOS);
    ipcMain.handle('file:toGetHTML', toGetHTML);
    ipcMain.handle('printer:toPrint', toPrint);
}

module.exports = handlerRoutes