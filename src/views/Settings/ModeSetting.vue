<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import Pannel from './Pannel.vue'
import { ColorPaletteOutline } from '@vicons/ionicons5'
import ColorPicker from './ColorPicker.vue'

const store = useStore()

const color: ColorItem[] = [
    {
        value: '#3051ff',
        label: '',
    },
    {
        value: '#28C46F',
        label: '',
    },
    {
        value: '#fa506e',
        label: '',
    },
    {
        value: '#ffc529',
        label: '',
    },
    {
        value: '#009688',
        label: '',
    },
]
function handleChangeColor(data) {
    const { value } = data
    store.commit(MutationType.UpdatePrimaryColor, value)
}

const themeSwitchDefaultValue = store.state.theme === 'dark'

function handleChangeTheme(value: boolean) {
    store.commit(MutationType.UpdateTheme, value ? 'dark' : 'light')
}

const disableSwitchTheme = ref(store.state.followTheme)
const followThemeSwitchDefaultValue = store.state.followTheme

function handleChangeFollowTheme(value: boolean) {
    disableSwitchTheme.value = value
    store.commit(MutationType.UpdateFollowTheme, value)
}
</script>

<template>
    <pannel title="颜色模式">
        <template #icon>
            <NIcon>
                <ColorPaletteOutline></ColorPaletteOutline>
            </NIcon>
        </template>
        <n-list bordered>
            <n-list-item>
                <div class="flex justify-between">
                    <div>深色模式</div>
                    <n-switch
                        :disabled="disableSwitchTheme"
                        :default-value="themeSwitchDefaultValue"
                        @update:value="handleChangeTheme"
                    ></n-switch>
                </div>
            </n-list-item>
            <n-list-item>
                <div class="flex justify-between">
                    <div>跟随系统</div>
                    <n-switch
                        :default-value="followThemeSwitchDefaultValue"
                        @update:value="handleChangeFollowTheme"
                    ></n-switch>
                </div>
            </n-list-item>
            <n-list-item>
                <div class="flex justify-between items-center">
                    <div>主题风格</div>
                    <ColorPicker
                        class="ml-auto"
                        :color="color"
                        @change-color="handleChangeColor"
                    ></ColorPicker>
                </div>
            </n-list-item>
        </n-list>
    </pannel>
</template>
