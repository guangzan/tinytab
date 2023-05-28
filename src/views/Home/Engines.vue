<script lang="ts" setup>
import { useSettingsStore } from '@/store/settings.store'

const emit = defineEmits<{
  (event: 'changeEngine', searchEngine: number): void
}>()

defineOptions({
  name: 'HomeEnginesList',
})

const store = useSettingsStore()

function handleChooseSearchEngine(id: number): void {
  emit('changeEngine', id)
}
</script>

<template>
  <div>
    <n-space>
      <n-button
        v-for="(item, index) in store.settings.engines"
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
