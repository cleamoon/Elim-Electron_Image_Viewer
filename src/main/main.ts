import { app, BrowserWindow, ipcMain, session, dialog } from 'electron';
import { join } from 'path';
import * as fs from 'fs/promises';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    mainWindow.webContents.openDevTools();
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(event);
  console.log(message);
})

ipcMain.handle('openFile', async () =>
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  })
    .then(({ canceled, filePaths }) => {
      if (canceled) return null;
      return filePaths[0]
    })
)

const isImageFile = (fileEntry) => {
  const fileExtension = fileEntry.name.split('.').pop();
  return ['jpg', 'png', 'gif'].includes(fileExtension);
}

ipcMain.handle('getFilesInFolder', async (_, folderPath) =>
  fs.readdir(folderPath, { withFileTypes: true })
    .then((fileEntries) => fileEntries
      .filter((fileEntry) => fileEntry.isFile())
      .filter(isImageFile)
      .map((fileEntry) => fileEntry.name)))

ipcMain.handle('getFoldersInFolder', async (_, folderPath) =>
  fs.readdir(folderPath, { withFileTypes: true })
    .then((fileEntries) => fileEntries
      .filter((fileEntry) => fileEntry.isDirectory())
      .map((fileEntry) => fileEntry.name)))

ipcMain.handle('readImage', async (_, imagePath) =>
  fs.readFile(imagePath).then((buffer) => `data:image/jpeg;base64, ${buffer.toString('base64')}`))

ipcMain.handle('deleteFile', async (_, filePath) => 
  fs.unlink(filePath))