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
import type { TTSettings } from '@/types'
import { useSettingsStore } from '@/store/settings.store'

const { t } = useI18n()
const dialog = useDialog()
const settingsStore = useSettingsStore()
const message = useMessage()
const notification = useNotification()

/**
 * Processing export configuration
 */
function handleExportSettings() {
  const blob = new Blob([JSON.stringify(settingsStore.settings)], { type: '' })
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
        try {
          const data = JSON.parse(res) as TTSettings
          settingsStore.UpdateSettings(data)
          notification.success({
            content: t('message.importSuccess'),
            meta: t('title.tip'),
            duration: 3000,
          })
        }
        catch (err) {
          notification.error({
            content: t('message.importError'),
            meta: t('title.tip'),
            duration: 3000,
          })
        }
      })
      .catch(() => {
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
      <a-button class="flex-1 mr-2" type="outline" @click="handleImportSettings">
        <template #icon>
          <n-icon>
            <Download />
          </n-icon>
        </template>
        {{ t('settingActions.importButton') }}
      </a-button>
      <a-button type="primary" class="flex-1 ml-2" @click="handleExportSettings">
        <template #icon>
          <n-icon>
            <ArrowUp />
          </n-icon>
        </template>
        {{ t('settingActions.exportButton') }}
      </a-button>
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
