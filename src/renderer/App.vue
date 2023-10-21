<script setup lang="ts">
import {
  filePath,
  folderPath,
  filesInFolder,
  parentFolderPath,
  foldersInParentFolder,
  file,
  fileIndex,
  folderIndex,
} from "./components/FileManager.vue";
import { handleKeydown } from "./components/Shortcuts.vue";
import { onMounted, watchEffect, ref } from "vue";

const openImage = () => {
  const fileManaging = window.fileManaging;
  fileManaging.openFile()
    .then((file) => filePath.value = file)
    .then((filePath) => folderPath.value = filePath.split('/').slice(0, -1).join('/'))
    .then((folderPath) => parentFolderPath.value = folderPath.split('/').slice(0, -1).join('/'))
    .then(() => fileManaging.getFilesInFolder(folderPath.value))
    .then((files) => filesInFolder.value = files.map((file) => folderPath.value + "/" + file))
    .then((files) => fileIndex.value = files.indexOf(filePath.value))
    .then(() => fileManaging.getFoldersInFolder(parentFolderPath.value))
    .then((folders) => foldersInParentFolder.value = folders)
    .then((folders) => folderIndex.value = folders.indexOf(folderPath.value))
};

const image = ref<string>('');

watchEffect(() => {
  if (file.value) {
    window.fileManaging.readImage(file.value)
      .then((imageBlob) => image.value = imageBlob);
  }
});

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div id="main">
    <img :src="image" v-if="image" style="width: 100%; height: 100%; object-fit: contain;" />
    <button @click="openImage">Open Image</button>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: red;
}
</style>
