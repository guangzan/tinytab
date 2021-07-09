<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { saveAs } from 'file-saver'
import { useStore } from 'vuex'
import type { EngineItem } from '@/types'
import Pannel from './Pannel.vue'
import { readAsText } from 'promise-file-reader'
import {
    DownloadOutline as Download,
    ArrowUpOutline as ArrowUp,
    CheckmarkCircleSharp as Success,
} from '@vicons/ionicons5'
import { LoadingOutlined as Loading } from '@vicons/antd'
import { MutationType } from '../../store/mutations'
import type { ISettings } from '../../types'
import { useNotification, useDialog } from 'naive-ui'
import { FileTrayFullOutline } from '@vicons/ionicons5'
import {
    theme as defaultTheme,
    primaryColor as defaultPrimaryColor,
    homeBackground as defaultHomeBackground,
    followTheme as defaultFollowTheme,
    visibleList as defaultVisibleList,
} from '@/data/index'

const dialog = useDialog()
const store = useStore()
const notification = useNotification()
const showExportModal = ref(false)
const downloading = ref(true)

function handleExportSettings() {
    const settings = {} as ISettings
    const {
        enginesData,
        theme,
        primaryColor,
        visibleList,
        homeBackground,
        followTheme,
    } = store.state

    settings['theme'] = JSON.parse(JSON.stringify(theme))
    settings['primaryColor'] = JSON.parse(JSON.stringify(primaryColor))
    settings['visibleList'] = JSON.parse(JSON.stringify(visibleList))
    settings['homeBackground'] = JSON.parse(JSON.stringify(homeBackground))
    settings['enginesData'] = JSON.parse(JSON.stringify(enginesData))
    settings['followTheme'] = JSON.parse(JSON.stringify(followTheme))

    const blob = new Blob([JSON.stringify(settings)], { type: '' })
    saveAs(blob, `tinytab.settings.${new Date().getTime()}.json`)

    setTimeout(() => {
        downloading.value = false
    }, 500)

    showExportModal.value = true
}

function handleImportSettings() {
    const fileInput = document.getElementById('file-input')

    dialog.warning({
        title: '警告',
        content: '导入的配置将会覆盖所有当前配置',
        positiveText: '继续',
        negativeText: '取消',
        onPositiveClick: () => fileInput?.click(),
    })
}

function handleUpdateExportModal(e: boolean) {
    if (e === false) {
        setTimeout(() => {
            downloading.value = true
        }, 500)
    }
}

onMounted(() => {
    const fileInput = document.getElementById('file-input')

    function handleSettings(e: Event) {
        // function generateSettins() {
        const target = e.target as HTMLInputElement
        const fileMetaData: File = (target.files as FileList)[0]

        if (fileMetaData) {
            readAsText(fileMetaData)
                .then((res) => {
                    const data: ISettings = JSON.parse(res)
                    // 新增配置需要设置默认值，防止导入旧版本配置文件报错
                    const {
                        enginesData,
                        theme = defaultTheme,
                        primaryColor = defaultPrimaryColor,
                        homeBackground = defaultHomeBackground,
                        followTheme = defaultFollowTheme,
                        visibleList = defaultVisibleList,
                    } = data

                    store.commit(MutationType.UpdateEnginesData, enginesData)
                    store.commit(MutationType.UpdateTheme, theme)
                    store.commit(MutationType.UpdatePrimaryColor, primaryColor)
                    store.commit(
                        MutationType.UpdateHomeBackground,
                        homeBackground
                    )
                    store.commit(MutationType.UpdateFollowTheme, followTheme)
                    store.commit(MutationType.UpdateVisibleList, visibleList)

                    notification.success({
                        content: '导入配置成功',
                        meta: '提示',
                        duration: 3000,
                    })
                })
                .catch((err: any) => {
                    notification.error({
                        content: '出现未知错误',
                        meta: '提示',
                        duration: 3000,
                    })
                })
        }
    }

    fileInput?.addEventListener('change', handleSettings, false)
})
</script>

<template>
    <pannel title="导入与导出" desc="为防止配置丢失，请务必妥善保存配置文件">
        <template #icon>
            <NIcon>
                <FileTrayFullOutline></FileTrayFullOutline>
            </NIcon>
        </template>

        <div class="flex">
            <n-button @click="handleImportSettings" class="flex-1 mr-2">
                <template #icon>
                    <n-icon>
                        <download />
                    </n-icon>
                </template>
                导入配置
            </n-button>
            <n-button
                type="primary"
                @click="handleExportSettings"
                class="flex-1 ml-2"
            >
                <template #icon>
                    <n-icon>
                        <arrow-up />
                    </n-icon>
                </template>
                导出配置
            </n-button>
        </div>
    </pannel>
    <input type="file" id="file-input" class="hidden" />
    <n-modal
        preset="card"
        title="导出配置"
        size="huge"
        v-model:show="showExportModal"
        :style="{ width: '460px', marginTop: '100px' }"
        :bordered="false"
        :mask-closable="true"
        @update:show="handleUpdateExportModal"
    >
        <div class="flex flex-col justify-center items-center my-8 mx-auto">
            <n-icon size="30" color="#34AC69">
                <component
                    :is="downloading ? Loading : Success"
                    :class="{ spin: downloading }"
                ></component>
            </n-icon>
            <div class="mt-8">
                {{ downloading ? '配置生成中' : '配置文件生成成功' }}
            </div>
        </div>
    </n-modal>
</template>

<style scoped>
.spin {
    animation: spin 1s linear infinite;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
