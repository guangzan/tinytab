<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'
import type { EngineItem } from '@/types'
import { MutationType } from '../../store/mutations'
import ModalForm from './ModalForm.vue'
import Pannel from './Pannel.vue'
import {
    CloseSharp as Close,
    TrashBinOutline as Trash,
    Add,
} from '@vicons/ionicons5'
import { EditOutlined } from '@vicons/antd'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
const message = useMessage()
const showModal = ref(false)
const enginesData = computed(() => store.state.enginesData)
const operateType = ref<'add' | 'edit'>('add')
const engineId = ref(0)

/**
 * 点击添加按钮以添加引擎
 */
function handleAddEngine() {
    operateType.value = 'add'
    engineId.value = 0
    showModal.value = true
}

/**
 * 点击引擎名称以修改引擎
 */
function handleEditEngine(id: number): void {
    operateType.value = 'edit'
    engineId.value = id
    showModal.value = true
}

/**
 * 点击 x 以删除引擎
 */
function handleRemoveEngine(item: EngineItem): void {
    const { id, isDefault } = item
    if (isDefault) {
        message.error(t('message.noDelDefaultEngine'))
    } else {
        store.commit(MutationType.DeleteEngine, id)
        message.success(t('message.delSuccess'))
    }
}
</script>

<template>
    <pannel
        :title="t('editEngineSetting.title')"
        :desc="t('editEngineSetting.desc')"
    >
        <template #icon>
            <NIcon>
                <EditOutlined></EditOutlined>
            </NIcon>
        </template>
        <n-space>
            <n-button
                size="small"
                ghost
                :color="item.color"
                v-for="item in enginesData"
                :key="item.id"
            >
                <span @click="handleEditEngine(item.id)">{{ item.name }}</span>
                <n-popconfirm
                    iconColor="red"
                    :confirmButtonText="t('button.submit')"
                    :cancelButtonText="t('button.cancel')"
                    :positive-text="t('button.submit')"
                    :negative-text="t('button.cancel')"
                    @positive-click.stop="handleRemoveEngine(item)"
                >
                    <template #icon>
                        <n-icon color="red">
                            <trash />
                        </n-icon>
                    </template>
                    <template #trigger>
                        <n-icon size="20" class="ml-1 hover:text-red-500">
                            <close></close>
                        </n-icon>
                    </template>
                    {{ t('editEngineSetting.deleteTip') }}
                </n-popconfirm>
            </n-button>
            <n-button size="small" @click="handleAddEngine">
                <template #icon>
                    <n-icon>
                        <Add></Add>
                    </n-icon>
                </template>
            </n-button>
        </n-space>
    </pannel>
    <modal-form
        v-model:showModal="showModal"
        :operateType="operateType"
        :engineId="engineId"
    ></modal-form>
</template>
