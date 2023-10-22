<script setup lang="ts">
import { onMounted, watchEffect, ref } from "vue";
import {
  filePath,
  folderPath,
  filesInFolder,
  parentFolderPath,
  foldersInParentFolder,
  file,
  fileIndex,
  folderIndex,
  openImage,
} from "./FileManager.vue";
const image = ref<string>('');

watchEffect(() => {
  file.value && window.fileManaging.readImage(file.value)
    .then((imageBlob) => image.value = imageBlob)
});


</script>

<template>
  <div id="main">
    <img :src="image" v-if="image" style="width: 100%; height: 100%; object-fit: contain;" />
    <button @click="openImage" v-if="image.length === 0">Open Image</button>
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
}
</style>