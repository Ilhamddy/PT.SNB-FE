const {ipcMain } = require("electron")

const {
    toPrint,
    toPrintPOS
} = require("./handler")

const handlerRoutes = () => {
    ipcMain.handle('printer:toPrint', toPrint);
    ipcMain.handle('printer:toPrintPOS', toPrintPOS);
}

module.exports = handlerRoutes