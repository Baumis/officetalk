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

ipcMain.on('PTKey', (event, arg) => {
  //console.log(arg)
  let key = arg.replace('Key', '')
  let key = arg.replace('Left', '')
  let key = arg.replace('Right', '')

  console.log(key)
  globalShortcut.unregisterAll()
  try {
    globalShortcut.register(key, () => {
      win.webContents.send('PT')
    })
  } catch (e) {
    console.log(e)
  }
})

app.whenReady().then(() => {
  /*globalShortcut.register('p', () => {
    win.webContents.send('PT')
  })*/
}).then(createWindow)

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})