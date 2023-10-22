<script setup lang="ts">
import { watchEffect } from "vue";
import { image, imageStyle, showFilePath } from "./ImageStates.vue";
import { file, openImage } from "./FileManager.vue";

watchEffect(() => {
  file.value && window.fileManaging.readImage(file.value)
    .then((imageBlob) => image.value = imageBlob)
});
</script>

<template>
  <div id="main">
    <img :src="image" v-if="image" :style="imageStyle" />
    <div v-if="showFilePath" id="info">
      {{ file }}
    </div>
    <button @click="openImage" v-if="!Boolean(image)">Open Image</button>
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

#info {
  position: absolute;
  top: auto;
  bottom: 0;
  left: auto;
  right: 0;
  font-size: 0.6rem;
  color: rgba(50, 255, 50, 1);
  background-color: rgba(10, 10, 10, 0.6);
}
</style>