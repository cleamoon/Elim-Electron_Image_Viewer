<script setup lang="ts">
import { image, filePath, folderPath, filesInFolder, parentFolder, foldersInParentFolder, file } from './components/FileManager.vue';

const openImage = () => {
  window.fileManaging.openFile()
    .then((file) => filePath.value = file)
    .then(() => window.fileManaging.getFilesInFolder(folderPath.value))
    .then((files) => filesInFolder.value = files.map(file => folderPath.value + '/' + file))
    .then(() => window.fileManaging.getFoldersInFolder(parentFolder.value))
    .then((folders) => foldersInParentFolder.value = folders)
    .then(() => window.fileManaging.readImage(file.value))
    .then((imageBlob) => image.value = imageBlob)
}
</script>

<template>
  <img v-bind:src="image" alt="Vite logo" />
  <button @click="openImage">Open Image</button>
</template>

<style scoped></style>
