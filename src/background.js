'use strict'

import { app, protocol, BrowserWindow, ipcMain, Notification } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from "electron-updater"
autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true
import path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'

const NOTIFICATION_TITLE = 'Basic Notification'
let win;

function sendStatusToWindow(text) {
  win.webContents.send('message', text);
}
function showNotification (info) {
  new Notification({ title: NOTIFICATION_TITLE, body: info }).show()
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

ipcMain.on('custom-event', () => {
  autoUpdater.checkForUpdates().then(() => sendStatusToWindow('checkForUpdates Success')).catch((error) => sendStatusToWindow(`error ${error.toString()} `));
});

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // width: 1920,
    // height: 1080,
    // fullscreen: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    win.webContents.openDevTools()
  }
}

autoUpdater.on('error', (error) => {
  console.log('error', error);
  showNotification(error.toString());
  sendStatusToWindow(error.toString())
});

autoUpdater.on('update-not-available', () => {
  console.log('update-not-available');
  showNotification('update-not-available');
  sendStatusToWindow('update-not-available')
});

autoUpdater.on('update-available', () => {
  console.log('update-available');
  showNotification('update-available');
  sendStatusToWindow('update-available')
  autoUpdater.downloadUpdate()
});

autoUpdater.on('update-downloaded', ()=> {
  console.log('update-downloaded');
  showNotification('update-downloaded')
  sendStatusToWindow('update-downloaded')
  autoUpdater.quitAndInstall();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
