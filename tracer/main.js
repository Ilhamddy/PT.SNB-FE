`electron --trace-warnings ...`
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const PDFWindow = require('electron-pdf-window');
const isMac = process.platform === 'darwin';
const escpos = require("node-escpos");
const db = require("./src/model/index");
const handlerRoutes = require('./src/handler/handlerRoutes');
const { sendPrinter } = require('./src/handler/handler');
const { environment } = require('./config/pool.config');
const isDev = environment.NODE_ENV !== 'production';

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
  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }

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

// handler
handlerRoutes();

// When the app is ready, create the window
app.on('ready', async () => {
  await db.sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  sendPrinter(mainWindow)

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

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

// Open a window if none are open (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
