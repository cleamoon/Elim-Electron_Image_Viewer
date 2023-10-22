import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => ipcRenderer.send('message', message),
})

contextBridge.exposeInMainWorld('fileManaging', {
  openFile: () => ipcRenderer.invoke('openFile'),
  getFilesInFolder: (folderPath: string) => ipcRenderer.invoke('getFilesInFolder', folderPath),
  getFoldersInFolder: (folderPath: string) => ipcRenderer.invoke('getFoldersInFolder', folderPath),
  readImage: (imagePath: string) => ipcRenderer.invoke('readImage', imagePath),
  deleteFile: (filePath: string) => ipcRenderer.invoke('deleteFile', filePath),
})
