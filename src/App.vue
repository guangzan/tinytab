<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { useCssVar } from '@vueuse/core'
import { generate } from '@arco-design/color'
import type { TTMode } from './types'
import { useSettingsStore } from '@/store/settings.store'
import { getStringBetween, lightenDarkenColor } from '@/utils/tools'
import Wallpaper from '@/components/Wallpaper.vue'

const store = useSettingsStore()
const NTheme = ref()
const themeOverrides = ref<GlobalThemeOverrides>({})

const element = ref(document.getElementsByTagName('body')[0])
const arcoPrimaryColorCssVar = reactive([
  useCssVar('--primary-1', element),
  useCssVar('--primary-2', element),
  useCssVar('--primary-3', element),
  useCssVar('--primary-4', element),
  useCssVar('--primary-5', element),
  useCssVar('--primary-6', element),
  useCssVar('--primary-7', element),
  useCssVar('--primary-8', element),
  useCssVar('--primary-9', element),
  useCssVar('--primary-10', element),
])

/**
 * Update dark-light mode
 */
function onModeChange(v: 'light' | 'dark'): void {
  const { classList } = document.documentElement
  // Navive UI
  NTheme.value = v === 'dark' ? darkTheme : undefined

  // Arco UI
  v === 'dark' ? document.body.setAttribute('arco-theme', 'dark') : document.body.removeAttribute('arco-theme')

  // Atom CSS
  classList.remove(v === 'dark' ? 'light' : 'dark')
  classList.add(v)
}

/**
 * Update theme accent color
 */
function onPrimaryColorChange(v: string): void {
  // Navive UI color
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

  // Arco UI color
  const arcoColor = generate(v, { list: true, format: 'rgb' }) as string[]
  arcoColor
    .map(color => getStringBetween(color, '(', ')'))
    .forEach((color, index) => {
      arcoPrimaryColorCssVar[index].value = color
    })
}

/**
 * Process the state switch following the system setting button
 */
function handleFollowSystemTheme() {
  const userPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches
  onModeChange(userPrefersDark ? 'dark' : 'light')
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
      if (store.settings.theme.followSystem)
        onModeChange(e.matches ? 'dark' : 'light')
    })
  }
}

watch(
  () => store.settings.theme.primaryColor,
  (v: string) => onPrimaryColorChange(v),
)
watch(
  () => store.settings.theme.mode,
  (v: TTMode) => onModeChange(v),
)
watch(
  () => store.settings.theme.followSystem,
  (v: boolean) => {
    if (v) {
      handleFollowSystemTheme()
      handleChangeSystemTheme()
    }
    else {
      // If you turn off follow the system theme
      onModeChange(store.settings.theme.mode)
    }
  },
)

onMounted(() => {
  handleChangeSystemTheme()
  onPrimaryColorChange(store.settings.theme.primaryColor)

  if (store.settings.theme.followSystem)
    handleFollowSystemTheme()
  else
    onModeChange(store.settings.theme.mode)
})
</script>

<template>
  <NConfigProvider
    :theme="NTheme"
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
