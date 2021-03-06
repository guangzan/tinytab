import { State } from './state'
import { MutationTree } from 'vuex'
import { removeArrItem } from '@/utils/tools'
import type {
    EngineItem,
    EnginesData,
    Lang,
    Target,
    VisibleList,
    Theme,
    PrimaryColor,
    HomeBackground,
    FollowSystemTheme,
} from '@/types'

export enum MutationType {
    UpdateTheme = 'UPDATE_THEME',
    UpdatePrimaryColor = 'UPDATE_PRIMARY_COLOR',
    CreateEngine = 'CREATE_ENGINE',
    DeleteEngine = 'DELETE_ENGINE',
    UpdateEnginesData = 'UPDATE_ENGINES_DATA',
    ToggleVisible = 'TOGGLE_VISIBLE',
    UpdateVisibleList = 'UPDATE_VISIBLE_LIST',
    UpdateHomeBackground = 'UPDATE_HOME_BACKGROUND',
    UpdateFollowSystemTheme = 'UPDATE_FOLLOW_THEME',
    UpdateLang = 'UPDATE_LANG',
    UpdateHomeBackgroundBlur = 'UPDATE_HOME_BACKGROUND_BLUR',
    UpdateHomeBackgroundMask = 'UPDATE_HOME_BACKGROUND_MASK',
    UpdateTarget = 'UPDATE_TARGET',
}

export type Mutations = {
    [MutationType.UpdateTheme](state: State, theme: Theme): void
    [MutationType.UpdatePrimaryColor](state: State, color: PrimaryColor): void
    [MutationType.CreateEngine](state: State, engineItem: EngineItem): void
    [MutationType.DeleteEngine](state: State, id: number): void
    [MutationType.UpdateEnginesData](state: State, enginesData: EnginesData): void
    [MutationType.ToggleVisible](state: State, visibleItem: string): void
    [MutationType.UpdateVisibleList](state: State, visibleList: VisibleList): void
    [MutationType.UpdateHomeBackground](state: State, homeBackground: HomeBackground): void
    [MutationType.UpdateFollowSystemTheme](state: State, follow: FollowSystemTheme): void
    [MutationType.UpdateLang](state: State, lang: Lang): void
    [MutationType.UpdateTarget](state: State, target: Target): void
}

export const mutations: MutationTree<State> & Mutations = {
    /**
     * 更新主题
     * @param state
     * @param theme
     */
    [MutationType.UpdateTheme](state, theme) {
        state.theme = theme
        localStorage.setItem('theme', JSON.stringify(theme))
    },

    /**
     * 更新主题强调色
     * @param state
     * @param color
     */
    [MutationType.UpdatePrimaryColor](state, primaryColor) {
        state.primaryColor = primaryColor
        localStorage.setItem('primaryColor', JSON.stringify(primaryColor))
    },

    /**
     * 创建一个引擎
     * @param state
     * @param engineItem
     */
    [MutationType.CreateEngine](state, engineItem) {
        const enginesData = state.enginesData
        if (engineItem.isDefault === true) {
            enginesData.map((item) => (item.isDefault = false))
        }

        enginesData.push(engineItem)
        state.enginesData = enginesData
        localStorage.setItem('enginesData', JSON.stringify(enginesData))
    },

    /**
     * 删除一个引擎
     * @param state
     * @param id
     */
    [MutationType.DeleteEngine](state, id) {
        const data = state.enginesData
        data.forEach((item: any, index: any) => {
            if (item.id === id) {
                data.splice(index, 1)
                localStorage['enginesData'] = JSON.stringify(data)
                return
            }
        })
    },

    /**
     * 更新引擎列表数据
     * @param state
     * @param enginesData
     */
    [MutationType.UpdateEnginesData](state, enginesData) {
        state.enginesData = enginesData
        localStorage.setItem('enginesData', JSON.stringify(enginesData))
    },

    /**
     * 显示或隐藏 visibleList 中的一个元素
     * @param state
     * @param item
     */
    [MutationType.ToggleVisible](state, item) {
        const visibleList = state.visibleList as VisibleList
        if (visibleList.includes(item)) {
            removeArrItem(visibleList, item)
        } else {
            visibleList.push(item)
        }
        localStorage.setItem('visibleList', JSON.stringify(visibleList))
    },

    /**
     * 更新可见元素列表
     * @param state
     * @param theme
     */
    [MutationType.UpdateVisibleList](state, visibleList) {
        state.visibleList = visibleList
        localStorage.setItem('visibleList', JSON.stringify(visibleList))
    },

    /**
     * 更新主题
     * @param state
     * @param theme
     */
    [MutationType.UpdateHomeBackground](state, homeBackground) {
        state.homeBackground = homeBackground
        localStorage.setItem('homeBackground', JSON.stringify(homeBackground))
    },

    /**
     * 更新主题
     * @param state
     * @param theme
     */
    [MutationType.UpdateFollowSystemTheme](state, followSystemTheme) {
        state.followSystemTheme = followSystemTheme
        localStorage.setItem('followSystemTheme', JSON.stringify(followSystemTheme))
    },

    /**
     * 更新语言
     * @param state
     * @param lang
     */
    [MutationType.UpdateLang](state, lang) {
        state.lang = lang
        localStorage.setItem('lang', JSON.stringify(lang))
    },

    /**
     * 更新首页背景模糊度
     * @param state
     * @param lang
     */
    [MutationType.UpdateHomeBackgroundBlur](state, v) {
        state.homeBackgroundBlur = v
        localStorage.setItem('homeBackgroundBlur', JSON.stringify(v))
    },

    /**
     * 更新首页背景遮罩透明度
     * @param state
     * @param lang
     */
    [MutationType.UpdateHomeBackgroundMask](state, v) {
        state.homeBackgroundMask = v
        localStorage.setItem('homeBackgroundMask', JSON.stringify(v))
    },

    /**
     * 更新页面打开方式
     * @param state
     * @param target
     */
    [MutationType.UpdateTarget](state, v) {
        state.target = v
        localStorage.setItem('target', JSON.stringify(v))
    },
}
