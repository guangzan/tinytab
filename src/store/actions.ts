import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State } from './state'
import { EngineItem } from '@/data/enginesData'

export enum ActionTypes {
    CreateEngine = 'CREATE_ENGINE',
    UpdateEngine = 'UPDATE_ENGINE',
}

type ActionArgs = Omit<ActionContext<State, State>, 'commit'> & {
    commit<k extends keyof Mutations>(
        key: k,
        payload: Parameters<Mutations[k]>[1]
    ): ReturnType<Mutations[k]>
}

export type Actions = {
    [ActionTypes.CreateEngine](context: ActionArgs, item: EngineItem): void
    [ActionTypes.UpdateEngine](context: ActionArgs, item: EngineItem): void
}

export const actions: ActionTree<State, State> & Actions = {
    [ActionTypes.CreateEngine]({ commit, state }, item) {
        const data = state.enginesData
        data.push(item)
        localStorage['enginesData'] = JSON.stringify(data)
        if (item.isDefault) {
            commit(MutationType.SetDefaultEngine, item.id)
        }
    },
    [ActionTypes.UpdateEngine]({ commit, state }, newItem) {
        const data = state.enginesData
        const { id } = newItem
        data.forEach((item: EngineItem) => {
            if (item.id === id) {
                Object.assign(item, newItem)
                localStorage['enginesData'] = JSON.stringify(data)
                if (item.isDefault) {
                    commit(MutationType.SetDefaultEngine, item.id)
                }
            }
        })
    },
}
