<template>
    <div class="search-container">
        <el-input
            :placeholder="placeholder"
            v-model="searchValue"
            class="search-component"
            @keyup.enter="handleSubmit"
            prefix-icon="el-icon-search"
            clearable
        >
        </el-input>
        <Engines @change-engine="onEngineChange"></Engines>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Engines from '../components/Engines'
import enginesData from '../constants/enginesData'
import { ElMessage } from 'element-plus'

const getPlaceholderText = engine => {
    for (const item of enginesData) {
        if (item.name === engine) {
            return item.placeholderText
        }
    }
}

export default defineComponent({
    components: {
        Engines,
    },
    setup() {
        const searchValue = ref('')
        const searchEngine = ref('')
        const placeholder = ref(getPlaceholderText('Baidu'))
        const searchBaseUrl = ref('https://www.baidu.com/s?ie=UTF-8&wd=')

        const onEngineChange = engine => {
            searchEngine.value = engine

            for (const item of enginesData) {
                if (item.name === engine) {
                    searchBaseUrl.value = item.baseUrl
                    placeholder.value = item.placeholderText
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

        return {
            searchValue,
            searchEngine,
            handleSubmit,
            onEngineChange,
            placeholder,
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
        &:focus {
            border-color: teal;
        }
    }
}

@media screen and (max-width: 1024px) {
    .search-container {
        width: 90%;
    }
}
</style>
