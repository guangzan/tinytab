import { GetterTree } from 'vuex'
import { State } from './state'
import type { EngineItem } from '@/types'

export type Getters = {
    getTheme(state: State): State['theme']
    GetEngineById(state: State): (id: number) => EngineItem
    GetEngineByPrefix(state: State): (prefix: string) => EngineItem
}

export const getters: GetterTree<State, State> & Getters = {
    /**
     * 获取当前主题
     * @param state
     * @returns
     */
    getTheme(state) {
        return state.theme
    },

    /**
     * 获取默认引擎数据
     */
    getDefaultEngineData(state) {
        return state.enginesData.filter((engine) => engine.isDefault === true)[0]
    },

    /**
     * 通过 ID 获取一个引擎的数据
     * @param state
     * @param id
     * @returns
     */
    GetEngineById: (state) => (id) => {
        return state.enginesData.filter((engine) => engine.id === id)[0]
    },

    /**
     * 通过 ID 获取一个引擎的数据
     * @param state
     * @param id
     * @returnsF
     */
    GetEngineByPrefix: (state) => (prefix) => {
        return state.enginesData.filter((engine) => engine.prefix === prefix)[0]
    },
}
