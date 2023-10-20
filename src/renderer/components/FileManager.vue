<script lang="ts">
import { ref, computed } from 'vue'

export const filePath = ref<string>('')

export const folderPath = ref<string>('')

export const parentFolderPath = ref<string>('')

export const filesInFolder = ref<string[]>([])

export const foldersInParentFolder = ref<string[]>([])

export const fileIndex = ref<number>(-1)

export const folderIndex = ref<number>(-1)

export const file = computed(() =>
  filesInFolder.value.length && fileIndex.value >= 0 && filesInFolder.value[fileIndex.value])

export const image = ref<string>('')

export const changeFolder = (direction: number) => {
  if (direction > 0 && folderIndex.value + 1 <= foldersInParentFolder.value.length) {
      folderIndex.value += 1;
      window.fileManaging.getFilesInFolder(folderPath.value)
        .then((files) => filesInFolder.value = files.map((file) => folderPath.value + "/" + file))
        .then(() => fileIndex.value = 0)
  } else if (direction < 0 && folderIndex.value - 1 >= 0) {
      folderIndex.value -= 1;
      window.fileManaging.getFilesInFolder(folderPath.value)
        .then((files) => filesInFolder.value = files.map((file) => folderPath.value + "/" + file))
        .then((files) => fileIndex.value = files.length - 1)
  }
}
</script>