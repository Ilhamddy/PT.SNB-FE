const {ipcMain } = require("electron")

const {
    toPrint,
} = require("./handler")

const handlerRoutes = () => {
    ipcMain.handle('printer:toPrint', toPrint);
}

module.exports = handlerRoutes