<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from '../../store/actions'
import Pannel from './Pannel.vue'

const store = useStore()
const switchDefaultValue = store.state.theme === 'dark'

function handleModeChange() {
    store.dispatch(ActionTypes.ToggleTheme)
}
</script>

<template>
    <pannel title="颜色模式">
        <n-space>
            <div>深色模式</div>
            <n-switch
                :default-value="switchDefaultValue"
                @update:value="handleModeChange"
            ></n-switch>
        </n-space>
    </pannel>
</template>
