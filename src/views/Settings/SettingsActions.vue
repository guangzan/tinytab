<script lang="ts" setup>
import { onMounted } from 'vue'
import { saveAs } from 'file-saver'
import { readAsText } from 'promise-file-reader'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import {
  ArrowUpOutline as ArrowUp,
  DownloadOutline as Download,
  FileTrayFullOutline,
} from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import Pannel from '../../components/Pannel.vue'
import type { ISettings } from '@/types'
import { useSettingsStore } from '@/store/settings.store'
import {
  followSystemTheme as _followSystemTheme,
  homeBackground as _homeBackground,
  homeBackgroundBlur as _homeBackgroundBlur,
  homeBackgroundMask as _homeBackgroundMask,
  lang as _lang,
  primaryColor as _primaryColor,
  target as _target,
  theme as _theme,
  visibleList as _visibleList,
} from '@/data'

const { t } = useI18n()
const dialog = useDialog()
const store = useSettingsStore()
const message = useMessage()
const notification = useNotification()

/**
 * Processing export configuration
 */
function handleExportSettings() {
  const settings: ISettings = {
    theme: store.theme,
    primaryColor: store.primaryColor,
    visibleList: store.visibleList,
    followSystemTheme: store.followSystemTheme,
    lang: store.lang,
    homeBackground: store.homeBackground,
    enginesData: store.enginesData,
    homeBackgroundMask: store.homeBackgroundMask,
    homeBackgroundBlur: store.homeBackgroundBlur,
    target: store.target,
  }

  const blob = new Blob([JSON.stringify(settings)], { type: '' })
  saveAs(blob, `tinytab.settings.${new Date().getTime()}.json`)

  const msg: any = message.info(t('settingActions.generating'), {
    closable: true,
    duration: 5000,
  })
  setTimeout(() => {
    msg.type = 'success'
    msg.content = t('settingActions.generated')
  }, 500)
}

/**
 * Processing import configuration
 */
function handleImportSettings() {
  const fileInput = document.getElementById('file-input')

  dialog.warning({
    title: t('title.warn'),
    content: t('dialog.settingActionsDesc'),
    positiveText: t('button.continue'),
    negativeText: t('button.cancel'),
    onPositiveClick: () => fileInput?.click(),
  })
}

/**
 * Import configuration callback
 */
function generateSettings(e: Event) {
  const target = e.target as HTMLInputElement
  const fileMetaData: File = (target.files as FileList)[0]

  if (fileMetaData) {
    readAsText(fileMetaData)
      .then((res) => {
        const data = JSON.parse(res) as ISettings

        // The new configuration needs to set the default value to prevent the import of the old version configuration file from reporting errors
        // Force the imported configuration object to implement the interface ISettings
        // Consistent with the exported configuration items
        const settings: ISettings = {
          enginesData: data.enginesData || [],
          theme: data.theme || _theme,
          primaryColor: data.primaryColor || _primaryColor,
          homeBackground: data.homeBackground || _homeBackground,
          followSystemTheme: data.followSystemTheme || _followSystemTheme,
          visibleList: data.visibleList || _visibleList,
          lang: data.lang || _lang,
          homeBackgroundMask: data.homeBackgroundMask || _homeBackgroundMask,
          homeBackgroundBlur: data.homeBackgroundBlur || _homeBackgroundBlur,
          target: data.target || _target,
        }

        store.UpdateEnginesData(settings.enginesData)
        store.UpdateTheme(settings.theme)
        store.UpdatePrimaryColor(settings.primaryColor)
        store.UpdateHomeBackground(settings.homeBackground)
        store.UpdateFollowSystemTheme(settings.followSystemTheme)
        store.UpdateVisibleList(settings.visibleList)
        store.UpdateLang(settings.lang)
        store.UpdateHomeBackgroundMask(settings.homeBackgroundMask)
        store.UpdateHomeBackgroundBlur(settings.homeBackgroundBlur)
        store.UpdateTarget(settings.target)

        notification.success({
          content: t('message.importSuccess'),
          meta: t('title.tip'),
          duration: 3000,
        })
      })
      .catch((err: any) => {
        notification.error({
          content: t('message.unknownError'),
          meta: t('title.tip'),
          duration: 3000,
        })
      })
  }
}

onMounted(() => {
  const fileInput = document.getElementById('file-input')
  fileInput?.addEventListener('change', generateSettings, false)
})
</script>

<template>
  <Pannel :title="t('settingActions.title')" :desc="t('settingActions.desc')">
    <template #icon>
      <n-icon>
        <FileTrayFullOutline />
      </n-icon>
    </template>

    <div class="flex">
      <n-button class="flex-1 mr-2" @click="handleImportSettings">
        <template #icon>
          <n-icon>
            <Download />
          </n-icon>
        </template>
        {{ t('settingActions.importButton') }}
      </n-button>
      <n-button type="primary" class="flex-1 ml-2" @click="handleExportSettings">
        <template #icon>
          <n-icon>
            <ArrowUp />
          </n-icon>
        </template>
        {{ t('settingActions.exportButton') }}
      </n-button>
    </div>
  </Pannel>
  <input id="file-input" type="file" class="hidden">
</template>

<style scoped>
.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
