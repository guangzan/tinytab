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
                <el-button
                    size="mini"
                    :style="{ borderColor: item.color }"
                    v-for="(item, index) in enginesData"
                    :key="index"
                    @click="handleEditEngine(item)"
                >
                    {{ item.name }}
                    <el-popconfirm
                        confirmButtonText="好的"
                        cancelButtonText="不用了"
                        icon="el-icon-info"
                        iconColor="red"
                        title="要删除该搜索引擎吗？"
                        @confirm="handleDelEngine(item)"
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
                    @click="handleEnginePlus"
                ></el-button>
            </el-row>
        </div>
    </transition>

    <EnginesForm
        v-if="editorVisible"
        :enginesData="editedEngineData"
        :formTitle="engineFormTitle"
        @close-model="handleCancelModel"
        @submit-model="handleSubmitModel"
        @cancel-model="handleCancelModel"
    ></EnginesForm>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { MutationType } from '@/store/mutations'
import EnginesForm from './EnginesForm.vue'
import { ElMessage } from 'element-plus'
import { EngineItem } from '@/data/enginesData'

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
        let editedEngineData = ref({})

        /**
         * Edit engine data.
         * @param engineData {EngineItem}
         */
        function handleEditEngine(engineData: any): void {
            editorVisible.value = true
            engineFormTitle.value = '修改搜索引擎'
            editedEngineData.value = engineData
        }

        /**
         * 新增搜索引擎点击事件
         */
        function handleEnginePlus() {
            editorVisible.value = true
            engineFormTitle.value = '新增搜索引擎'
            editedEngineData.value = {
                name: '',
                baseUrl: '',
                placeholderText: '',
                hotkeys: '',
                color: '#4E6EF2',
                category: 1,
                isDefault: false,
            }
        }

        /**
         * 取消或者关闭提交表单
         */
        function handleCancelModel() {
            editorVisible.value = false
        }
        /**
         * 取消或者关闭提交表单
         */
        function handleCloseModel() {
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
        function handleDelEngine(item: EngineItem): void {
            console.log(123)

            const { id, isDefault } = item
            if (isDefault) {
                ElMessage.error('不可以删除默认搜索引擎哦~')
                return
            }
            store.commit(MutationType.DeleteEngine, id)
        }

        return {
            engineFormTitle,
            enginesData,
            editedEngineData,
            settinsFormVisible,
            editorVisible,
            handleDelEngine,
            handleEnginePlus,
            handleSubmitModel,
            handleCancelModel,
            handleEditEngine,
            handleCloseModel,
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
    .el-button {
        padding-left: 10px;
        padding-right: 10px;
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
</style>
