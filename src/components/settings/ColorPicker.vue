<template>
    <div class="cus-color-picker">
        <div class="cus-color-picker-primary"></div>
        <div
            v-for="(item, index) in color"
            :key="index"
            :style="{ background: item.value }"
            :class="{ active: index === current }"
            @click="pickerColor(index, item)"
        ></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface ColorItem {
    name: string
    value: string
    title: string
}

const color: ColorItem[] = [
    {
        name: 'primary',
        value: '#3051ff',
        title: '',
    },
    {
        name: 'success',
        value: '#07d85b',
        title: '',
    },
    {
        name: 'danger',
        value: '#fa506e',
        title: '',
    },
    {
        name: 'warning',
        value: '#ffc529',
        title: '',
    },
    {
        name: 'black',
        value: '#232323',
        title: '',
    },
]

export default defineComponent({
    name: 'ColorPicker',
    setup() {
        const current = ref(0)
        const pickerColor = (index: number, item: ColorItem): void => {
            current.value = index
        }

        return {
            current,
            color,
            pickerColor,
        }
    },
})
</script>

<style lang="scss" scoped>
.cus-color-picker {
    display: flex;
    & > div {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        &.active {
            transform: scale(1.2);
            transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        &:not(:nth-child(1)) {
            margin-left: 8px;
        }
    }
}
</style>
