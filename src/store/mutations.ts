import { State } from './state'
import { MutationTree } from 'vuex'
import { EngineItem } from '@/data/enginesData'

export enum MutationType {
    DeleteEngine = 'DELETE_ENGINE',
    SetDefaultEngine = 'SET_DEFAULT_ENGINE',
}

export type Mutations = {
    [MutationType.DeleteEngine](state: State, id: number): void
    [MutationType.SetDefaultEngine](state: State, id: number): void
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
        const currentDefaultEngineId = state.defaultEngineData!.id
        data.forEach((item: EngineItem) => {
            if (item.id === currentDefaultEngineId) {
                // Cancel the current default search engine.
                item.isDefault = false
            }
            if (item.id === id) {
                item.isDefault = true
                state.defaultEngineData = item
                return
            }
        })
        localStorage['enginesData'] = JSON.stringify(data)
    },
}
