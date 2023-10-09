import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => ipcRenderer.send('message', message),
})

contextBridge.exposeInMainWorld('fileManaging', {
  openFile: () => ipcRenderer.invoke('openFile'),
})
