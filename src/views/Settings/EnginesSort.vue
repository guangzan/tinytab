<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '@/store/settings.store'
import draggable from 'vuedraggable'
import { MenuOutline as move, InformationCircleOutline as Info } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

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
    <n-card :bordered="false">
        <n-collapse>
            <n-collapse-item>
                <template #header>
                    <span>{{ t('sortEngineSetting.title') }}</span>
                    <n-popover trigger="hover" :style="{ width: '200px' }">
                        <template #trigger>
                            <n-icon class="ml-1 text-gray-400" size="16">
                                <Info></Info>
                            </n-icon>
                        </template>
                        <span>{{ t('sortEngineSetting.desc') }}</span>
                    </n-popover>
                </template>
                <n-list class="my-0 min-w-full">
                    <draggable
                        :componentData="{
                            tag: 'div',
                            type: 'transition-group',
                            name: !drag ? 'flip-list' : null,
                        }"
                        v-model="engineList"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                        item-key="id"
                    >
                        <template #item="{ element }">
                            <n-list-item class="!py-2 cursor-move">
                                <n-button text :color="element.color">
                                    {{ element.name }}
                                </n-button>

                                <template #suffix>
                                    <n-icon size="20" class="ml-1" :color="element.color">
                                        <move></move>
                                    </n-icon>
                                </template>
                            </n-list-item>
                        </template>
                    </draggable>
                </n-list>
            </n-collapse-item>
        </n-collapse>
    </n-card>
</template>
