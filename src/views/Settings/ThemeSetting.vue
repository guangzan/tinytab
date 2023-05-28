<script lang="ts" setup>
import { ref } from 'vue'
import { ColorPaletteOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import Pannel from '../../components/Pannel.vue'
import ColorPicker from '../../components/ColorPicker.vue'
import { useSettingsStore } from '@/store/settings.store'

interface ColorItem {
  value: string
  label: string
}

const { t } = useI18n()
const store = useSettingsStore()
const isDarkMode = ref(store.settings.theme.mode === 'dark')
const isFollowSystem = ref(false)

const color: ColorItem[] = [
  {
    value: '#1240FF',
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

function updateModeValue(value: string | number | boolean) {
  if (typeof value !== 'boolean')
    return

  isDarkMode.value = value
  store.UpdateTheme('mode', value ? 'dark' : 'light')
}

function handleChangeColor(data: any) {
  store.UpdateTheme('primaryColor', data.value)
}

function handleChangeFollowSystemTheme(value: string | number | boolean) {
  if (typeof value !== 'boolean')
    return

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
          <ASwitch
            v-model="isDarkMode"
            :disabled="isFollowSystem"
            @change="updateModeValue"
          />
        </div>
      </a-list-item>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('modeSetting.follow') }}</div>
          <ASwitch
            v-model="isFollowSystem"
            @change="handleChangeFollowSystemTheme"
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
