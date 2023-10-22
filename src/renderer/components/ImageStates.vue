<script lang="ts">
import { ref } from "vue";

export const image = ref<string>('');
export const showFilePath = ref<boolean>(true);
export const defaultImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};
export const scale = ref<number>(1.0);
export const imageStyle = ref<CSSStyleValue>(defaultImageStyle);

export default {
  image,
  showFilePath,
  defaultImageStyle,
  scale,
  imageStyle,
}
</script>