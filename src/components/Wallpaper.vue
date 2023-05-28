<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSettingsStore } from '@/store/settings.store'

defineOptions({
  name: 'SettingsWallpaper',
})

const store = useSettingsStore()
const wallpaperBlur = ref('0px')
const wallpaperMask = ref('rgba(0, 0, 0, 0)')

/**
 * Update home page background image
 * Manual update to optimize performance, style CSS variable injection only automatically inserts custom properties into the component root node
 * prevent when updating a property will refresh all variables in tyle
 */
watch(
  () => store.settings.homeBackground.src,
  (v) => {
    const image = document.querySelector('.wallpaper-image') as HTMLDivElement
    image.style.backgroundImage = `url(${v})`
  },
)

/**
 * Update the blurriness of the background image of the home page
 */
watch(
  () => store.settings.homeBackground.blur,
  v => wallpaperBlur.value = `${v}px`,
)

/**
 * Update home page background mask concentration
 */
watch(
  () => store.settings.homeBackground.mask,
  v => wallpaperMask.value = `rgba(0, 0, 0, ${v})`,
)
</script>

<template>
  <div class="wallpaper absolute">
    <div class="absolute w-full h-full wallpaper-mask" />
    <div
      class="wallpaper-image w-full h-full bg-cover bg-no-repeat bg-center bg-white dark:bg-dark-600"
    />
  </div>
</template>

<style lang="scss">
.wallpaper {
    filter: blur(v-bind(wallpaperBlur));
    bottom: calc(v-bind(wallpaperBlur) * -2);
    left: calc(v-bind(wallpaperBlur) * -2);
    right: calc(v-bind(wallpaperBlur) * -2);
    top: calc(v-bind(wallpaperBlur) * -2);

    .wallpaper-image {
        transition: background-image 0.6s, background-color 0.4s;
    }

    .wallpaper-mask {
        background-color: v-bind(wallpaperMask);
    }
}
</style>
