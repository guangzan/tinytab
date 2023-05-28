<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { LanguageOutline, MoonOutline, SettingsOutline, SunnyOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import { useMessage } from 'naive-ui'
import EnginesEditor from './EnginesEdit.vue'
import ThemeSetting from './ThemeSetting.vue'
import EnginesSort from './EnginesSort.vue'
import SettingsActions from './SettingsActions.vue'
import VisibilitySettings from './VisibilitySettings.vue'
import BackgroundSetting from './BackgroundSetting.vue'
import TargetSetting from './TargetSetting.vue'
import { useSettingsStore } from '@/store/settings.store'

defineOptions({
  name: 'SettingsDrawer',
})

const message = useMessage()
const { t, locale } = useI18n()
const store = useSettingsStore()
const drawerVisible = ref(false)

const homeSettingButtonVisible = computed(() => store.settings.visibleList.includes('homeSettingButton'))
const homeLangButtonVisible = computed(() => store.settings.visibleList.includes('homeLangButton'))
const homeModeButtonVisible = computed(() => store.settings.visibleList.includes('HOME_MODE_BUTTON'))
const isDarkMode = computed(() => store.settings.theme.mode === 'dark')

watch(
  () => store.settings.lang,
  (v) => {
    locale.value = v
    message.info(t('message.toggleLang'))
  },
)

onMounted(() => {
  locale.value = store.settings.lang
})

function changeLang() {
  const currentLang = store.settings.lang
  store.UpdateLang(currentLang === 'en' ? 'zh-CN' : 'en')
}

function changeMode() {
  store.UpdateTheme('mode', isDarkMode.value ? 'light' : 'dark')
}
</script>

<template>
  <div class="!absolute top-6 right-6 flex">
    <div v-if="homeLangButtonVisible" class="mr-2 text-center w-8 h-8 leading-10 cursor-pointer" @click="changeLang">
      <n-icon size="20" class="text-gray-500">
        <LanguageOutline />
      </n-icon>
    </div>
    <div v-if="homeModeButtonVisible" class="mr-2 text-center w-8 h-8 leading-10 cursor-pointer" @click="changeMode">
      <n-icon v-if="isDarkMode" size="20" class="text-gray-500">
        <MoonOutline />
      </n-icon>
      <n-icon v-else size="20" class="text-gray-500">
        <SunnyOutline />
      </n-icon>
    </div>
    <div
      class="group text-center w-8 h-8 leading-10 cursor-pointer"
      @click="drawerVisible = true"
    >
      <div class="group-hover:block" :class="{ hidden: !homeSettingButtonVisible }">
        <n-icon size="20" class="text-gray-500">
          <SettingsOutline />
        </n-icon>
      </div>
    </div>
  </div>

  <a-drawer id="settings-drawer" class="<md:!w-full" :visible="drawerVisible" :width="400" :footer="false" @cancel="drawerVisible = false">
    <template #title>
      <div class="flex items-center">
        <span>{{ t('title.settings') }}</span>
      </div>
    </template>
    <div class="flex flex-col">
      <EnginesEditor />
      <EnginesSort />
      <ThemeSetting />
      <BackgroundSetting />
      <TargetSetting />
      <VisibilitySettings />
      <SettingsActions />
    </div>
  </a-drawer>
</template>

<style>
#settings-drawer .arco-drawer-body {
  padding: 0;
}
</style>
