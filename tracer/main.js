const path = require('path');
const os = require('os');
const fs = require('fs');
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const { jsPDF } = require('jspdf');
const PDFWindow = require('electron-pdf-window');
const sequelize = require('./config/sequelize');
const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';
const ch = require('os');
const ptp = require('pdf-to-printer');

var options = {
  silent: false,
  printBackground: true,
  color: false,
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: 'Header of the Page',
  footer: 'Footer of the Page',
}



let mainWindow;
let aboutWindow;

// Main Window
async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1000 : 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });



  // Show devtools automatically if in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);
  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// About Window
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 300,
    title: 'About Electron',
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
  });

  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}


async function authenticateAndLog() {
  try {
    // Test the database connection by authenticating
    await sequelize.authenticate();
    console.log('Interval Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Handle the error as needed
  }
}

// When the app is ready, create the window
app.on('ready', async () => {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
  // Initialize your Sequelize models and sync the database
  // await sequelize.sync({ force: false });
  // setInterval(authenticateAndLog, 5000);
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // Remove variable from memory
  mainWindow.on('closed', () => (mainWindow = null));
});

// Menu template
const menu = [
  ...(isMac
    ? [
      {
        label: app.name,
        submenu: [
          {
            label: 'About',
            click: createAboutWindow,
          },
        ],
      },
    ]
    : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac
    ? [
      {
        label: 'Help',
        submenu: [
          {
            label: 'About',
            click: createAboutWindow,
          },
        ],
      },
    ]
    : []),
  // {
  //   label: 'File',
  //   submenu: [
  //     {
  //       label: 'Quit',
  //       click: () => app.quit(),
  //       accelerator: 'CmdOrCtrl+W',
  //     },
  //   ],
  // },
  ...(isDev
    ? [
      {
        label: 'Developer',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { type: 'separator' },
          { role: 'toggledevtools' },
        ],
      },
    ]
    : []),
];

ipcMain.handle('printer:getListPrinter', async (e) => {
  const printers = await ptp.getPrinters();
  return printers
})

// Respond to the resize image event
ipcMain.handle('printer:toPrint', async (e, props) => {
  // console.log(options);
  props.dest = path.join(os.homedir(), 'imageresizer');
  console.log("print");
  printFile(props)
  // printToPrinter(options);
});

ipcMain.handle('file:getHTML', (e, options) => {
  const htmlContent = fs.readFileSync('./renderer/report/invoice.html', 'utf8');
  return htmlContent
})

const printFile = async ({
  height,
  width,
  printer,
  base64pdf,
  idPrint
}) => {
  try{
    let base64Data = base64pdf.replace(/^data:application\/pdf;filename\=generated\.pdf;base64,/, "");

    fs.writeFileSync("./hasil.pdf", base64Data, 'base64')
    await ptp.print("./hasil.pdf", {printer: idPrint})
  }catch(error){
    console.error(error)
  }
}

async function printToPrinter({ height, width, printer }) {
  try {
    var options = {
      silent: true, // Suppress the print dialog
      printBackground: false,
      color: true, // Enable color printing
      margin: {
        marginType: 'printableArea'
      },
      landscape: false, // Set to true for landscape orientation
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      header: 'Header of the Page',
      footer: 'Footer of the Page',
      deviceName: printer,
      pageSize: 'A4'
    };
    // Create a new BrowserWindow
    const win = new BrowserWindow({
      show: false,
    });
    const availablePrinters = await mainWindow.webContents.getPrintersAsync();

    mainWindow.webContents.send('available-printers', availablePrinters);

    win.loadFile('./renderer/report/invoice.html');
    win.once('ready-to-show', () => {
      win.webContents.print(options, (success, failureReason) => {
        if (!success) {
          console.log(`Print failed: ${failureReason}`);
        } else {
          console.log('Print Initiated');
        }
        win.close();
      });
    });

  } catch (err) {
    console.log(err);
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

// Open a window if none are open (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
