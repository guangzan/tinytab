<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from './store/actions'

export default defineComponent({
    setup() {
        const store = useStore()
        store.dispatch(ActionTypes.InitTheme)

        watch(
            () => store.getters.getTheme,
            newTheme => {
                const html = document.querySelector('html') as HTMLElement
                html.setAttribute('theme', newTheme)
            }
        )
    },
})
</script>

<template>
    <router-view />
</template>

<style lang="scss">
.el-button + .el-button {
    margin-left: 0 !important;
}
.el-button {
    margin-top: 8px !important;
    margin-right: 10px !important;
}
</style>
