<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { EyeOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import Pannel from '../../components/Pannel.vue'
import { useSettingsStore } from '@/store/settings.store'
import type { VisibleList } from '@/types'

const { t } = useI18n()
const store = useSettingsStore()
const homeEngineSwitchDefaultValue = ref(false)
const homeSettingButtonSwitchDefaultValue = ref(false)
const homeLangButtonSwitchDefaultValue = ref(false)

function handleChangeItemVisible(item: string): void {
  store.ToggleVisible(item)
}

function changeVisibility(v: VisibleList) {
  homeEngineSwitchDefaultValue.value = v.includes('homeEngines')
  homeSettingButtonSwitchDefaultValue.value = v.includes('homeSettingButton')
  homeLangButtonSwitchDefaultValue.value = v.includes('homeLangButton')
}

watch(
  () => store.visibleList,
  v => changeVisibility(v),
)

onMounted(() => changeVisibility(store.visibleList))
</script>

<template>
  <Pannel
    :title="t('visibilitySetting.title')"
    :desc="t('visibilitySetting.desc')"
  >
    <template #icon>
      <NIcon>
        <EyeOutline />
      </NIcon>
    </template>
    <n-list bordered>
      <n-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeEngines') }}</div>
          <n-switch
            v-model:value="homeEngineSwitchDefaultValue"
            @update:value="handleChangeItemVisible('homeEngines')"
          />
        </div>
      </n-list-item>
      <n-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeSettingButton') }}</div>
          <n-switch
            v-model:value="homeSettingButtonSwitchDefaultValue"
            @update:value="
              handleChangeItemVisible('homeSettingButton')
            "
          />
        </div>
      </n-list-item>
      <n-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeLangButton') }}</div>
          <n-switch
            v-model:value="homeLangButtonSwitchDefaultValue"
            @update:value="
              handleChangeItemVisible('homeLangButton')
            "
          />
        </div>
      </n-list-item>
    </n-list>
  </Pannel>
</template>
