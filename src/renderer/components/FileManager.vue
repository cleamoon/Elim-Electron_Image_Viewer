<script lang="ts">
import { ref, computed } from 'vue'

export const filePath = ref<string>('')

export const folderPath = computed(() => filePath.value?.split('/').slice(0, -1).join('/'))

export const filesInFolder = ref<string[]>([])

export const fileIndexInFolder = computed(() =>
  filePath.value && filesInFolder.value.length && filesInFolder.value.indexOf(filePath.value))

export const file = computed(() =>
  filesInFolder.value.length && fileIndexInFolder.value >= 0 && filesInFolder.value[fileIndexInFolder.value])

export const image = ref<string>('')

export const parentFolder = computed(() => folderPath.value?.split('/').slice(0, -1).join('/'))

export const foldersInParentFolder = ref<string[]>([])
</script>