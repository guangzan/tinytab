import { GetterTree } from 'vuex'
import { State } from './state'
import type { EngineItem } from '@/types'

export type Getters = {
    GetTheme(state: State): State['theme']
    GetEnginesData(state: State): State['enginesData']
    GetDefaultEngineData(state: State): EngineItem
    GetEngineById(state: State): (id: number) => EngineItem
    GetEngineByPrefix(state: State): (prefix: string) => EngineItem
    GetVisibleList(state: State): State['visibleList']
    GetHomeBackground(state: State): State['homeBackground']
    GetFollowSystemTheme(state: State): State['followSystemTheme']
    GetLang(state: State): State['lang']
    GetPrimaryColor(state: State): State['primaryColor']
    GetHomeBackgroundBlur(state: State): State['homeBackgroundBlur']
    GetHomeBackgroundMask(state: State): State['homeBackgroundMask']
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
     * 获取引擎列表
     * @param state
     * @returns
     */
    GetEnginesData(state) {
        return state.enginesData
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
    GetFollowSystemTheme(state) {
        return state.followSystemTheme
    },

    /**
     * 获取当前语言
     * @param state
     * @returns {Lang} lang - 当前语言
     */
    GetLang: (state) => state.lang,

    /**
     * 获取主题强调色
     * @param state
     * @returns {PrimaryColor} primaryColor - 主题强调色
     */
    GetPrimaryColor: (state) => state.primaryColor,

    /**
     * 获取首页背景模糊度
     * @param state
     * @returns {HomeBackgroundBlur} homeBackgroundBlur - 首页背景模糊度
     */
    GetHomeBackgroundBlur: (state) => state.homeBackgroundBlur,

    /**
     * 获取首页背景遮罩透明度
     * @param state
     * @returns {HomeBackgroundBlur} homeBackgroundBlur - 首页背景模糊度
     */
    GetHomeBackgroundMask: (state) => state.homeBackgroundMask,
}
