<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import EnginesForm from './EnginesForm.vue'
import { ElNotification } from 'element-plus'
import { MutationType } from '../../store/mutations'
import { EngineItem } from '../../data/enginesData'
import { ActionTypes } from '../../store/actions'

export default defineComponent({
    name: 'Setting',
    components: {
        EnginesForm,
    },
    setup() {
        const store = useStore()
        const enginesData = reactive(store.state.enginesData)
        const settinsFormVisible = ref(false)
        const editorVisible = ref(false)
        const engineFormTitle = ref('')
        const darkMode = ref(false)
        let editedEngineData = ref({})
        let editedEngineId = ref(0)

        const handleEngineEdit = (engineData: EngineItem): void => {
            editorVisible.value = true
            engineFormTitle.value = '修改搜索引擎'
            editedEngineData.value = engineData
            editedEngineId.value = engineData.id
        }

        const handleEngineAdd = () => {
            editorVisible.value = true
            engineFormTitle.value = '新增搜索引擎'
            editedEngineId.value = 0
        }

        const handleEngineDel = (item: EngineItem): void => {
            const { id, isDefault } = item
            if (isDefault) {
                ElNotification({
                    type: 'error',
                    message: '不可以删除默认搜索引擎',
                    position: 'top-left',
                })
                return
            }
            store.commit(MutationType.DeleteEngine, id)
        }

        const handleCancelModel = () => {
            editorVisible.value = false
        }

        const handleCloseModel = () => {
            editorVisible.value = false
        }

        const handleSubmitModel = () => {
            editorVisible.value = false
        }

        const modeChange = () => {
            store.dispatch(ActionTypes.ToggleTheme)
        }

        return {
            engineFormTitle,
            enginesData,
            editedEngineData,
            settinsFormVisible,
            editorVisible,
            editedEngineId,
            darkMode,
            handleEngineDel,
            handleEngineAdd,
            handleSubmitModel,
            handleCancelModel,
            handleEngineEdit,
            handleCloseModel,
            modeChange,
        }
    },
})
</script>

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
            <el-row justify="space-between">
                <el-button
                    size="mini"
                    :style="{ borderColor: item.color }"
                    v-for="(item, index) in enginesData"
                    :key="index"
                    @click="handleEngineEdit(item)"
                >
                    {{ item.name }}
                    <el-popconfirm
                        confirmButtonText="确认"
                        cancelButtonText="取消"
                        icon="el-icon-info"
                        iconColor="red"
                        title="要删除该搜索引擎吗？"
                        @confirm="handleEngineDel(item)"
                    >
                        <template #reference>
                            <i
                                class="el-icon-close el-icon--right icon-del-engine"
                            ></i>
                        </template>
                    </el-popconfirm>
                </el-button>
                <el-button
                    class="engines-tag engine-plus"
                    size="mini"
                    icon="el-icon-plus"
                    @click="handleEngineAdd"
                ></el-button>
            </el-row>
            <h3 class="settings-item-title">颜色模式</h3>
            <el-col>
                <el-row class="settings-item-dark">
                    <div>深色模式</div>
                    <el-switch v-model="darkMode" @change="modeChange">
                    </el-switch>
                </el-row>
            </el-col>
        </div>
    </transition>

    <EnginesForm
        v-if="editorVisible"
        :engineId="editedEngineId"
        :formTitle="engineFormTitle"
        @close-model="handleCancelModel"
        @submit-model="handleSubmitModel"
        @cancel-model="handleCancelModel"
    ></EnginesForm>
</template>

<style lang="scss">
.el-icon-setting {
    position: absolute;
    top: 30px;
    right: 30px;
    color: red;
    font-size: 22px;
}

.settings-item-title {
    font-size: 12px;
    color: var(--color-text-secondary);
    font-weight: normal;
    user-select: none;
}

.settings-container {
    position: absolute;
    top: 10px;
    right: 0;
    background-color: #f8f8f8;
    filter: drop-shadow(0px 12px 6px rgba(0, 0, 0, 0.2));
    background-color: var(--color-settings-container-bg);
    padding: 20px;
    border-radius: 4px;
    width: 400px;
    z-index: 1;
    .el-button {
        padding-left: 10px;
        padding-right: 10px;
    }

    .settings-item-dark {
        & > div {
            margin-right: 8px;
            color: var(--color-text-primary);
        }
    }
}
.engines-tag {
    margin-right: 8px;
}

.icon-settins,
.icon-close {
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

.icon-del-engine {
    &:hover {
        color: #f00;
    }
}
@media screen and (max-width: 768px) {
    .settings-container {
        width: 88vw;
    }
}
</style>
