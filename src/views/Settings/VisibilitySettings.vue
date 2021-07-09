<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import Pannel from './Pannel.vue'
import { EyeOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
const homeEngineSwitchDefaultValue = ref(false)
const homeSettingButtonSwitchDefaultValue = ref(false)
const homeLangButtonSwitchDefaultValue = ref(false)

function changeHomeEngineSwitchDefaultValue(v: boolean): void {
    homeEngineSwitchDefaultValue.value = v
}

function changeHomeSettingButtonSwitchDefaultValue(v: boolean): void {
    homeSettingButtonSwitchDefaultValue.value = v
}
function changehomeLangButtonSwitchDefaultValue(v: boolean): void {
    homeSettingButtonSwitchDefaultValue.value = v
}

function handleChangeItemVisible(item: string): void {
    store.commit(MutationType.ToggleVisible, item)
}

watch(
    () => store.getters.GetVisibleList,
    (v: any) => {
        v.includes('homeEngines')
            ? changeHomeEngineSwitchDefaultValue(true)
            : changeHomeEngineSwitchDefaultValue(false)

        v.includes('homeSettingButton')
            ? changeHomeSettingButtonSwitchDefaultValue(true)
            : changeHomeSettingButtonSwitchDefaultValue(false)

        v.includes('homeLangButton')
            ? changehomeLangButtonSwitchDefaultValue(true)
            : changehomeLangButtonSwitchDefaultValue(false)
    }
)

onMounted(() => {
    changeHomeEngineSwitchDefaultValue(
        store.getters.GetVisibleList.includes('homeEngines')
    )
    changeHomeSettingButtonSwitchDefaultValue(
        store.getters.GetVisibleList.includes('homeSettingButton')
    )
    changehomeLangButtonSwitchDefaultValue(
        store.getters.GetVisibleList.includes('homeLangButton')
    )
})
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
