<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {},
})
</script>

<style lang="scss">
.el-button.el-button--default {
    background-color: var(--color-btn-bg);
    color: var(--color-btn-text);
    border-color: var(--color-btn-border);
    &:active,
    &:focus,
    &:hover {
        background-color: var(--color-btn-hover-bg);
        color: var(--color-btn-text);
    }
}
</style>
