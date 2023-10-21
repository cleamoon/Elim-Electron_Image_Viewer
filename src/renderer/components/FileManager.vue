<script lang="ts">
import { ref, computed } from 'vue'

export const filePath = ref<string>('')

export const parentFolderPath = ref<string>('')

export const filesInFolder = ref<string[]>([])

export const foldersInParentFolder = ref<string[]>([])

export const fileIndex = ref<number>(-1)

export const folderIndex = ref<number>(-1)

export const folderPath = computed(() =>
  foldersInParentFolder.value.length && folderIndex.value >= 0 && foldersInParentFolder.value[folderIndex.value])

export const file = computed(() =>
  filesInFolder.value.length && fileIndex.value >= 0 && filesInFolder.value[fileIndex.value])

export const changeFolder = (direction: number) => {
  if (direction > 0 && folderIndex.value + 1 <= foldersInParentFolder.value.length) {
    folderIndex.value += 1;
    window.fileManaging.getFilesInFolder(folderPath.value || '')
      .then((files) => filesInFolder.value = files.map((file) => folderPath.value + "/" + file))
      .then(() => fileIndex.value = 0)
  } else if (direction < 0 && folderIndex.value - 1 >= 0) {
    folderIndex.value -= 1;
    window.fileManaging.getFilesInFolder(folderPath.value || '')
      .then((files) => filesInFolder.value = files.map((file) => folderPath.value + "/" + file))
      .then((files) => fileIndex.value = files.length - 1)
  }
}

export const openImage = () => {
  const fileManaging = window.fileManaging;
  fileManaging.openFile()
    .then((filePath) => {
      const folder = filePath.split('/').slice(0, -1).join('/');
      const parentFolder = filePath.split('/').slice(0, -2).join('/');
      return ({ folder, parentFolder })
    })
    .then(({ folder, parentFolder }) => {
      parentFolderPath.value = parentFolder;

      fileManaging.getFilesInFolder(folder)
        .then((files) => filesInFolder.value = files.map((file) => folderPath.value + "/" + file))
        .then((files) => fileIndex.value = files.indexOf(filePath.value))
      fileManaging.getFoldersInFolder(parentFolder)
        .then((folders) => foldersInParentFolder.value = folders)
        .then((folders) => folderIndex.value = folders.indexOf(folder))
    })
};
</script>