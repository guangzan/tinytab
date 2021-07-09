import { GetterTree } from 'vuex'
import { State } from './state'
import type { EngineItem } from '@/types'

export type Getters = {
    GetTheme(state: State): State['theme']
    GetDefaultEngineData(state: State): EngineItem
    GetEngineById(state: State): (id: number) => EngineItem
    GetEngineByPrefix(state: State): (prefix: string) => EngineItem
    GetVisibleList(state: State): State['visibleList']
    GetHomeBackground(state: State): State['homeBackground']
    GetFollowTheme(state: State): State['followTheme']
    GetLang(state: State): State['lang']
}

export const getters: GetterTree<State, State> & Getters = {
    /**
     * 获取当前主题
     * @param state
     * @returns
     */
    GetTheme(state) {
        return state.theme
    },

    /**
     * 获取默认引擎数据
     */
    GetDefaultEngineData(state) {
        return state.enginesData.filter(
            (engine) => engine.isDefault === true
        )[0]
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

    /**
     * 获取可见元素列表
     */
    GetVisibleList(state) {
        return state.visibleList
    },

    /**
     * 首页背景图
     * @param state
     * @returns
     */
    GetHomeBackground(state) {
        return state.homeBackground
    },

    /**
     * 是否跟随系统设置
     * @param state
     * @returns
     */
    GetFollowTheme(state) {
        return state.followTheme
    },

    /**
     * 获取当前语言
     * @param state
     * @returns {Lang} lang - 当前语言
     */
    GetLang: (state) => state.lang,
}
