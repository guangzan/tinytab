<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import Pannel from './Pannel.vue'
import { ImageOutline, ArchiveOutline, Close } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import type { UploadFile } from 'naive-ui'

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
        message.error(`只能选择 ${typeList.join()} 格式的图片文件，请重新选择`)
        return false
    }

    if (size > 2048000) {
        message.error(`只能选择小于 2M 的图片，请重新选择`)
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
    message.success('修改成功')

    // fileList.forEach(async (file: any) => {
    //     file.url = (await getBase64(file.file)) as string
    // })
    // fileListRef.value = fileList
}

function handleClearHomeBackground() {
    changePreviewImage('')
    store.commit(MutationType.UpdateHomeBackground, '')
    message.success('已清除')
}

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
        title="背景图片"
        desc="限于浏览器存储能力，请选择小于 2M 的图片，格式为 png 或 jpg"
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
                    <n-button class="!w-full" size="large"> 选择图片 </n-button>
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
