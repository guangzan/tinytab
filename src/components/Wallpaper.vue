<script lang="ts" setup>
import { useSettingsStore } from '@/store/settings.store'
import { watch, onMounted, ref } from 'vue'

defineOptions({
    name: 'settings-wallpaper',
})

const store = useSettingsStore()
const wallpaperBlur = ref('0px')
const wallpaperMask = ref('rgba(0, 0, 0, 0)')

/**
 * Update home page background image
 * Manual update to optimize performance, style CSS variable injection only automatically inserts custom properties into the component root node
 * prevent when updating a property will refresh all variables in tyle
 */
function updateHomeBackground(v: string) {
    const image = document.querySelector('.wallpaper-image') as HTMLDivElement
    image.style.backgroundImage = `url(${v})`
}

watch(
    () => store.homeBackground,
    (v) => updateHomeBackground(v)
)

/**
 * Update the blurriness of the background image of the home page
 */
function updateHomeBackgroundBlur(v: number) {
    wallpaperBlur.value = `${v}px`
}

watch(
    () => store.homeBackgroundBlur,
    (v) => updateHomeBackgroundBlur(v)
)

/**
 * Update home page background mask concentration
 */
function updateHomeBackgroundMask(v: number) {
    wallpaperMask.value = `rgba(0, 0, 0, ${v})`
}

watch(
    () => store.homeBackgroundMask,
    (v) => updateHomeBackgroundMask(v)
)

onMounted(() => {
    updateHomeBackground(store.homeBackground)
    updateHomeBackgroundBlur(store.homeBackgroundBlur)
    updateHomeBackgroundMask(store.homeBackgroundMask)
})
</script>

<template>
    <div class="wallpaper absolute">
        <div class="absolute w-full h-full wallpaper-mask"></div>
        <div
            class="
                wallpaper-image
                w-full
                h-full
                bg-cover bg-no-repeat bg-center bg-white
                dark:bg-dark-600
            "
        ></div>
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
