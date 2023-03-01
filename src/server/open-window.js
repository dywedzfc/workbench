import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export async function openTUIWindow(windows) {
  if (!windows.tuiWindow) {
    windows.tuiWindow = new BrowserWindow({
      width: 1725,
      height: 860,
      contextIsolation: false,
      webviewTag: true,
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      const url = `${process.env.WEBPACK_DEV_SERVER_URL}/t-ui/index.html`
      // Load the url of the dev server if in development mode
      await windows.tuiWindow.loadURL(url)
      // if (!process.env.IS_TEST) windows.tuiWindow.webContents.openDevTools()
    } else {
      createProtocol('app')
      await windows.tuiWindow.loadURL('app://./t-ui/index.html')
    }
  }
  windows.tuiWindow.moveTop()
  windows.tuiWindow.on('closed', () => {
    windows.tuiWindow = null
  })
}
