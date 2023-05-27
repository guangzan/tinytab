<script lang="ts" setup>
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { InformationCircleOutline as Info, MenuOutline as move } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/store/settings.store'

const { t } = useI18n()
const store = useSettingsStore()
const drag = ref(false)

const engineList = computed({
  get() {
    return store.enginesData
  },
  set(value) {
    store.UpdateEnginesData(value)
  },
})

const dragOptions = computed(() => ({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}))
</script>

<template>
  <a-card :bordered="false">
    <n-collapse>
      <n-collapse-item>
        <template #header>
          <span>{{ t('sortEngineSetting.title') }}</span>
          <n-popover trigger="hover" :style="{ width: '200px' }">
            <template #trigger>
              <n-icon class="ml-1 text-gray-400" size="16">
                <Info />
              </n-icon>
            </template>
            <span>{{ t('sortEngineSetting.desc') }}</span>
          </n-popover>
        </template>
        <n-list class="my-0 min-w-full">
          <draggable
            v-model="engineList"
            :component-data="{
              tag: 'div',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null,
            }"
            v-bind="dragOptions"
            item-key="id"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element }">
              <n-list-item class="!py-2 cursor-move">
                <n-button text :color="element.color">
                  {{ element.name }}
                </n-button>

                <template #suffix>
                  <n-icon size="20" class="ml-1" :color="element.color">
                    <move />
                  </n-icon>
                </template>
              </n-list-item>
            </template>
          </draggable>
        </n-list>
      </n-collapse-item>
    </n-collapse>
  </a-card>
</template>
