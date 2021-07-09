<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { EngineItem, IMsgItem } from '@/types'
import { useMessage } from 'naive-ui'
import {
    PencilOutline as Edit,
    Add,
    InformationCircleOutline as Info,
    ReturnDownBackOutline,
} from '@vicons/ionicons5'
import { useStore } from 'vuex'
import { ActionTypes } from '../../store/actions'
import { MutationType } from '@/store/mutations'

const store = useStore()
const message = useMessage()
const formRef = ref() /* template ref */
let formData = ref<EngineItem>() /* 表单初始化数据 */

const props = defineProps<{
    engineId: number
    showModal: boolean
    operateType: 'add' | 'edit'
}>()

const emit = defineEmits<{
    (event: 'update:showModal', showModal: boolean): void
}>()

function validatePrefix(rule: any, value: string) {
    const prefix = value.trim()
    const enginesData = store.state.enginesData

    if (
        enginesData.find(
            (engine: EngineItem) =>
                engine.prefix === prefix && engine.id !== formData.value?.id
        )
    ) {
        return false
    }

    return true
}

const rules = ref({
    /* 表单验证规则 */
    name: [
        {
            required: true,
            message: '请输入搜索引擎名称',
            trigger: 'blur',
        },
        {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
        },
    ],
    baseUrl: [
        {
            required: true,
            message: '请输入搜索路径前缀',
            trigger: 'blur',
        },
    ],
    prefix: [
        {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
        },
        {
            validator: validatePrefix,
            message: '该前缀已经存在',
            trigger: ['input', 'blur'],
        },
    ],
    suffix: [
        {
            validator(rule: any, value: string[]) {
                if (value.length) {
                    if (value[value.length - 1].length > 10) {
                        return false
                    }
                    return true
                }
            },
            message: '单个长度在 1 到 10 个字符',
            trigger: ['input'],
        },
        {
            validator(rule: any, value: string[]) {
                if (value.length > 5) {
                    return false
                }
                return true
            },
            message: '最多五个',
            trigger: ['input', 'blur'],
        },
    ],
})

watch(
    () => props.showModal,
    (value) => {
        if (value === true) {
            const { engineId, operateType } = props

            if (operateType === 'add') {
                formData.value = {
                    id: 0,
                    name: '',
                    baseUrl: '',
                    placeholderText: '',
                    hotkeys: '',
                    color: '#000000',
                    category: 1,
                    isDefault: false,
                    prefix: '',
                    suffix: [],
                }
            }

            if (operateType === 'edit') {
                const enginesData = JSON.parse(
                    localStorage.getItem('enginesData') as string
                ) as EngineItem[]
                formData.value = enginesData.filter(
                    (engine: EngineItem) => engine.id === engineId
                )[0]
            }
        }
    }
)

/**
 * 添加引擎
 */
function handleAddEngine(engineItem: EngineItem): void {
    engineItem.id = new Date().getTime()
    store.commit(MutationType.CreateEngine, engineItem)
    message.success('添加成功')
    emit('update:showModal', false)
}

/**
 * 编辑引擎
 */
function handleEditEngine(engineItem: EngineItem): void {
    store.dispatch(ActionTypes.UpdateEngine, engineItem).then((msgList) => {
        msgList.map((msgItem: IMsgItem) => {
            message[msgItem.type](msgItem.content)
        })
    })
    emit('update:showModal', false)
}

/**
 * 点击确认触发
 */
function handleSubmitModal() {
    formRef.value
        .validate()
        .then((res: any) => {
            const engineData = formData.value as EngineItem
            if (props.operateType == 'add') {
                handleAddEngine(engineData)
            } else {
                handleEditEngine(engineData)
            }
        })
        .catch((error: any) => {
            message.error(`未知错误 &{error}`)
        })
}

/**
 * 点击 modal 取消按钮触发
 */
function handleCancelModal() {
    emit('update:showModal', false)
}

/**
 * 点击 modal x 按钮触发
 */
function handleCloseModal() {
    emit('update:showModal', false)
}

/**
 * modal 状态更新时触发
 * 1. 点击 x
 * 2. 点击 mask 遮罩层
 * 3. 点击确定或取消
 * naive ui 无法监听点击 mask 点击，只能通过 @update
 * 副作用：没有通过表单验证依然触发
 * 参数 e 恒为 false
 * @param {boolean} e -状态
 */
function handleUpdate(e: boolean): void {}
</script>

<template>
    <n-modal
        preset="dialog"
        positive-text="确认"
        negative-text="取消"
        :closable="true"
        :show="showModal"
        :title="operateType === 'add' ? '新增' : '修改'"
        :mask-closable="true"
        display-directive="show"
        @positive-click="handleSubmitModal"
        @negative-click="handleCancelModal"
        @close="handleCloseModal"
        @update:show="handleUpdate"
    >
        <template #icon>
            <n-icon size="20">
                <component :is="operateType === 'add' ? Add : Edit"></component>
            </n-icon>
        </template>
        <n-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-width="80"
            label-placement="left"
            label-align="left"
        >
            <n-form-item label="引擎名称" path="name">
                <n-input
                    placeholder="例如：Baidu"
                    v-model:value="formData.name"
                ></n-input>
            </n-form-item>
            <n-form-item label="基础路径" path="baseUrl">
                <n-input
                    placeholder="例如：https://www.baidu.com/s?ie=UTF-8&wd="
                    v-model:value="formData.baseUrl"
                ></n-input>
            </n-form-item>
            <n-form-item label="提示文本" path="placeholderText">
                <n-input
                    placeholder="例如：百度一下，你就知道"
                    v-model:value="formData.placeholderText"
                ></n-input>
            </n-form-item>
            <n-form-item
                :label-style="{ display: 'flex', alignItems: 'center' }"
                path="prefix"
            >
                <template #label>
                    <span>快捷前缀</span>
                    <n-popover trigger="hover" :style="{ width: '200px' }">
                        <template #trigger>
                            <n-icon
                                class="text-gray-400 cursor-pointer"
                                size="20"
                            >
                                <Info></Info>
                            </n-icon>
                        </template>
                        <span
                            >在搜索时，输入自定义前缀并按下空格，就能立即切换到当前引擎。</span
                        >
                    </n-popover>
                </template>
                <n-input
                    placeholder="通过前缀快速切换引擎"
                    v-model:value="formData.prefix"
                ></n-input>
            </n-form-item>

            <n-form-item
                :label-style="{ display: 'flex', alignItems: 'center' }"
                path="suffix"
            >
                <template #label>
                    <span>规则后缀</span>
                    <n-popover trigger="hover" :style="{ width: '200px' }">
                        <template #trigger>
                            <n-icon
                                class="text-gray-400 cursor-pointer"
                                size="20"
                            >
                                <Info></Info>
                            </n-icon>
                        </template>
                        <span
                            >在搜索时，自定义后缀将会添加到搜索路径最后面。</span
                        >
                    </n-popover>
                </template>
                <!-- <n-form-item label="规则后缀" path="suffix"> -->
                <n-dynamic-tags v-model:value="formData.suffix" />
            </n-form-item>
            <n-form-item label="设为默认" path="isDefault">
                <n-switch v-model:value="formData.isDefault"></n-switch>
            </n-form-item>
            <n-form-item label="显示颜色" path="color">
                <n-color-picker
                    v-model:value="formData.color"
                    :modes="['hex']"
                ></n-color-picker>
            </n-form-item>
        </n-form>
    </n-modal>
</template>
