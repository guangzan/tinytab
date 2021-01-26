<template>
    <el-dialog
        custom-class="engine-form"
        :title="formTitle"
        width="30%"
        v-model="enginesFormVisible"
        @close="handleFormClose"
    >
        <el-form
            ref="form"
            :model="enginesFormData"
            :rules="rules"
            label-position="right"
            label-width="80px"
            class="engines-form"
        >
            <el-form-item label="引擎名称" prop="name">
                <el-input
                    size="small"
                    placeholder="例如：Baidu"
                    v-model="enginesFormData.name"
                ></el-input>
            </el-form-item>
            <el-form-item label="基础路径" prop="baseUrl">
                <el-input
                    size="small"
                    placeholder="例如：https://www.baidu.com/s?ie=UTF-8&wd="
                    v-model="enginesFormData.baseUrl"
                ></el-input>
            </el-form-item>
            <el-form-item label="提示文本">
                <el-input
                    size="small"
                    placeholder="例如：百度一下，你就知道"
                    v-model="enginesFormData.placeholderText"
                ></el-input>
            </el-form-item>
            <el-form-item label="设为默认">
                <el-switch v-model="enginesFormData.isDefault"></el-switch>
            </el-form-item>
            <el-form-item label="显示颜色">
                <el-color-picker
                    v-model="enginesFormData.color"
                ></el-color-picker>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleFormCancel">取 消</el-button>
                <el-button type="primary" @click="handleFormSubmit"
                    >确 定</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElNotification, ElMessage } from 'element-plus'
import { ActionTypes } from '@/store/actions'

export default defineComponent({
    name: 'EnginesForm',
    emits: {
        'submit-model': null,
        'cancel-model': null,
        'close-model': null,
    },
    props: {
        formTitle: {
            type: String,
            required: false,
        },
        enginesData: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {
        const store = useStore()
        const enginesFormVisible = ref(true)
        const enginesFormData = reactive(props.enginesData)
        const form = ref()
        const rules = reactive({
            name: [
                {
                    required: true,
                    message: '请输入搜索引擎名称',
                    trigger: 'blur',
                },
                {
                    min: 1,
                    max: 20,
                    message: '长度在 1 到 20 个字符',
                    trigger: 'blur',
                },
            ],
            baseUrl: [
                {
                    required: true,
                    message: '请输入搜索路径前缀',
                    trigger: 'blur',
                },
            ],
        })

        function handleFormCancel() {
            context.emit('cancel-model')
        }

        function handleFormClose() {
            context.emit('close-model')
        }

        function handleFormSubmit() {
            form.value.validate((valid: boolean) => {
                if (valid) {
                    context.emit('submit-model')
                    if (props.formTitle === '新增搜索引擎') {
                        enginesFormData.id = new Date().getTime()
                        store.dispatch(
                            ActionTypes.CreateEngine,
                            enginesFormData
                        )
                        ElMessage.success('添加成功😎')
                    }
                    if (props.formTitle === '修改搜索引擎') {
                        store.dispatch(
                            ActionTypes.UpdateEngine,
                            enginesFormData
                        )
                        ElMessage.success('修改成功😎')
                    }
                } else {
                    ElNotification({
                        type: 'error',
                        title: '验证失败',
                        message: '请仔细检查填写的内容哦~',
                        position: 'top-left',
                    })
                }
            })
        }

        return {
            enginesFormVisible,
            enginesFormData,
            handleFormCancel,
            handleFormSubmit,
            rules,
            handleFormClose,
            form,
        }
    },
})
</script>

<style lang="scss">
.el-dialog.engine-form {
    background-color: #21262d;
    .el-dialog__header .el-dialog__title {
        color: var(--color-text-title);
    }
    .el-input .el-input__inner {
        background-color: #0d1117;
        color: var(--color-input);
        &::placeholder {
            color: var(--color-placeholder);
        }
    }
    .el-form-item__label {
        color: var(--color-text-primary);
    }
    .el-dialog__body {
        padding: 0 30px;
    }
}
</style>
