<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
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
      <icon-eye />
    </template>
    <a-list bordered>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeEngines') }}</div>
          <a-switch
            v-model:value="homeEngineSwitchDefaultValue"
            @update:value="handleChangeItemVisible('homeEngines')"
          />
        </div>
      </a-list-item>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeSettingButton') }}</div>
          <a-switch
            v-model:value="homeSettingButtonSwitchDefaultValue"
            @update:value="
              handleChangeItemVisible('homeSettingButton')
            "
          />
        </div>
      </a-list-item>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeLangButton') }}</div>
          <a-switch
            v-model:value="homeLangButtonSwitchDefaultValue"
            @update:value="
              handleChangeItemVisible('homeLangButton')
            "
          />
        </div>
      </a-list-item>
    </a-list>
  </Pannel>
</template>
