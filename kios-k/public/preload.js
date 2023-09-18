const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    onGetPrinterApp: (callback) => {
      ipcRenderer.on('ongetprinter', callback);
    },
    getPrinterApp: () => {
      const printers = ipcRenderer.invoke('printer:toGetListPrinter')
      return printers
    },
    getPrinterPOS: () => {
      const printers = ipcRenderer.invoke('printer:toGetListPOSPrinters')
      return printers
    },
    getHTML: async (location) => {
      const html = await ipcRenderer.invoke('file:toGetHTML', {
        location: location
      });
      return html
    },
    print: async (props) => {
      const print = ipcRenderer.invoke('printer:toPrint', props);
      return print
    },
    printPOS: async (props) => {
      const print = ipcRenderer.invoke('printer:toPrintPOS', props);
      return print
    }
  })