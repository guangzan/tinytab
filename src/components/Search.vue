<template>
    <div class="search-container">
        <el-input
            :placeholder="placeholder"
            v-model="searchValue"
            class="search-component"
            @keyup.enter="handleSubmit"
            prefix-icon="el-icon-search"
            clearable
            @focus="handleFocusInput"
            @blur="handleBlurInput"
            size="medium"
        >
        </el-input>
        <Engines @change-engine="handleEngineChange"></Engines>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Engines from '../components/Engines.vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { EngineItem } from '../data/enginesData'
import { hexToRgba } from '../utils/tools'

export default defineComponent({
    components: {
        Engines,
    },
    setup() {
        const store = useStore()
        const enginesData = store.state.enginesData
        const defaultEngineData: EngineItem = store.state.defaultEngineData
        const searchValue = ref('')
        const searchEngine = ref('')
        const placeholder = ref(defaultEngineData.placeholderText)
        const searchBaseUrl = ref(defaultEngineData.baseUrl)
        const inputBorderColor = ref(defaultEngineData.color)

        function handleEngineChange(engine: string): void {
            searchEngine.value = engine
            for (const item of enginesData) {
                if (item.name === engine) {
                    searchBaseUrl.value = item.baseUrl
                    placeholder.value = item.placeholderText
                    inputBorderColor.value = item.color
                    return
                }
            }
        }

        function handleSubmit(): void {
            if (!searchValue.value.length) {
                ElMessage.warning('请输入内容')
                return
            }
            window.open(`${searchBaseUrl.value}${searchValue.value}`)
        }

        function handleFocusInput(e: any) {
            e.target.style.borderColor = inputBorderColor.value
            const color = hexToRgba(inputBorderColor.value, 0.3)
            e.target.style.boxShadow = `0 0 0 3px ${color}`
        }

        function handleBlurInput(e: any) {
            e.target.style.borderColor = ''
            e.target.style.boxShadow = ''
        }

        onMounted(() => {
            setTimeout(() => {
                const input = document.querySelector(
                    '.search-component input'
                ) as HTMLElement
                input.focus()
            }, 300)
        })

        return {
            searchValue,
            searchEngine,
            handleSubmit,
            handleEngineChange,
            placeholder,
            inputBorderColor,
            handleFocusInput,
            handleBlurInput,
        }
    },
})
</script>

<style lang="scss">
.search-container {
    width: 30vw;
    margin: 20vh auto 0;
}

.search-component {
    input {
        background-color: #161b22;
        color: var(--color-input);
        &::placeholder {
            color: var(--color-placeholder);
        }
    }
}

@media screen and (max-width: 1024px) {
    .search-container {
        width: 90%;
    }
}
</style>
