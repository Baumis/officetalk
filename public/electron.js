const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const isDev = require('electron-is-dev')

let win = null
function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  globalShortcut.register('p', () => {
    win.webContents.send('PT')
  })
}).then(createWindow)

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})