<template>
    <i
        class="el-icon-setting icon-settins"
        @click="settinsFormVisible = true"
    ></i>
    <transition name="el-zoom-in-top">
        <div class="settings-container" v-show="settinsFormVisible">
            <i
                class="el-icon-close icon-close"
                @click="settinsFormVisible = false"
            ></i>
            <h3 class="settings-item-title">搜索引擎</h3>
            <el-row>
                <el-tag
                    v-for="item in enginesData"
                    :key="item.name"
                    closable
                    type=""
                    size="medium"
                    effect="plain"
                    :style="{ borderColor: item.color }"
                    class="engines-tag"
                    @close="handleDelEngine(item.id, item.isDefault)"
                >
                    {{ item.name }}
                </el-tag>
                <el-tag
                    class="engines-tag engine-plus"
                    size="medium"
                    type=""
                    effect="plain"
                    @click="handleEnginePlus"
                >
                    <i class="el-icon-plus"></i>
                </el-tag>
            </el-row>
        </div>
    </transition>

    <el-dialog title="提示" v-model="delEngineTipVisible" width="30%">
        <span>🤔要删除该搜索引擎吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="delEngineTipVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="handleSubmitEngineTip"
                    >确 定</el-button
                >
            </span>
        </template>
    </el-dialog>

    <EnginesForm
        v-if="editorVisible"
        @close-model="handleCancelModel"
        @submit-model="handleSubmitModel"
        @cancel-model="handleCancelModel"
    ></EnginesForm>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import EnginesForm from './EnginesForm.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    name: 'Setting',
    components: {
        EnginesForm,
    },
    setup() {
        const store = useStore()
        const enginesData = computed(() => store.state.enginesData)
        const settinsFormVisible = ref(false)
        const editorVisible = ref(false)
        const delEngineTipVisible = ref(false)
        const willDeletedEngineId = ref(Number)

        /**
         * 新增搜索引擎点击事件
         */
        function handleEnginePlus() {
            editorVisible.value = true
        }

        /**
         * 取消或者关闭提交表单
         */
        function handleCancelModel() {
            editorVisible.value = false
        }

        /**
         * 确认提交搜索引擎表单
         */
        function handleSubmitModel() {
            editorVisible.value = false
        }

        /**
         * 处理删除一个搜索引擎
         */
        function handleDelEngine(id: any, isDefault: boolean): void {
            if (isDefault) {
                ElMessage.error('不可删除默认搜索引擎')
                return
            }
            delEngineTipVisible.value = true
            willDeletedEngineId.value = id
        }

        /**
         * 删除搜索引擎提示点击确认
         */
        function handleSubmitEngineTip() {
            const id = willDeletedEngineId.value
            delEngineTipVisible.value = false
            store.commit('delEngine', id)
        }

        return {
            enginesData,
            settinsFormVisible,
            editorVisible,
            handleDelEngine,
            handleEnginePlus,
            handleSubmitModel,
            delEngineTipVisible,
            handleCancelModel,
            handleSubmitEngineTip,
        }
    },
})
</script>

<style lang="scss">
.el-icon-setting {
    position: absolute;
    top: 30px;
    right: 30px;
    color: red;
    font-size: 22px;
}

.settings-item-title {
    color: var(--color-text-primary);
}

.settings-container {
    position: absolute;
    top: 10px;
    right: 0;
    background-color: #21262d;
    padding: 20px;
    border-radius: 4px;
    width: 400px;
    .el-tag {
        background-color: var(--color-btn-bg);
        color: var(--color-btn-text);

        &:active,
        &:focus,
        &:hover {
            background-color: var(--color-btn-hover-bg);
            color: var(--color-btn-text);
        }
        .el-icon-close {
            color: var(--color-btn-text);
            &:hover {
                background-color: var(--color-btn-hover-bg);
            }
        }
    }
}

.engines-tag {
    margin-right: 8px;
}

.icon-settins,
.icon-close,
.engine-plus {
    cursor: pointer;
}

.icon-close {
    float: right;
    font-size: 20px;
    color: var(--color-text-primary);
}

.engines-form {
    margin-top: 20px;
}

.el-dialog.dialog {
    background-color: #fff;
}

.el-overlay .el-dialog {
    background-color: #fff;
}
</style>
