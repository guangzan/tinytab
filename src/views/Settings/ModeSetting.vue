<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { ColorPaletteOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import Pannel from '../../components/Pannel.vue'
import ColorPicker from '../../components/ColorPicker.vue'
import { useSettingsStore } from '@/store/settings.store'
import type { TTMode } from '@/types'

interface ColorItem {
  value: string
  label: string
}

const { t } = useI18n()
const store = useSettingsStore()
const disableThemeSwitch = ref(store.settings.theme.followSystem)
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
function updateThemeSwitchDefaultValue(v: TTMode) {
  themeSwitchDefaultValue.value = v === 'dark'
}

/**
 * Update the status of the follow system settings button
 */
function updateFollowSystemThemeSwitchDefaultValue(v: boolean) {
  followSystemThemeSwitchDefaultValue.value = v
}

watch(
  () => store.settings.theme.mode,
  v => updateThemeSwitchDefaultValue(v),
)

watch(
  () => store.settings.theme.followSystem,
  v => updateFollowSystemThemeSwitchDefaultValue(v),
)

onMounted(() => {
  updateThemeSwitchDefaultValue(store.settings.theme.mode)
  updateFollowSystemThemeSwitchDefaultValue(
    store.settings.theme.followSystem,
  )
})

/**
 * Update theme accent color
 */
function handleChangeColor(data: any) {
  const { value } = data
  store.UpdateTheme('primaryColor', value)
}

/**
 * Update mode
 */
function handleChangeTheme(value: boolean) {
  store.UpdateTheme('mode', value ? 'dark' : 'light')
}

/**
 * Whether the update follows the system settings
 */
function handleChangeFollowSystemTheme(value: boolean) {
  disableThemeSwitch.value = value
  store.UpdateTheme('followSystem', value)
}
</script>

<template>
  <Pannel :title="t('modeSetting.title')">
    <template #icon>
      <NIcon>
        <ColorPaletteOutline />
      </NIcon>
    </template>
    <a-list bordered>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('modeSetting.dark') }}</div>
          <n-switch
            v-model:value="themeSwitchDefaultValue"
            :disabled="disableThemeSwitch"
            @update:value="handleChangeTheme"
          />
        </div>
      </a-list-item>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('modeSetting.follow') }}</div>
          <n-switch
            v-model:value="followSystemThemeSwitchDefaultValue"
            @update:value="handleChangeFollowSystemTheme"
          />
        </div>
      </a-list-item>
      <a-list-item>
        <div class="flex justify-between items-center">
          <div>{{ t('modeSetting.color') }}</div>
          <ColorPicker
            class="ml-auto"
            :color="color"
            @change-color="handleChangeColor"
          />
        </div>
      </a-list-item>
    </a-list>
  </Pannel>
</template>
