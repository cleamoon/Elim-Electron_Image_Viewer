<script setup lang="ts">
import { ref } from 'vue'
import { dialog } from 'electron'

import HelloWorld from './components/HelloWorld.vue'

const filePath = ref<string>('')
const openImage = () =>
  dialog.showOpenDialog({ properties: ['openFile'] })
    .then(({ canceled, filePaths }) => {
      if (canceled) return
      filePath.value = filePaths[0]
    })

console.log('filePath')

window.electronAPI.sendMessage('Hello from App.vue!');
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button @click="openImage">Open Image</button>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
