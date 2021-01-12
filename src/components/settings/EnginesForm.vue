<template>
    <el-dialog
        custom-class="dialog"
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
                    placeholder="Baidu"
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
            context.emit('submit-model')
            if (props.formTitle === '新增搜索引擎') {
                store.commit('addEngine', enginesFormData)
            }
            if (props.formTitle === '修改搜索引擎') {
                store.commit('updateEngine', enginesFormData)
            }
        }

        return {
            enginesFormVisible,
            enginesFormData,
            handleFormCancel,
            handleFormSubmit,
            rules,
            handleFormClose,
        }
    },
})
</script>
