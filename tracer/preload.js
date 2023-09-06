const os = require('os');
const path = require('path');
const { contextBridge, ipcRenderer } = require('electron');
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('path', {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),

});

contextBridge.exposeInMainWorld('electron', {
  onGetPrinterApp: (callback) => {
    ipcRenderer.on('ongetprinter', callback);
  },
  getPrinterApp: () => {
    const printers = ipcRenderer.invoke('printer:getListPrinter')
    return printers
  },
  getHTML: async (location) => {
    const html = await ipcRenderer.invoke('file:getHTML', {
      location: location
    });
    return html
  },
  print: async (props) => {
    const print = ipcRenderer.invoke('printer:toPrint', props);
    return print
  }
})

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});
