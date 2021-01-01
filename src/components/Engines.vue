<template>
    <el-row class="search-engines">
        <el-button
            size="mini"
            @click="handleChooseSearchEngine(item.name)"
            :class="item.name"
            v-for="(item, index) in enginesData"
            :key="index"
            >{{ item.name }}</el-button
        >
    </el-row>
</template>

<script>
import { defineComponent, ref } from 'vue'
import enginesData from '../constants/enginesData'

export default defineComponent({
    emits: {
        'change-engine': null,
    },
    setup(props, context) {
        const searchValue = ref('')
        const searchEngine = ref('')
        const baseUrl = ref('https://www.baidu.com/s?ie=UTF-8&wd=')

        const handleChooseSearchEngine = engine => {
            baseUrl.value = enginesData.map(item => {
                if (item.name === engine) return item.baseUrl
            })
            searchEngine.value = engine
            context.emit('change-engine', searchEngine.value)
            document.querySelector('.search-component input').focus()
        }

        return {
            enginesData,
            searchValue,
            searchEngine,
            handleChooseSearchEngine,
        }
    },
})
</script>

<style scoped lang="scss">
$sources-color: (
    Baidu: #2932e1,
    Bing: #0c8484,
    Sougou: #ff6f17,
    Google: #4285f4,
    NPM: #ea4335,
    Yuque: #28c46f,
);

.search-engines {
    margin-top: 18px;
    button {
        margin-bottom: 8px;
    }
}

@each $key, $item in $sources-color {
    .#{$key} {
        &.el-button {
            border-color: map-get($sources-color, $key);
        }
    }
}

.btn-badge {
    margin-right: 14px;
}

.el-button {
    background-color: var(--color-btn-bg);
    color: var(--color-btn-text);

    &:active,
    &:focus,
    &:hover {
        background-color: var(--color-btn-hover-bg);
        color: var(--color-btn-text);
    }
}
</style>
