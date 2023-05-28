<script lang="ts" setup>
interface IColorItem {
  label?: string
  value: string
}

defineProps<{
  color: IColorItem[]
}>()

const emit = defineEmits<{
  (event: 'changeColor', colorItem: IColorItem): void
}>()

/**
 * picker color
 */
function pickerColor(colorItem: IColorItem): void {
  emit('changeColor', colorItem)
}
</script>

<template>
  <div class="flex">
    <div
      v-for="(item, index) in color"
      :key="index"
      class="w-8 h-8 rounded ml-2 cursor-pointer"
      :style="{ background: item.value }"
      @click="pickerColor(item)"
    />
  </div>
</template>
