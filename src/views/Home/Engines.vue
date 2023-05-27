<script lang="ts" setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings.store'

const emit = defineEmits<{
  (event: 'change-engine', searchEngine: number): void
}>()

defineOptions({
  name: 'HomeEnginesList',
})

const store = useSettingsStore()
const enginesData = computed(() => store.enginesData)

function handleChooseSearchEngine(id: number): void {
  emit('change-engine', id)
}
</script>

<template>
  <div>
    <n-space>
      <n-button
        v-for="(item, index) in enginesData"
        :key="index"
        :color="item.color"
        ghost
        size="small"
        @click="handleChooseSearchEngine(item.id)"
      >
        {{ item.name }}
      </n-button>
    </n-space>
  </div>
</template>
