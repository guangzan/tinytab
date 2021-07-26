<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import Pannel from '../../components/Pannel.vue'
import { ImageOutline, ArchiveOutline, Close, Add, Remove } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import type { UploadFile } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
const message = useMessage()
const previewImage = ref()
const homeBackgroundBlur = ref(0)
const homeBackgroundMask = ref(0)
// const fileListRef = ref([])

const homeBackgroundBlurPercentage = computed(() => parseInt((homeBackgroundBlur.value * 5).toString()))
const homeBackgroundMaskPercentage = computed(() => parseInt((homeBackgroundMask.value * 100).toString()))

/**
 * Gets the base64 encoding of the file.
 */
function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
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
    store.commit(MutationType.UpdateHomeBackground, base64)
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
    store.commit(MutationType.UpdateHomeBackground, '')
    message.success(t('message.clear'))
}

/**
 * Update the preview image
 */
function updatePreviewImage(v: string): void {
    previewImage.value = v
}

watch(
    () => store.getters.GetHomeBackground,
    (v) => updatePreviewImage(v)
)

/**
 * Update home page image blur
 */
function updateHomeBackgroundBlur(v: number) {
    homeBackgroundBlur.value = v
}

function handleUpdateHomeBackgroundBlur(v: number) {
    store.commit(MutationType.UpdateHomeBackgroundBlur, v)
}

function handleDecreaseHomeBackgroundBlur() {
    if (homeBackgroundBlurPercentage.value == 0) return
    homeBackgroundBlur.value -= 0.2
}

function handleIncreaseHomeBackgroundBlur() {
    if (homeBackgroundBlurPercentage.value == 100) return
    console.log(123)
    homeBackgroundBlur.value += 0.2
}

watch(
    () => store.getters.GetHomeBackgroundBlur,
    (v) => updateHomeBackgroundBlur(v)
)

/**
 * Update home page image mask
 */
function updateHomeBackgroundMask(v: number) {
    homeBackgroundMask.value = v
}

function handleUpdateHomeBackgroundMask(v: number) {
    store.commit(MutationType.UpdateHomeBackgroundMask, v)
}

function handleDecreaseHomeBackgroundMask() {
    if (homeBackgroundMaskPercentage.value == 0) return
    homeBackgroundMask.value -= 0.01
}

function handleIncreaseHomeBackgroundMask() {
    if (homeBackgroundMaskPercentage.value == 100) return
    homeBackgroundMask.value += 0.01
}

watch(
    () => store.getters.GetHomeBackgroundMask,
    (v) => updateHomeBackgroundMask(v)
)

onMounted(() => {
    updatePreviewImage(store.getters.GetHomeBackground)
    updateHomeBackgroundBlur(store.getters.GetHomeBackgroundBlur)
    updateHomeBackgroundMask(store.getters.GetHomeBackgroundMask)
})
</script>

<template>
    <Pannel :title="t('backgroundSetting.title')" :desc="t('backgroundSetting.desc')">
        <template #icon>
            <NIcon>
                <ImageOutline></ImageOutline>
            </NIcon>
        </template>
        <n-list class="my-0 min-w-full">
            <n-list-item class="group relative !border-0" v-if="previewImage">
                <img width="335.2" height="160" class="rounded" :src="previewImage" />
                <n-button round size="small" type="primary" class="!absolute top-6 right-4 cursor-pointer opacity-0 group-hover:opacity-80 transition-opacity">
                    <template #icon>
                        <NIcon class="text-white" @click="handleClearHomeBackground">
                            <Close></Close>
                        </NIcon>
                    </template>
                </n-button>
            </n-list-item>
            <n-list-item class="!border-0">
                <n-upload class="setting-upload-button flex" multiple :default-upload="false" :file-list-style="{ display: 'none' }" @change="handleUploaderChange" @before-upload="handleBeforeUpload">
                    <n-button class="!w-full" size="large">{{ t('backgroundSetting.choose') }}</n-button>
                </n-upload>
            </n-list-item>
            <n-list-item>
                <div class="flex flex-col">
                    <div>
                        <span>{{ t('backgroundSetting.blur') }}：</span>
                        <span class="w-12 text-center">{{ homeBackgroundBlurPercentage }}%</span>
                    </div>
                    <div class="flex items-center mt-2">
                        <div>
                            <n-button size="tiny" @click="handleDecreaseHomeBackgroundBlur">
                                <NIcon>
                                    <Remove></Remove>
                                </NIcon>
                            </n-button>
                        </div>
                        <div class="mx-4 flex-1">
                            <n-slider v-model:value="homeBackgroundBlur" :step="0.2" :max="20" :min="0" :tooltip="false" @update:value="handleUpdateHomeBackgroundBlur" />
                        </div>
                        <div>
                            <n-button size="tiny" @click="handleIncreaseHomeBackgroundBlur">
                                <NIcon>
                                    <Add></Add>
                                </NIcon>
                            </n-button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div>
                        <span>{{ t('backgroundSetting.mask') }}：</span>
                        <span class="w-12 text-center">{{ homeBackgroundMaskPercentage }}%</span>
                    </div>
                    <div class="flex items-center mt-2">
                        <div>
                            <n-button size="tiny" @click="handleDecreaseHomeBackgroundMask">
                                <NIcon>
                                    <Remove></Remove>
                                </NIcon>
                            </n-button>
                        </div>
                        <div class="mx-4 flex-1">
                            <n-slider v-model:value="homeBackgroundMask" :step="0.01" :max="1" :min="0" :tooltip="false" @update:value="handleUpdateHomeBackgroundMask" />
                        </div>
                        <div>
                            <n-button size="tiny" @click="handleIncreaseHomeBackgroundMask">
                                <NIcon>
                                    <Add></Add>
                                </NIcon>
                            </n-button>
                        </div>
                    </div>
                </div>
            </n-list-item>
        </n-list>
    </Pannel>
</template>

<style>
.setting-upload-button .n-upload__trigger {
    width: 100%;
}
</style>
