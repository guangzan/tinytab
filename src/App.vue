<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { darkTheme, NConfigProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { lightenDarkenColor } from '@/utils/tools'
import Wallpaper from '@/components/Wallpaper.vue'

const store = useStore()
const theme = ref()
const themeOverrides = ref<GlobalThemeOverrides>({})

/**
 * Update dark-light mode
 */
function changeTheme(v: 'light' | 'dark'): void {
    const { classList } = document.documentElement
    theme.value = v === 'dark' ? darkTheme : undefined
    classList.remove(v === 'dark' ? 'light' : 'dark')
    classList.add(v)
}

/**
 * Update theme accent color
 */
function changePrimaryColor(v: string): void {
    const lv = lightenDarkenColor(v, 20)
    const dv = lightenDarkenColor(v, -20)

    themeOverrides.value = {
        common: {
            primaryColor: v,
            primaryColorHover: lv,
            primaryColorPressed: dv,
        },
        Switch: {
            railColorActive: v,
        },
        Slider: {
            fillColorHover: v,
            fillColor: v,
        },
    }
}

/**
 * Process the state switch following the system setting button
 */
function handleFollowSystemTheme() {
    const userPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches
    changeTheme(userPrefersDark ? 'dark' : 'light')
}

/**
 * Handle the browser dark-light mode setting switch
 */
function handleChangeSystemTheme() {
    const darkMedia: MediaQueryList = window.matchMedia(
        '(prefers-color-scheme: dark)'
    )
    if (typeof darkMedia.addEventListener === 'function') {
        darkMedia.addEventListener('change', (e: MediaQueryListEvent) => {
            // The browser settings switch will trigger
            if (store.getters.GetFollowSystemTheme) {
                const prefersDarkMode = e.matches
                if (prefersDarkMode) changeTheme('dark')
                else changeTheme('light')
            }
        })
    }
}

watch(
    () => store.state.primaryColor,
    (v: string) => changePrimaryColor(v)
)
watch(
    () => store.state.theme,
    (v: 'dark' | 'light') => changeTheme(v)
)
watch(
    () => store.getters.GetFollowSystemTheme,
    (v: boolean) => {
        if (v) {
            handleFollowSystemTheme()
            handleChangeSystemTheme()
        } else {
            // If you turn off follow the system theme
            const storageTheme = store.state.theme as 'light' | 'dark'
            changeTheme(storageTheme)
        }
    }
)

onMounted(() => {
    handleChangeSystemTheme()
    changePrimaryColor(store.getters.GetPrimaryColor)

    if (store.getters.GetFollowSystemTheme) {
        handleFollowSystemTheme()
    } else {
        changeTheme(store.state.theme)
    }
})
</script>

<template>
    <n-config-provider
        :theme="theme"
        :theme-overrides="themeOverrides"
        class="absolute top-0 right-0 bottom-0 left-0 z-1"
    >
        <n-notification-provider>
            <n-message-provider>
                <n-dialog-provider>
                    <router-view />
                </n-dialog-provider>
            </n-message-provider>
        </n-notification-provider>
    </n-config-provider>
    <Wallpaper></Wallpaper>
</template>

<style>
html,
body,
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
