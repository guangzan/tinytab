<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        // location = '/'
    },
})
</script>

<style lang="scss">
.el-button,
.el-tag {
    user-select: none;
}

.el-button {
    margin-right: 10px;
    margin-bottom: 8px;
}

.el-button + .el-button {
    margin-left: 0;
}

.el-tag {
    margin-right: 8px;
    margin-bottom: 8px;
}

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

// .el-tag {
//     background-color: var(--color-btn-bg);
//     color: var(--color-btn-text);

//     &:active,
//     &:focus,
//     &:hover {
//         background-color: var(--color-btn-hover-bg);
//         color: var(--color-btn-text);
//     }
//     .el-icon-close {
//         color: var(--color-btn-text);
//         &:hover {
//             background-color: var(--color-btn-hover-bg);
//         }
//     }
// }

.el-dialog {
    background-color: #21262d;
    .el-dialog__title {
        color: var(--color-text-title);
    }
    .el-dialog__body {
        color: var(--color-text-primary);
    }
}

.el-popover.el-popper {
    background-color: #21262d;
    border-color: #e4e7ed;
    border-color: var(--color-btn-border);
    .el-popconfirm__main {
        color: var(--color-text-primary);
    }
}

.el-popper.is-light .el-popper__arrow::before {
    border-color: var(--color-btn-border);
    background: #21262d;
}

.el-color-picker__trigger {
    border: none;
}

.el-notification {
    background-color: #21262d;
    border-color: var(--color-border-priamry);
    .el-notification__title {
        color: var(--color-text-title);
    }
    .el-notification__content {
        color: var(--color-text-primary);
    }
}

.el-switch__core {
    background-color: #21262d;
    border-color: var(--color-border-primary);
}
</style>
