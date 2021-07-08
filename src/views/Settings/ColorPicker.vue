<script lang="ts" setup>
import { ref, defineProps } from 'vue'

interface IColorItem {
    label?: string
    value: string
}

defineProps<{
    color: IColorItem[]
}>()

const emit = defineEmits<{
    (event: 'change-color', colorItem: IColorItem): void
}>()

function pickerColor(colorItem: IColorItem): void {
    emit('change-color', colorItem)
}
</script>

<template>
    <div class="flex">
        <div
            class="w-8 h-8 rounded ml-2 cursor-pointer"
            v-for="(item, index) in color"
            :key="index"
            :style="{ background: item.value }"
            @click="pickerColor(item)"
        ></div>
    </div>
</template>
