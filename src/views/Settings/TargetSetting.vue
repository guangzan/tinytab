<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { LinkOutline } from '@vicons/ionicons5'
import { useSettingsStore } from '@/store/settings.store'
import type { TTTarget } from '@/types'

const { t } = useI18n()
const store = useSettingsStore()

const target = ref('_self')

function updateTarget(v: TTTarget) {
  target.value = v
}

watch(
  () => store.settings.search.target,
  v => updateTarget(v),
)

onMounted(() => {
  updateTarget(store.settings.search.target)
})

type TargetList = Array<{
  value: TTTarget
  label: string
}>

const targetList = ref<TargetList>([
  {
    value: '_blank',
    label: '在新标签页打开',
  },
  {
    value: '_self',
    label: '在当前标签页打开',
  },
])

function handleUpdateTarget(v: TTTarget) {
  store.UpdateSearch('target', v)
}
</script>

<template>
  <pannel :title="t('targetSetting.title')">
    <template #icon>
      <NIcon>
        <LinkOutline />
      </NIcon>
    </template>
    <div>
      <n-radio-group :value="target" @update:value="handleUpdateTarget">
        <n-radio-button
          v-for="target in targetList"
          :key="target.value"
          :value="target.value"
        >
          {{ target.label }}
        </n-radio-button>
      </n-radio-group>
    </div>
  </pannel>
</template>
