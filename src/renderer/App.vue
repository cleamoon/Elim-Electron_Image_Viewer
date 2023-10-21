<script setup lang="ts">
import { onMounted } from "vue";
import { handleKeydown } from "./components/Shortcuts.vue";
import Image from "./components/Image.vue";

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Image />
</template>

