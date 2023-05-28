<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Pannel from '../../components/Pannel.vue'
import { useSettingsStore } from '@/store/settings.store'
import type { TTVisibleElements } from '@/types'

const { t } = useI18n()
const store = useSettingsStore()
const homeEngineSwitchDefaultValue = ref(store.GetVisible('homeEngines'))
const homeSettingButtonSwitchDefaultValue = ref(store.GetVisible('homeSettingButton'))
const homeLangButtonSwitchDefaultValue = ref(store.GetVisible('homeLangButton'))
const homeModeButtonSwitchDefaultValue = ref(store.GetVisible('HOME_MODE_BUTTON'))

function handleChangeItemVisible(item: TTVisibleElements): void {
  store.ToggleVisible(item)
}
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
          <div>{{ t('visibilitySetting.homeSettingButton') }}</div>
          <ASwitch
            v-model="homeSettingButtonSwitchDefaultValue"
            @update:model-value="handleChangeItemVisible('homeSettingButton')"
          />
        </div>
      </a-list-item>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeEngines') }}</div>
          <ASwitch
            v-model="homeEngineSwitchDefaultValue"
            @update:model-value="handleChangeItemVisible('homeEngines')"
          />
        </div>
      </a-list-item>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeLangButton') }}</div>
          <ASwitch
            v-model="homeLangButtonSwitchDefaultValue"
            @update:model-value="handleChangeItemVisible('homeLangButton')"
          />
        </div>
      </a-list-item>
      <a-list-item>
        <div class="flex justify-between">
          <div>{{ t('visibilitySetting.homeModeButton') }}</div>
          <ASwitch
            v-model="homeModeButtonSwitchDefaultValue"
            @update:model-value="handleChangeItemVisible('HOME_MODE_BUTTON')"
          />
        </div>
      </a-list-item>
    </a-list>
  </Pannel>
</template>
