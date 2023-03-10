'use strict'

import { app, protocol, BrowserWindow, shell, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import './server/event-listeners'
import { initMenu } from './server/menu'
import { openTUIWindow } from './server/open-window'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])
const course = { mainWindow: null }

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 700,
    minWidth: 1280,
    minHeight: 700,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true, // process.env.ELECTRON_NODE_INTEGRATION
      contextIsolation: false,
      webviewTag: true,
    },
  })

  win.webContents.session.webRequest.onHeadersReceived({ urls: ['*://*/*'] }, (d, c) => {
    if (d.responseHeaders['X-Frame-Options']) delete d.responseHeaders['X-Frame-Options']
    else if (d.responseHeaders['x-frame-options']) delete d.responseHeaders['x-frame-options']

    c({ cancel: false, responseHeaders: d.responseHeaders })
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  course.mainWindow = win
}

// TODO 打开T-UI
ipcMain.handle('open-window', async (event, name) => {
  console.info('打开T-UI', name)
  if (!course.mainWindow.childWindows) course.mainWindow.childWindows = {}
  if (name == 'TUI') openTUIWindow(course.mainWindow.childWindows)
  console.info('打开T-UI', process.env.WEBPACK_DEV_SERVER_URL)
})

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

  const options = {
    handlesInternalJumpClick: (name) => {
      console.info('data-jump:', name, course.mainWindow)
      course.mainWindow.webContents.send('href', name)
    },
    // handleReloadClick: () => (course.mainWindow.webContents.send('reload'), undefined),
    // handleDeveloperClick: () => (course.mainWindow.toggleDevTools(), undefined),
  }
  initMenu.call(options)
  // 全局快捷键
  // globalShortcut.register('CommandOrControl+1', () => {
  //   course.mainWindow.webContents.send('href', 'Home')
  // })

  createWindow()
})

app.on('web-contents-created', (e, webContents) => {
  webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })
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
