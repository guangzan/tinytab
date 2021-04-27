import { State } from './state'
import { MutationTree } from 'vuex'
import { ElNotification } from 'element-plus'

export enum MutationType {
    DeleteEngine = 'DELETE_ENGINE',
    SetDefaultEngine = 'SET_DEFAULT_ENGINE',
    SetTheme = 'SET_THEME',
}

export type Mutations = {
    [MutationType.DeleteEngine](state: State, id: number): void
    [MutationType.SetDefaultEngine](state: State, id: number): void
    [MutationType.SetTheme](state: State, theme: 'dark' | 'light'): void
}

export const mutations: MutationTree<State> & Mutations = {
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
    [MutationType.SetDefaultEngine](state, id) {
        const data = state.enginesData
        const currentDefaultEngineId = state.defaultEngineData.id
        if (id === currentDefaultEngineId) {
            const currentDefaultEngineId = state.defaultEngineData.id
            ElNotification({
                type: 'error',
                message: '必须保留一个默认搜索引擎',
                position: 'top-left',
                onClose() {
                    ElNotification({
                        type: 'success',
                        message: '其他信息已经修改成功',
                        position: 'top-left',
                    })
                },
            })
            for (const item of data) {
                if (item.id === currentDefaultEngineId) {
                    item.isDefault = true
                    break
                }
            }
        } else {
            for (const item of data) {
                if (item.id === currentDefaultEngineId) {
                    item.isDefault = false
                }
                if (item.id === id) {
                    item.isDefault = true
                    state.defaultEngineData = item
                }
            }
            ElNotification({
                type: 'success',
                message: '修改成功',
                position: 'top-left',
            })
        }
        localStorage['enginesData'] = JSON.stringify(data)
    },
    [MutationType.SetTheme](state, theme) {
        state.theme = theme
        localStorage.theme = theme
    },
}
