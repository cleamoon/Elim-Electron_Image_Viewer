<script lang="ts">
import { 
  image, 
  filePath, 
  folderPath, 
  filesInFolder, 
  parentFolder, 
  foldersInParentFolder,
  file, 
  fileIndex, 
  folderIndex,
  changeFolder,
} from './FileManager.vue';

import { ref } from 'vue';

const scale = ref(1.0);

  const nextFile = () => {
    if (fileIndex.value + 1 >= filesInFolder.value.length) {
      changeFolder(1);
    } else {
      fileIndex.value += 1;
    }
  };

  const previousFile = () => {
    if (fileIndex.value === 0) {
      changeFolder(-1);
    } else {
      fileIndex.value -= 1;
    }
  };

  const firstFile = () => {
    fileIndex.value = 0;
  };

  const lastFile = () => {
    fileIndex.value = filesInFolder.value.length - 1;
  };

  const zoomIn = () => {
    if (scale.value > 2) {
      return;
    }
    scale.value *= 1.1;
  };

  const zoomOut = () => {
    if (scale.value < 0.5) {
      return;
    }
    scale.value *= 0.9;
  };

  const toggleFullScreen = () => {
    // appWindow.setFullscreen(!appWindow.isFullscreen());
  };

  const toggleShowFilePath = () => {
    // showFilePath.update((b) => !b);
  };

  export const handleKeydown = (event) => {
    console.log(event)
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        previousFile();
        break;
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
        nextFile();
        break;
      case "Home":
        firstFile();
        break;
      case "End":
        lastFile();
        break;
      case "f":
        toggleFullScreen();
        break;
      case "b":
        if (event.ctrlKey) {
          // imageStyle.set(defaultImageStyle);
          scale.value = (1.0);
        }
        break;
      case "w":
        if (event.ctrlKey) {
          // imageStyle.set("width: 100%; height: auto;");
        }
        break;
      case "h":
        if (event.ctrlKey) {
          // imageStyle.set("width: auto; height: 100%;");
        }
        break;
      case "o":
        if (event.ctrlKey) {
          // openFile();
        }
        break;
      case "q":
        if (event.ctrlKey) {
          window.close();
        }
        break;
      case "+":
        if (event.ctrlKey) {
          zoomIn();
        }
        break;
      case "-":
        if (event.ctrlKey) {
          zoomOut();
        }
        break;
      case "Delete":
        // deleteFile();
        break;
      case "d":
        if (event.ctrlKey) {
          // deleteFile();
        }
        break;
      case "p":
        if (event.ctrlKey) {
          toggleShowFilePath();
        }
        break;
      default:
        break;
    }
  };

</script>