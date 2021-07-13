<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import Pannel from './Pannel.vue'
import { ImageOutline, ArchiveOutline, Close } from '@vicons/ionicons5'
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

function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

/**
 * 上传之前的处理
 * 1. 文件类型判断
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
 * 处理上传变更
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
 * 清空背景
 */
function handleClearHomeBackground() {
    updatePreviewImage('')
    store.commit(MutationType.UpdateHomeBackground, '')
    message.success(t('message.clear'))
}

/**
 * 更新预览图片
 */
function updatePreviewImage(v: string): void {
    previewImage.value = v
}

watch(
    () => store.getters.GetHomeBackground,
    (v) => updatePreviewImage(v)
)

/**
 * 更新首页图片模糊度
 */
function updateHomeBackgroundBlur(v: number) {
    homeBackgroundBlur.value = v
}

function handleUpdateHomeBackgroundBlur(v: number) {
    store.commit(MutationType.UpdateHomeBackgroundBlur, v)
}

watch(
    () => store.getters.GetHomeBackgroundBlur,
    (v) => updateHomeBackgroundBlur(v)
)

/**
 * 更新首页图片模糊度
 */
function updateHomeBackgroundMask(v: number) {
    console.log(v)
    homeBackgroundMask.value = v
}

function handleUpdateHomeBackgroundMask(v: number) {
    store.commit(MutationType.UpdateHomeBackgroundMask, v)
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
    <Pannel
        :title="t('backgroundSetting.title')"
        :desc="t('backgroundSetting.desc')"
    >
        <template #icon>
            <NIcon>
                <ImageOutline></ImageOutline>
            </NIcon>
        </template>
        <n-list class="my-0 min-w-full">
            <n-list-item class="group relative !border-0" v-if="previewImage">
                <img
                    width="335.2"
                    height="160"
                    class="rounded"
                    :src="previewImage"
                />
                <NIcon
                    size="30"
                    class="
                        !absolute
                        top-4
                        right-2
                        cursor-pointer
                        text-white
                        transition-opacity
                        opacity-0
                        group-hover:opacity-80
                    "
                    @click="handleClearHomeBackground"
                >
                    <Close></Close>
                </NIcon>
            </n-list-item>
            <n-list-item class="!border-0">
                <n-upload
                    class="setting-upload-button flex"
                    multiple
                    :default-upload="false"
                    :file-list-style="{ display: 'none' }"
                    @change="handleUploaderChange"
                    @before-upload="handleBeforeUpload"
                >
                    <n-button class="!w-full" size="large">{{
                        t('backgroundSetting.choose')
                    }}</n-button>
                </n-upload>
            </n-list-item>
            <n-list-item>
                <div class="flex flex-col">
                    <div>模糊程度</div>
                    <div class="flex items-center mt-2">
                        <n-slider
                            v-model:value="homeBackgroundBlur"
                            :step="0.01"
                            :max="20"
                            :min="1"
                            :tooltip="false"
                            @update:value="handleUpdateHomeBackgroundBlur"
                        />
                        <div class="ml-2 select-none">
                            {{
                                parseInt(
                                    ((homeBackgroundBlur / 2) * 10).toString()
                                )
                            }}%
                        </div>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div>遮罩浓度</div>
                    <div class="flex items-center mt-2">
                        <n-slider
                            v-model:value="homeBackgroundMask"
                            :step="0.01"
                            :max="1"
                            :min="0"
                            :tooltip="false"
                            @update:value="handleUpdateHomeBackgroundMask"
                        />
                        <div class="ml-2 select-none">
                            {{
                                parseInt((homeBackgroundMask * 100).toString())
                            }}%
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
