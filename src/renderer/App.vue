<script setup lang="ts">
import { ref, computed } from 'vue'

const filePath = ref<string>('')

const folderPath = computed(() => filePath.value?.split('/').slice(0, -1).join('/'))

const filesInFolder = ref<string[]>([])

const fileIndexInFolder = computed(() =>
  filePath.value && filesInFolder.value.length && filesInFolder.value.indexOf(filePath.value))

const file = computed(() => {
  if (filesInFolder.value && fileIndexInFolder.value) {
    return filesInFolder.value[fileIndexInFolder.value]
  }
  return ''
})

const image = ref<string>('')

const parentFolder = computed(() => {
  if (folderPath.value) {
    return folderPath.value.split('/').slice(0, -1).join('/')
  }
  return ''
})

const foldersInParentFolder = ref<string[]>([])

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


window.electronAPI.sendMessage('Hello from App.vue!');
</script>

<template>
  <img v-bind:src="image" alt="Vite logo" />
  <button @click="openImage">Open Image</button>
</template>

<style scoped></style>
