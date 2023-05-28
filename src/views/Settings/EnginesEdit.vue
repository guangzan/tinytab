<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NSpace, useMessage } from 'naive-ui'
import { Add, CloseSharp as Close, TrashBinOutline as Trash } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import Pannel from '../../components/Pannel.vue'
import ModalForm from './ModalForm.vue'
import type { EngineItem } from '@/types'
import { useSettingsStore } from '@/store/settings.store'

const { t } = useI18n()
const store = useSettingsStore()
const message = useMessage()
const showModal = ref(false)
const enginesData = computed(() => store.settings.enginesData)
const operateType = ref<'add' | 'edit'>('add')
const engineId = ref(0)

/**
 * Click the Add button to add an engine
 */
function handleAddEngine() {
  operateType.value = 'add'
  engineId.value = 0
  showModal.value = true
}

/**
 * Click on the engine name to modify the engine
 */
function handleEditEngine(id: number): void {
  operateType.value = 'edit'
  engineId.value = id
  showModal.value = true
}

/**
 * Click x to delete the engine
 */
function handleRemoveEngine(item: EngineItem): void {
  const { id, isDefault } = item
  if (isDefault) {
    message.error(t('message.noDelDefaultEngine'))
  }
  else {
    store.DeleteEngine(id)
    message.success(t('message.delSuccess'))
  }
}
</script>

<template>
  <Pannel :title="t('editEngineSetting.title')" :desc="t('editEngineSetting.desc')">
    <template #icon>
      <icon-edit />
    </template>
    <NSpace>
      <n-button
        v-for="item in enginesData"
        :key="item.id"
        size="small"
        ghost
        :color="item.color"
      >
        <span @click="handleEditEngine(item.id)">{{ item.name }}</span>
        <n-popconfirm
          icon-color="red"
          :confirm-button-text="t('button.submit')"
          :cancel-button-text="t('button.cancel')"
          :positive-text="t('button.submit')"
          :negative-text="t('button.cancel')"
          @positive-click.stop="handleRemoveEngine(item)"
        >
          <template #icon>
            <n-icon color="red">
              <Trash />
            </n-icon>
          </template>
          <template #trigger>
            <n-icon size="20" class="ml-1 hover:text-red-500">
              <Close />
            </n-icon>
          </template>
          {{ t('editEngineSetting.deleteTip') }}
        </n-popconfirm>
      </n-button>
      <n-button size="small" @click="handleAddEngine">
        <template #icon>
          <n-icon>
            <Add />
          </n-icon>
        </template>
      </n-button>
    </NSpace>
  </Pannel>
  <ModalForm
    v-model:showModal="showModal"
    :operate-type="operateType"
    :engine-id="engineId"
  />
</template>
