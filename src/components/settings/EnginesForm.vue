<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { ActionTypes } from '../../store/actions'
import { EngineItem } from '../../data/enginesData'

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
            required: true,
        },
        engineId: {
            type: Number,
            required: false,
        },
    },
    setup(props, context) {
        const store = useStore()
        const enginesFormVisible = ref(true)
        const localEngineData = JSON.parse(
            localStorage['enginesData']
        ) as EngineItem[]
        const currentEngineData = localEngineData.filter(
            item => item.id === props.engineId
        )[0]
        const enginesFormData =
            props.engineId === 0
                ? reactive<EngineItem>({
                      id: 0,
                      name: '',
                      baseUrl: '',
                      placeholderText: '',
                      hotkeys: '',
                      color: '#4E6EF2',
                      category: 1,
                      isDefault: false,
                  })
                : reactive<EngineItem>(currentEngineData)

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
                        ElNotification({
                            type: 'success',
                            message: '添加成功',
                            position: 'top-left',
                        })
                    }
                    if (props.formTitle === '修改搜索引擎') {
                        store.dispatch(
                            ActionTypes.UpdateEngine,
                            enginesFormData
                        )
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

<template>
    <el-dialog
        custom-class="engine-form"
        :title="formTitle"
        v-model="enginesFormVisible"
        @close="handleFormClose"
    >
        <el-form
            ref="form"
            :model="enginesFormData"
            :rules="rules"
            label-position="right"
            label-width="auto"
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

<style lang="scss">
.el-dialog.engine-form {
    width: 30% !important;
    .el-dialog__header .el-dialog__title {
        color: var(--color-text-title);
    }
    .el-input .el-input__inner {
        background-color: var(--color-input-bg);
        color: var(--color-text-input);
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

@media screen and (max-width: 1024px) {
    .el-dialog.engine-form {
        width: 50% !important;
    }
}

@media screen and (max-width: 443px) {
    .el-dialog.engine-form {
        width: 95% !important;
    }
}
</style>
