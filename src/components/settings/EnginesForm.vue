<template>
    <el-dialog
        custom-class="dialog"
        title="新增搜索引擎"
        width="30%"
        v-model="enginesFormVisible"
        @close="handleFormCancel"
    >
        <el-form
            ref="form"
            :model="engines"
            :rules="rules"
            label-position="right"
            label-width="80px"
            class="engines-form"
        >
            <el-form-item label="引擎名称" prop="name">
                <el-input
                    size="small"
                    placeholder="Baidu"
                    v-model="engines.name"
                ></el-input>
            </el-form-item>
            <el-form-item label="基础路径" prop="baseUrl">
                <el-input
                    size="small"
                    placeholder="例如：https://www.baidu.com/s?ie=UTF-8&wd="
                    v-model="engines.baseUrl"
                ></el-input>
            </el-form-item>
            <el-form-item label="提示文本">
                <el-input
                    size="small"
                    placeholder="例如：百度一下，你就知道"
                    v-model="engines.placeholderText"
                ></el-input>
            </el-form-item>
            <el-form-item label="设为默认">
                <el-switch v-model="engines.isDefault"></el-switch>
            </el-form-item>
            <el-form-item label="显示颜色">
                <el-color-picker v-model="engines.color"></el-color-picker>
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
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { EngineItem } from '@/data/enginesData'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'EnginesForm',
    emits: {
        'submit-model': null,
        'cancel-model': null,
    },
    setup(props, context) {
        const store = useStore()
        const enginesFormVisible = ref(true)
        const engines = reactive({
            name: '',
            baseUrl: '',
            placeholderText: '',
            hotkeys: '',
            color: '#4E6EF2',
            category: 1,
            isDefault: false,
        }) as EngineItem

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

        function handleFormSubmit() {
            context.emit('submit-model')
            store.commit('addEngine', engines)
        }

        onMounted(() => {})

        return {
            enginesFormVisible,
            engines,
            handleFormCancel,
            handleFormSubmit,
            rules,
        }
    },
})
</script>
