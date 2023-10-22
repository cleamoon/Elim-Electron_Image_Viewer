<script lang="ts">
import { ref, computed } from 'vue'

export const parentFolderPath = ref<string>('')

export const filesInFolder = ref<string[]>([])

export const foldersInParentFolder = ref<string[]>([])

export const fileIndex = ref<number>(-1)

export const folderIndex = ref<number>(-1)

export const folderPath = computed(() =>
  foldersInParentFolder.value.length && folderIndex.value >= 0 && foldersInParentFolder.value[folderIndex.value])

export const file = computed(() => filesInFolder.value[fileIndex.value])

const sorter = (a: string, b: string) => {
  const numberInA = a.match(/\d+/g);
  const numberInB = b.match(/\d+/g);
  if (numberInA && numberInB) {
    return parseInt(numberInA[0]) - parseInt(numberInB[0]);
  }
  return a.localeCompare(b);
}

export const changeFolder = (direction: number) => {
  if (direction > 0 && folderIndex.value + 1 <= foldersInParentFolder.value.length) {
    folderIndex.value += 1;
    window.fileManaging.getFilesInFolder(folderPath.value || '')
      .then((files) => filesInFolder.value = files.sort(sorter).map((file) => folderPath.value + "/" + file))
      .then(() => fileIndex.value = 0)
  } else if (direction < 0 && folderIndex.value - 1 >= 0) {
    folderIndex.value -= 1;
    window.fileManaging.getFilesInFolder(folderPath.value || '')
      .then((files) => filesInFolder.value = files.sort(sorter).map((file) => folderPath.value + "/" + file))
      .then((files) => fileIndex.value = files.length - 1)
  }
}

export const openImage = () => {
  const fileManaging = window.fileManaging;
  fileManaging.openFile()
    .then((filePath) => {
      if (!filePath) throw new Error('No file selected');

      const folder = filePath.split('/').slice(0, -1).join('/');
      const parentFolder = filePath.split('/').slice(0, -2).join('/');
      return ({ filePath, folder, parentFolder })
    })
    .then(({ filePath, folder, parentFolder }) => {
      parentFolderPath.value = parentFolder;

      fileManaging.getFilesInFolder(folder)
        .then((files) => filesInFolder.value = files.sort(sorter).map((file) => folder + "/" + file))
        .then((files) => fileIndex.value = files.indexOf(filePath))

      fileManaging.getFoldersInFolder(parentFolder)
        .then((folders) => foldersInParentFolder.value = folders.sort(sorter).map((folder) => parentFolder + "/" + folder))
        .then((folders) => folderIndex.value = folders.indexOf(folder))
    })
};

export const deleteFile = () => {
  if (fileIndex.value >= 0) {
    window.fileManaging.deleteFile(file.value)
      .then(() => {
        filesInFolder.value.splice(fileIndex.value, 1);
        fileIndex.value -= 1;
      })
  }
}

export default {
  parentFolderPath,
  filesInFolder,
  foldersInParentFolder,
  fileIndex,
  folderIndex,
  folderPath,
  file,
  changeFolder,
  openImage,
  deleteFile
}
</script>