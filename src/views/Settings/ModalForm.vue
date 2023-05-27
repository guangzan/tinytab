<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { EngineItem, IMsgItem } from '@/types'
import { useMessage } from 'naive-ui'
import * as _ from 'lodash-es'
import { useI18n } from "vue-i18n"
import { useSettingsStore } from '@/store/settings.store'
import { FieldRule } from '@arco-design/web-vue'

const props = defineProps<{
    engineId: number
    showModal: boolean
    operateType: 'add' | 'edit'
}>()

const emit = defineEmits<{
    (event: "update:showModal", showModal: boolean): void
}>()

const { t } = useI18n()
const store = useSettingsStore()
const message = useMessage()
const formRef = ref()
const formData = ref<EngineItem>()

const rules: Record<string, FieldRule[]> = ref({
    name: [
        {
            required: true,
            message: t('rules.engineNameEmpty'),
        },
        {
            min: 1,
            max: 20,
            message: t('rules.engineNameLength'),
        },
    ],
    baseUrl: [
        {
            required: true,
            message: t('rules.engineUrlEmpty'),
        },
    ],
    placeholderText: {
        required: false,
    },
    prefix: [
        {
            min: 1,
            max: 20,
            message: t('rules.enginePrefixLength'),
        },
        {
            validator: validatePrefix,
            message: t('rules.enginePrefixExist'),
            trigger: ['input', 'blur'],
        },
    ],
    suffix: [
        {
            validator(value: string[]) {
                if (value.length) {
                    if (value[value.length - 1].length > 10) {
                        return false
                    }
                    return true
                }
            },
            message: t('rules.engineSuffixLength'),
        },
        {
            validator(value: string[]) {
                if (value.length > 5) {
                    return false
                }
                return true
            },
            message: t('rules.engineSuffixNum'),
        },
    ],
    isDefault: [
        {
            required: false,
        }
    ]
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
                    color: '#4395ff',
                    category: 1,
                    isDefault: false,
                    prefix: '',
                    suffix: [],
                }
            }
            if (operateType === 'edit') {
                formData.value = store.GetEngineById(engineId)
            }
        }
    }
)

/**
 * Validation Prefix
 */
function validatePrefix(rule, value: string) {
    const prefix = value.trim()
    const enginesData = store.enginesData

    if (
        enginesData.find(
            (engine: EngineItem) => engine.prefix === prefix && engine.id !== formData.value?.id
        )
    ) {
        return false
    }
    return true
}

/**
 * Add engine
 */
function handleAddEngine(engineItem: EngineItem): void {
    engineItem.id = new Date().getTime()
    store.CreateEngine(engineItem)
    message.success(t('message.addSuccess'))
    emit('update:showModal', false)
}

/**
 * Update Engine
 */
function handleEditEngine(engineItem: EngineItem): void {
    store.UpdateEngine(engineItem).then((msgList) => {
        msgList.map((msgItem: IMsgItem) => {
            message[msgItem.type](msgItem.content)
        })
    })
    emit('update:showModal', false)
}

/**
 * Handle press submit
 */
function handleSubmitModal() {
    formRef.value.validate(() => {
        if (_.isUndefined(formData.value)) {
            return
        }
        if (props.operateType == 'add') {
            handleAddEngine(formData.value)
        } else {
            handleEditEngine(formData.value)
        }
    })
}

/**
 * Handle press cancel
 */
function handleCancelModal() {
    emit('update:showModal', false)
}

/**
 * Click the modal x button to trigger
 */
function handleCloseModal() {
    emit('update:showModal', false)
}
</script>

<template>
    <a-modal
        :ok-text="t('button.submit')"
        :cancel-text="t('button.cancel')"
        :visible="showModal"
        :title="operateType === 'add' ? t('title.add') : t('title.edit')"
        :rules="rules"
        display-directive="show"
        @ok="handleSubmitModal"
        @cancel="handleCancelModal"
        @close="handleCloseModal"
    >
        <a-form
            v-if="formData"
            ref="formRef"
            :model="formData"
            label-width="80"
            label-placement="left"
            label-align="left"
        >
            <a-form-item :label="t('editEngineSetting.nameInputLabel')" field="name">
                <a-input v-model="formData.name" :placeholder="t('editEngineSetting.example') + '：Baidu'"></a-input>
            </a-form-item>

            <a-form-item :label="t('editEngineSetting.urlInputLabel')" field="baseUrl">
                <a-input
                    v-model="formData.baseUrl"
                    :placeholder="t('editEngineSetting.example') + '：https://www.baidu.com/s?ie=UTF-8&wd='"
                ></a-input>
            </a-form-item>
            <a-form-item :label="t('editEngineSetting.placeholderInputLabel')" field="placeholderText">
                <a-input
                    :placeholder="t('editEngineSetting.example') + '：百度一下，你就知道'"
                    v-model="formData.placeholderText"
                ></a-input>
            </a-form-item>
            <a-form-item :label-style="{ display: 'flex', alignItems: 'center' }" field="prefix">
                <template #label>
                    <span>{{ t('editEngineSetting.prefixInputLabel') }}</span>
                    <a-popover trigger="hover" :style="{ width: '200px' }">
                        <icon-info-circle class="ml-1" />
                        <template #content>
                          <span>{{ t('popover.enginePrefix') }}</span>
                        </template>
                    </a-popover>
                </template>
                <a-input
                    :placeholder="t('placeholder.enginePrefix')"
                    v-model="formData.prefix"
                ></a-input>
            </a-form-item>
            <a-form-item :label-style="{ display: 'flex', alignItems: 'center' }" field="suffix">
                <template #label>
                    <span>{{ t('editEngineSetting.suffixInputLabel') }}</span>
                    <a-popover trigger="hover" :style="{ width: '200px' }">
                        <icon-info-circle class="ml-1" />
                        <template #content>
                            <span>{{ t('popover.engineSuffix') }}</span>
                        </template>
                    </a-popover>
                </template>
                <n-dynamic-tags v-model="formData.suffix" />
            </a-form-item>
            <a-form-item :label="t('switch.defaultTheme')" field="isDefault">
                <n-switch v-model="formData.isDefault"></n-switch>
            </a-form-item>
            <a-form-item :label="t('colorPicker.engineColorLabel')" field="color">
                <n-color-picker v-model="formData.color" :modes="['hex']"></n-color-picker>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
