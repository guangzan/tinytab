<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { LanguageOutline, SettingsOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import { useMessage } from 'naive-ui'
import EnginesEditor from './EnginesEdit.vue'
import ModeSetting from './ModeSetting.vue'
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

const homeSettingButtonVisible = computed(() =>
  store.settings.visibleList.includes('homeSettingButton'),
)

const homeLangButtonVisible = computed(() =>
  store.settings.visibleList.includes('homeLangButton'),
)

function changeLang() {
  const currentLang = store.settings.lang
  store.UpdateLang(currentLang === 'en' ? 'zh-CN' : 'en')
}

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
</script>

<template>
  <div class="!absolute top-6 right-6 flex">
    <div class="mr-2 text-center w-8 h-8 leading-10 cursor-pointer" @click="changeLang">
      <div :class="{ hidden: !homeLangButtonVisible }">
        <n-icon size="20" class="text-gray-500">
          <LanguageOutline />
        </n-icon>
      </div>
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

  <a-drawer class="<md:!w-full" :visible="drawerVisible" :width="400" :footer="false">
    <template #title>
      <div class="flex items-center">
        <span>{{ t('title.settings') }}</span>
      </div>
    </template>
    <EnginesEditor />
    <EnginesSort />
    <ModeSetting />
    <BackgroundSetting />
    <TargetSetting />
    <VisibilitySettings />
    <SettingsActions />
  </a-drawer>
</template>
