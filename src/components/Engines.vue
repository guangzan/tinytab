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
import hotkeys from 'hotkeys-js'
import { useStore } from 'vuex'

export default defineComponent({
    emits: {
        'change-engine': null,
    },
    setup(props, context) {
        const store = useStore()
        const enginesData = store.state.enginesData
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
}
</style>
