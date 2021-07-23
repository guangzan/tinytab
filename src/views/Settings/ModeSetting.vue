<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import Pannel from '../../components/Pannel.vue'
import { ColorPaletteOutline } from '@vicons/ionicons5'
import ColorPicker from '../../components/ColorPicker.vue'
import { useI18n } from 'vue-i18n'
import type { Theme } from '@/types'

const { t } = useI18n()
const store = useStore()

const disableThemeSwitch = ref(store.state.followSystemTheme)
const themeSwitchDefaultValue = ref(false)
const followSystemThemeSwitchDefaultValue = ref(false)

const color: ColorItem[] = [
    {
        value: '#3051ff',
        label: '',
    },
    {
        value: '#28C46F',
        label: '',
    },
    {
        value: '#fa506e',
        label: '',
    },
    {
        value: '#ffc529',
        label: '',
    },
    {
        value: '#009688',
        label: '',
    },
]

/**
 * Update the state of the mode switch button
 */
function updateThemeSwitchDefaultValue(v: Theme) {
    themeSwitchDefaultValue.value = v === 'dark'
}

/**
 * Update the status of the follow system settings button
 */
function updateFollowSystemThemeSwitchDefaultValue(v: boolean) {
    followSystemThemeSwitchDefaultValue.value = v
}

watch(
    () => store.getters.GetTheme,
    (v) => updateThemeSwitchDefaultValue(v)
)

watch(
    () => store.getters.GetFollowSystemTheme,
    (v) => updateFollowSystemThemeSwitchDefaultValue(v)
)

onMounted(() => {
    updateThemeSwitchDefaultValue(store.getters.GetTheme)
    updateFollowSystemThemeSwitchDefaultValue(
        store.getters.GetFollowSystemTheme
    )
})

/**
 * Update theme accent color
 */
function handleChangeColor(data: any) {
    const { value } = data
    store.commit(MutationType.UpdatePrimaryColor, value)
}

/**
 * Update mode
 */
function handleChangeTheme(value: boolean) {
    store.commit(MutationType.UpdateTheme, value ? 'dark' : 'light')
}

/**
 * Whether the update follows the system settings
 */
function handleChangeFollowSystemTheme(value: boolean) {
    disableThemeSwitch.value = value
    store.commit(MutationType.UpdateFollowSystemTheme, value)
}
</script>

<template>
    <pannel :title="t('modeSetting.title')">
        <template #icon>
            <NIcon>
                <ColorPaletteOutline></ColorPaletteOutline>
            </NIcon>
        </template>
        <n-list bordered>
            <n-list-item>
                <div class="flex justify-between">
                    <div>{{ t('modeSetting.dark') }}</div>
                    <n-switch
                        v-model:value="themeSwitchDefaultValue"
                        :disabled="disableThemeSwitch"
                        @update:value="handleChangeTheme"
                    ></n-switch>
                </div>
            </n-list-item>
            <n-list-item>
                <div class="flex justify-between">
                    <div>{{ t('modeSetting.follow') }}</div>
                    <n-switch
                        v-model:value="followSystemThemeSwitchDefaultValue"
                        @update:value="handleChangeFollowSystemTheme"
                    ></n-switch>
                </div>
            </n-list-item>
            <n-list-item>
                <div class="flex justify-between items-center">
                    <div>{{ t('modeSetting.color') }}</div>
                    <ColorPicker
                        class="ml-auto"
                        :color="color"
                        @change-color="handleChangeColor"
                    ></ColorPicker>
                </div>
            </n-list-item>
        </n-list>
    </pannel>
</template>
