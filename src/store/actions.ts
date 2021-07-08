import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State } from './state'
import type { EngineItem, IMsgItem } from '@/types'

export enum ActionTypes {
    UpdateEngine = 'UPDATE_ENGINE',
}

type ActionArgs = Omit<ActionContext<State, State>, 'commit'> & {
    commit<k extends keyof Mutations>(
        key: k,
        payload: Parameters<Mutations[k]>[1]
    ): ReturnType<Mutations[k]>
}

export type Actions = {
    [ActionTypes.UpdateEngine](
        context: ActionArgs,
        item: EngineItem
    ): Promise<IMsgItem[]>
}

export const actions: ActionTree<State, State> & Actions = {
    /**
     * 更新一个引擎
     * @param param0
     * @param newItem
     */
    [ActionTypes.UpdateEngine]({ commit, state }, newItem) {
        return new Promise((resolve, reject) => {
            const { enginesData } = state
            const resultMsg: Array<IMsgItem> = []

            if (newItem.isDefault === true) {
                enginesData.map((item) => (item.isDefault = false))
            }

            enginesData.forEach((item: EngineItem) => {
                const updateEnginesData = (
                    item: EngineItem,
                    newItem: EngineItem
                ): void => {
                    Object.assign(item, newItem)
                    commit(MutationType.UpdateEnginesData, enginesData)
                }

                if (newItem.isDefault === false) {
                    if (item.id === newItem.id) {
                        if (item.isDefault === true) {
                            resultMsg.push({
                                type: 'error',
                                content: '不能将默认搜索引擎取消',
                            })
                            newItem.isDefault = true
                        }
                    }
                }

                if (item.id === newItem.id) {
                    resultMsg.push({
                        type: 'success',
                        content: '修改成功',
                    })
                    resolve(resultMsg)
                    updateEnginesData(item, newItem)
                }
            })
        })
    },
}
