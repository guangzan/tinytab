<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { useSettingsStore } from '@/store/settings.store'
import { lightenDarkenColor } from '@/utils/tools'
import Wallpaper from '@/components/Wallpaper.vue'

const store = useSettingsStore()
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
    '(prefers-color-scheme: dark)',
  ).matches
  changeTheme(userPrefersDark ? 'dark' : 'light')
}

/**
 * Handle the browser dark-light mode setting switch
 */
function handleChangeSystemTheme() {
  const darkMedia: MediaQueryList = window.matchMedia(
    '(prefers-color-scheme: dark)',
  )
  if (typeof darkMedia.addEventListener === 'function') {
    darkMedia.addEventListener('change', (e: MediaQueryListEvent) => {
      // The browser settings switch will trigger
      if (store.followSystemTheme) {
        const prefersDarkMode = e.matches
        if (prefersDarkMode)
          changeTheme('dark')
        else changeTheme('light')
      }
    })
  }
}

watch(
  () => store.primaryColor,
  (v: string) => changePrimaryColor(v),
)
watch(
  () => store.theme,
  (v: 'dark' | 'light') => changeTheme(v),
)
watch(
  () => store.followSystemTheme,
  (v: boolean) => {
    if (v) {
      handleFollowSystemTheme()
      handleChangeSystemTheme()
    }
    else {
      // If you turn off follow the system theme
      const storageTheme = store.theme
      changeTheme(storageTheme)
    }
  },
)

onMounted(() => {
  handleChangeSystemTheme()
  changePrimaryColor(store.primaryColor)

  if (store.followSystemTheme)
    handleFollowSystemTheme()
  else
    changeTheme(store.theme)
})
</script>

<template>
  <NConfigProvider
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
  </NConfigProvider>
  <Wallpaper />
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
