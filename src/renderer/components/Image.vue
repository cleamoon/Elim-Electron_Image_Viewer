<script setup lang="ts">
import { watchEffect } from "vue";
import { image, imageStyle, showFilePath } from "./ImageStates.vue";
import { file, openImage } from "./FileManager.vue";
import Help from "./Help.vue";

watchEffect(() => {
  file.value && window.fileManaging.readImage(file.value)
    .then((imageBlob) => image.value = imageBlob)
});
</script>

<template>
  <div id="main">
    <div v-if="Boolean(image)" :style="{ width: '100%', height: '100%' }">
      <img :src="image" v-if="image" :style="imageStyle" />
      <div v-if="showFilePath" id="info">
        {{ file }}
      </div>
    </div>
    <div v-if="!Boolean(image)" :style="{ width: '100%', height: '100%' }">
      <Help />
      <button @click="openImage" id="button">Open Image</button>
    </div>
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
  background-color: lavender;
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

#button {
  position: absolute;
  left: 0;
  top: 0;
  right: auto;
  bottom: auto;
}
</style>