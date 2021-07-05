import { State } from './state'
import { MutationTree } from 'vuex'
import type { EngineItem } from '@/types'

export enum MutationType {
    UpdateTheme = 'UPDATE_THEME',
    UpdatePrimaryColor = 'UPDATE_PRIMARY_COLOR',
    CreateEngine = 'CREATE_ENGINE',
    DeleteEngine = 'DELETE_ENGINE',
    UpdateEnginesData = 'UPDATE_ENGINES_DATA',
}

export type Mutations = {
    [MutationType.UpdateTheme](state: State, theme: 'dark' | 'light'): void
    [MutationType.UpdatePrimaryColor](state: State, color: string): void
    [MutationType.CreateEngine](state: State, engineItem: EngineItem): void
    [MutationType.DeleteEngine](state: State, id: number): void
    [MutationType.UpdateEnginesData](state: State, enginesData: Array<EngineItem>): void
}

export const mutations: MutationTree<State> & Mutations = {
    /**
     * 更新主题
     * @param state
     * @param theme
     */
    [MutationType.UpdateTheme](state, theme) {
        /* naive ui computed */
        state.theme = theme
        localStorage.theme = theme
        /* windcss class */
        const { classList } = document.documentElement
        classList.remove(theme === 'dark' ? 'light' : 'dark')
        classList.add(theme)
    },

    /**
     * 更新主题强调色
     * @param state
     * @param color
     */
    [MutationType.UpdatePrimaryColor](state, color) {
        state.primaryColor = color
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
}
