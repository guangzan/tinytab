<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Add, Close, Remove } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import Pannel from '../../components/Pannel.vue'
import { useSettingsStore } from '@/store/settings.store'

const { t } = useI18n()
const store = useSettingsStore()
const message = useMessage()
const previewImage = ref()
const homeBackgroundBlur = ref(0)
const homeBackgroundMask = ref(0)
// const fileListRef = ref([])

const homeBackgroundBlurPercentage = computed(() =>
  parseInt((homeBackgroundBlur.value * 5).toString()),
)
const homeBackgroundMaskPercentage = computed(() =>
  parseInt((homeBackgroundMask.value * 100).toString()),
)

/**
 * Gets the base64 encoding of the file.
 */
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * Processing before uploading
 * 1. File type determination
 */
async function handleBeforeUpload({ file, fileList }) {
  const typeList = ['png', 'jpeg']
  const size = file.file.size

  let type = file.file.type
  type = type.substring(type.lastIndexOf('\/') + 1, type.length)

  if (!typeList.includes(type)) {
    message.error(t('message.imgFormatError'))
    return false
  }

  if (size > 2048000) {
    message.error(t('message.sizeOverflow'))
    return false
  }

  return true
}

/**
 * Process upload changes
 */
async function handleUploaderChange({ file, fileList }) {
  const base64 = (await getBase64(file.file)) as string
  updatePreviewImage(base64)
  store.UpdateHomeBackground('src', base64)
  message.success(t('message.updateSuccess'))

  // fileList.forEach(async (file: any) => {
  //     file.url = (await getBase64(file.file)) as string
  // })
  // fileListRef.value = fileList
}

/**
 * Clear the background
 */
function handleClearHomeBackground() {
  updatePreviewImage('')
  store.UpdateHomeBackground('src', '')
  message.success(t('message.clear'))
}

/**
 * Update the preview image
 */
function updatePreviewImage(v: string): void {
  previewImage.value = v
}

watch(
  () => store.settings.homeBackground.src,
  v => updatePreviewImage(v || ''),
)

/**
 * Update home page image blur
 */
function updateHomeBackgroundBlur(v: number) {
  homeBackgroundBlur.value = v
}

function handleUpdateHomeBackgroundBlur(v: number) {
  store.UpdateHomeBackground('blur', v)
}

function handleDecreaseHomeBackgroundBlur() {
  if (homeBackgroundBlurPercentage.value === 0)
    return
  homeBackgroundBlur.value -= 0.2
}

function handleIncreaseHomeBackgroundBlur() {
  if (homeBackgroundBlurPercentage.value === 100)
    return
  homeBackgroundBlur.value += 0.2
}

watch(
  () => homeBackgroundBlur,
  v => updateHomeBackgroundBlur(v.value),
)

/**
 * Update home page image mask
 */
function updateHomeBackgroundMask(v: number) {
  homeBackgroundMask.value = v
}

function handleUpdateHomeBackgroundMask(v: number) {
  store.UpdateHomeBackground('mask', v)
}

function handleDecreaseHomeBackgroundMask() {
  if (homeBackgroundMaskPercentage.value === 0)
    return
  homeBackgroundMask.value -= 0.01
}

function handleIncreaseHomeBackgroundMask() {
  if (homeBackgroundMaskPercentage.value === 100)
    return
  homeBackgroundMask.value += 0.01
}

watch(
  () => homeBackgroundMask,
  v => updateHomeBackgroundMask(v.value),
)

onMounted(() => {
  updatePreviewImage(store.settings.homeBackground.src)
  updateHomeBackgroundBlur(store.settings.homeBackground.blur)
  updateHomeBackgroundMask(store.settings.homeBackground.mask)
})
</script>

<template>
  <Pannel :title="t('backgroundSetting.title')" :desc="t('backgroundSetting.desc')">
    <template #icon>
      <icon-image />
    </template>
    <a-list class="my-0 min-w-full">
      <a-list-item v-if="previewImage" class="group relative !border-0">
        <img height="160" class="w-full rounded" :src="previewImage">
        <n-button
          round
          size="small"
          type="primary"
          class="!absolute top-6 right-4 cursor-pointer opacity-0 group-hover:opacity-80 transition-opacity"
        >
          <template #icon>
            <NIcon class="text-white" @click="handleClearHomeBackground">
              <Close />
            </NIcon>
          </template>
        </n-button>
      </a-list-item>
      <a-list-item class="!border-0">
        <n-upload
          class="setting-upload-button flex w-full"
          multiple
          :default-upload="false"
          :file-list-style="{ display: 'none' }"
          @change="handleUploaderChange"
          @before-upload="handleBeforeUpload"
        >
          <n-button class="!w-full" size="large">
            {{
              t('backgroundSetting.choose')
            }}
          </n-button>
        </n-upload>
      </a-list-item>
      <a-list-item>
        <div class="flex flex-col">
          <div class="text-gray-500 text-xs">
            <span>{{ t('backgroundSetting.blur') }}：</span>
            <span class="w-12 text-center">{{ homeBackgroundBlurPercentage }}%</span>
          </div>
          <div class="flex items-center mt-2">
            <div>
              <n-button size="tiny" @click="handleDecreaseHomeBackgroundBlur">
                <NIcon>
                  <Remove />
                </NIcon>
              </n-button>
            </div>
            <div class="mx-4 flex-1">
              <n-slider
                v-model:value="homeBackgroundBlur"
                :step="0.2"
                :max="20"
                :min="0"
                :tooltip="false"
                @update:value="handleUpdateHomeBackgroundBlur"
              />
            </div>
            <div>
              <n-button size="tiny" @click="handleIncreaseHomeBackgroundBlur">
                <NIcon>
                  <Remove />
                </NIcon>
              </n-button>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <div class="text-gray-500 text-xs">
            <span>{{ t('backgroundSetting.mask') }}：</span>
            <span class="w-12 text-center">{{ homeBackgroundMaskPercentage }}%</span>
          </div>
          <div class="flex items-center mt-2">
            <n-button size="tiny" @click="handleDecreaseHomeBackgroundMask">
              <icon-minus />
            </n-button>
            <div class="mx-4 flex-1">
              <n-slider
                v-model:value="homeBackgroundMask"
                :step="0.01"
                :max="1"
                :min="0"
                :tooltip="false"
                @update:value="handleUpdateHomeBackgroundMask"
              />
            </div>
            <div>
              <n-button size="tiny" @click="handleIncreaseHomeBackgroundMask">
                <NIcon>
                  <Add />
                </NIcon>
              </n-button>
            </div>
          </div>
        </div>
      </a-list-item>
    </a-list>
  </Pannel>
</template>

<style>
.setting-upload-button .n-upload__trigger {
    width: 100%;
}
</style>
