<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Engines from '../components/Engines.vue'
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

<template>
    <div class="search-container">
        <el-input
            :placeholder="placeholder"
            v-model="searchValue"
            class="search-component"
            prefix-icon="el-icon-search"
            clearable
            size="medium"
            @keyup.enter="handleSubmit"
            @focus="handleFocusInput"
            @blur="handleBlurInput"
        >
        </el-input>
        <Engines @change-engine="handleEngineChange"></Engines>
    </div>
</template>

<style lang="scss">
.search-container {
    width: 38vw;
    margin: 20vh auto 0;

    .el-input--medium .el-input__inner {
        height: 40px;
    }

    .el-input--medium .el-input__icon {
        line-height: 40px;
        color: #888;
    }

    .el-input__inner {
        border-width: 2px;
        border-color: #999;
        border-radius: 8px;
    }
}

.search-component {
    input {
        background-color: var(--color-input-bg);
        color: var(--color-text-input);
        font-size: 16px;
        &::placeholder {
            color: var(--color-placeholder);
        }
    }
}

@media screen and (max-width: 1024px) {
    .search-container {
        width: 60%;
    }
}

@media screen and (max-width: 375px) {
    .search-container {
        width: 90%;
    }
}
</style>
