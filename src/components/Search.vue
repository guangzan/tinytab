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
        >
        </el-input>
        <Engines @change-engine="onEngineChange"></Engines>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import Engines from '../components/Engines'
import enginesData from '../constants/enginesData'
import { ElMessage } from 'element-plus'

/**
 * @description get one engine info
 * @param engine {String} engine name
 * @param info {String} a engine info
 */
const getEngineInfo = (engine, info) => {
    for (const item of enginesData) {
        if (item.name === engine) return item[info]
    }
}

export default defineComponent({
    components: {
        Engines,
    },
    setup() {
        const searchValue = ref('')
        const searchEngine = ref('')
        const placeholder = ref(getEngineInfo('Baidu', 'placeholderText'))
        const searchBaseUrl = ref('https://www.baidu.com/s?ie=UTF-8&wd=')
        const inputBorderColor = ref(getEngineInfo('Baidu', 'color'))

        const onEngineChange = engine => {
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

        const handleSubmit = () => {
            if (!searchValue.value.length) {
                ElMessage.warning('请输入内容')
                return
            }
            window.open(`${searchBaseUrl.value}${searchValue.value}`)
        }

        const handleFocusInput = e => {
            e.target.style.borderColor = inputBorderColor.value
        }

        const handleBlurInput = e => {
            e.target.style.borderColor = ''
        }

        onMounted(() => {
            setTimeout(() => {
                document.querySelector('.search-component input').focus()
            }, 300)
        })

        return {
            searchValue,
            searchEngine,
            handleSubmit,
            onEngineChange,
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
        // &:focus {
        //     border-color: v-bind(inputBorderColor);
        // }
    }
}

@media screen and (max-width: 1024px) {
    .search-container {
        width: 90%;
    }
}
</style>
