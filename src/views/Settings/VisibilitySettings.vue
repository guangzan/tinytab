<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import Pannel from './Pannel.vue'
import { EyeOutline } from '@vicons/ionicons5'

const store = useStore()
const homeEngineSwitchDefaultValue =
    store.getters.GetVisibleList.includes('homeEngines')
const homeSettingButtonSwitchDefaultValue =
    store.getters.GetVisibleList.includes('homeSettingButton')

function handleChangeItemVisible(item: string): void {
    store.commit(MutationType.ToggleVisible, item)
}
</script>

<template>
    <pannel title="显示和隐藏" desc="你可以在这里设置一些元素的可见性">
        <template #icon>
            <NIcon>
                <EyeOutline></EyeOutline>
            </NIcon>
        </template>
        <n-list bordered>
            <n-list-item>
                <div class="flex justify-between">
                    <div>首页搜索引擎按钮</div>
                    <n-switch
                        :default-value="homeEngineSwitchDefaultValue"
                        @update:value="handleChangeItemVisible('homeEngines')"
                    ></n-switch>
                </div>
            </n-list-item>
            <n-list-item>
                <div class="flex justify-between">
                    <div>首页右上角设置按钮</div>
                    <n-switch
                        :default-value="homeSettingButtonSwitchDefaultValue"
                        @update:value="
                            handleChangeItemVisible('homeSettingButton')
                        "
                    ></n-switch>
                </div>
            </n-list-item>
        </n-list>
    </pannel>
</template>
