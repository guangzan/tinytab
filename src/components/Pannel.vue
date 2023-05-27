<script lang="ts" setup>
defineProps<{
  title: string
  desc?: string
}>()

defineOptions({
  name: 'SettingsGroupItem',
})
</script>

<template>
  <a-card :bordered="false" :header-style="{ borderBottom: 'none' }">
    <template #title>
      <div class="flex items-center">
        <slot name="icon" />
        <span class="ml-2 text-sm">{{ title }}</span>
        <a-popover v-if="desc?.length" trigger="hover" :style="{ width: '200px' }">
          <icon-info-circle />
          <template #content>
            <span v-if="desc">{{ desc }}</span>
          </template>
        </a-popover>
      </div>
    </template>
    <slot />
  </a-card>
</template>
