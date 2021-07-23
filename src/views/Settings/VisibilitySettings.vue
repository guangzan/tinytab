<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import Pannel from '../../components/Pannel.vue'
import { EyeOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import type { VisibleList } from '@/types'

const { t } = useI18n()
const store = useStore()
const homeEngineSwitchDefaultValue = ref(false)
const homeSettingButtonSwitchDefaultValue = ref(false)
const homeLangButtonSwitchDefaultValue = ref(false)

function handleChangeItemVisible(item: string): void {
    store.commit(MutationType.ToggleVisible, item)
}

function changeVisibility(v: VisibleList) {
    homeEngineSwitchDefaultValue.value = v.includes('homeEngines')
    homeSettingButtonSwitchDefaultValue.value = v.includes('homeSettingButton')
    homeLangButtonSwitchDefaultValue.value = v.includes('homeLangButton')
}

watch(
    () => store.getters.GetVisibleList,
    (v) => changeVisibility(v)
)

onMounted(() => changeVisibility(store.getters.GetVisibleList))
</script>

<template>
    <pannel
        :title="t('visibilitySetting.title')"
        :desc="t('visibilitySetting.desc')"
    >
        <template #icon>
            <NIcon>
                <EyeOutline></EyeOutline>
            </NIcon>
        </template>
        <n-list bordered>
            <n-list-item>
                <div class="flex justify-between">
                    <div>{{ t('visibilitySetting.homeEngines') }}</div>
                    <n-switch
                        v-model:value="homeEngineSwitchDefaultValue"
                        @update:value="handleChangeItemVisible('homeEngines')"
                    ></n-switch>
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
                    ></n-switch>
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
                    ></n-switch>
                </div>
            </n-list-item>
        </n-list>
    </pannel>
</template>
