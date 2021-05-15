<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { EngineItem } from '../data/enginesData'

export default defineComponent({
    emits: {
        'change-engine': null,
    },
    setup(props, context) {
        const store = useStore()
        const enginesData: EngineItem[] = store.state.enginesData
        const searchEngine = ref<string>('')

        const handleChooseSearchEngine = (engineName: string): void => {
            searchEngine.value = engineName
            context.emit('change-engine', searchEngine.value)

            const ele = document.querySelector(
                '.search-component input'
            ) as HTMLElement
            ele.focus()
        }

        return {
            enginesData,
            searchEngine,
            handleChooseSearchEngine,
        }
    },
})
</script>

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

<style>
.search-engines {
    margin-top: 4px;
}
</style>
