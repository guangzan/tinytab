<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import draggable from 'vuedraggable'
import Pannel from './Pannel.vue'
import { MenuOutline as move } from '@vicons/ionicons5'

const store = useStore()
const drag = ref(false)

const engineList = computed({
    get() {
        return store.state.enginesData
    },
    set(value) {
        store.commit(MutationType.UpdateEnginesData, value)
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
    <Pannel title="排序" desc="上下拖动右侧按钮以排序">
        <n-list class="my-0 min-w-full">
            <draggable
                tag="transition-group"
                :component-data="{
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
                            <n-icon size="20" class="ml-1">
                                <move></move>
                            </n-icon>
                        </template>
                    </n-list-item>
                </template>
            </draggable>
        </n-list>
    </Pannel>
</template>
