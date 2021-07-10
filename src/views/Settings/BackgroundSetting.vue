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
    changePreviewImage(base64)
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
    changePreviewImage('')
    store.commit(MutationType.UpdateHomeBackground, '')
    message.success(t('message.clear'))
}

/**
 * 更新预览图片
 */
function changePreviewImage(v: string): void {
    previewImage.value = v
}

watch(
    () => store.getters.GetHomeBackground,
    (v: string) => changePreviewImage(v)
)

onMounted(() => {
    changePreviewImage(store.getters.GetHomeBackground)
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
            <n-list-item class="relative !border-0" v-if="previewImage">
                <!-- <n-image width="335.2" height="200" :src="previewImage" /> -->
                <img
                    width="335.2"
                    height="200"
                    class="rounded"
                    :src="previewImage"
                />
                <NIcon
                    size="30"
                    class="!absolute top-4 right-2 cursor-pointer text-red-500"
                    @click="handleClearHomeBackground"
                >
                    <Close></Close>
                </NIcon>
            </n-list-item>
            <n-list-item>
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
        </n-list>
    </Pannel>
</template>

<style>
.setting-upload-button .n-upload__trigger {
    width: 100%;
}
</style>
