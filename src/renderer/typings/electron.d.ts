/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void
}

interface FileManagingApi {
  openFile: () => Promise<string>
  getFilesInFolder: (folderPath: string) => Promise<string[]>
  getFoldersInFolder: (folderPath: string) => Promise<string[]>
  readImage: (imagePath: string) => Promise<Buffer>
  deleteFile: (filePath: string) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
    fileManaging: FileManagingApi,
  }
}
