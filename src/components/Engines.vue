<template>
    <el-row class="search-engines">
        <el-button
            size="mini"
            @click="handleChooseSearchEngine(item.name)"
            :style="{ borderColor: item.color }"
            v-for="(item, index) in enginesData"
            :key="index"
            >{{ item.name }}</el-button
        >
    </el-row>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import enginesData from '../constants/enginesData'
import hotkeys from 'hotkeys-js'

export default defineComponent({
    emits: {
        'change-engine': null,
    },
    setup(props, context) {
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

        const listenHotkeys = () => {
            for (const item of enginesData) {
                hotkeys(item.hotkeys, e => {
                    e.preventDefault()
                    handleChooseSearchEngine(item.name)
                })
            }
        }

        onMounted(() => {
            listenHotkeys()
        })

        return {
            enginesData,
            searchEngine,
            handleChooseSearchEngine,
        }
    },
})
</script>

<style scoped lang="scss">
.search-engines {
    margin-top: 18px;
    button {
        margin-bottom: 8px;
    }
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

// $sources-color: (
//     Baidu: #2932e1,
//     Bing: #0c8484,
//     Sougou: #ff6f17,
//     Google: #4285f4,
//     NPM: #ea4335,
//     Yuque: #28c46f,
// );

// @each $key, $item in $sources-color {
//     .#{$key} {
//         &.el-button {
//             border-color: map-get($sources-color, $key);
//         }
//     }
// }
</style>
