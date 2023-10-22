<script setup lang="ts">
</script>

<template>
  <div id="help">
    <p>Ctrl+o to open a file</p>
    <p>Ctrl+f to toggle fullscreen</p>
    <p>Ctrl+w to fit to width</p>
    <p>Ctrl+h to fit to height</p>
    <p>Ctrl+b to reset zoom</p>
    <p>Ctrl+d to delete file</p>
    <p>Ctrl+q to quit</p>
    <p>Ctrl+p to toggle show file path</p>
  </div>
</template>

<style scoped>
#help {
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);
}
</style>
