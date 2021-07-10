<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { darkTheme, NConfigProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { lightenDarkenColor } from '@/utils/tools'
import { MutationType } from '@/store/mutations'

const store = useStore()
const theme = ref()
const themeOverrides = ref<GlobalThemeOverrides>({})

function changeTheme(v: 'light' | 'dark'): void {
    const { classList } = document.documentElement
    theme.value = v === 'dark' ? darkTheme : undefined
    classList.remove(v === 'dark' ? 'light' : 'dark')
    classList.add(v)
}

function changeColor(v: string): void {
    themeOverrides.value = {
        common: {
            primaryColor: v,
            primaryColorHover: lightenDarkenColor(v, 20),
            primaryColorPressed: lightenDarkenColor(v, -20),
        },
        Switch: {
            railColorActive: v,
        },
    }
}

function changeHomeBackground(v: string): void {
    const rootElement = document.querySelector('#app') as HTMLElement
    rootElement.style.backgroundImage = `url(${v})`
}

function handleFollowSystemTheme() {
    const userPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches
    changeTheme(userPrefersDark ? 'dark' : 'light')
}

/**
 * 监听浏览器主题设置切换
 */
function handleChangeSystemTheme() {
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (typeof darkMedia.addEventListener === 'function') {
        darkMedia.addEventListener('change', (e) => {
            // 浏览器设置切换就会触发
            if (store.getters.GetFollowSystemTheme) {
                changeTheme('dark')
            } else {
                changeTheme('light')
            }
        })
    }
}

watch(
    () => store.state.primaryColor,
    (v: string) => changeColor(v)
)
watch(
    () => store.state.theme,
    (v: 'dark' | 'light') => changeTheme(v)
)
watch(
    () => store.state.homeBackground,
    (v: string) => changeHomeBackground(v)
)
watch(
    () => store.getters.GetFollowSystemTheme,
    (v: boolean) => {
        if (v) {
            handleFollowSystemTheme()
            handleChangeSystemTheme()
        } else {
            // 如果关闭跟随系统主题
            const storageTheme = store.state.theme as 'light' | 'dark'
            changeTheme(storageTheme)
        }
    }
)

onMounted(() => {
    handleChangeSystemTheme()

    if (store.getters.GetFollowSystemTheme) {
        handleFollowSystemTheme()
        return false
    }

    changeTheme(store.state.theme)
    changeColor(store.state.primaryColor)
    changeHomeBackground(store.state.homeBackground)
})
</script>

<template>
    <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
        <n-notification-provider>
            <n-message-provider>
                <n-dialog-provider>
                    <router-view />
                </n-dialog-provider>
            </n-message-provider>
        </n-notification-provider>
    </n-config-provider>
</template>

<style lang="scss">
html,
body,
#app {
    width: 100%;
    height: 100%;
}

#app {
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
}
</style>
