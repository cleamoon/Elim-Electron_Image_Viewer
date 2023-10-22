<script setup lang="ts">
import { watchEffect } from "vue";
import { image, imageStyle } from "./ImageStates.vue";
import { file, openImage } from "./FileManager.vue";

watchEffect(() => {
  file.value && window.fileManaging.readImage(file.value)
    .then((imageBlob) => image.value = imageBlob)
});
</script>

<template>
  <div id="main">
    <img :src="image" v-if="image" :style="imageStyle" />
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
</style>