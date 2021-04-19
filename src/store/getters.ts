import { GetterTree } from 'vuex'
import { State } from './state'
import { EngineItem } from '../data/enginesData'

export type Getters = {
    defaultEngine(state: State): EngineItem
    getTheme(state: State): State['theme']
}

export const getters: GetterTree<State, State> & Getters = {
    defaultEngine(state) {
        return state.enginesData.filter(i => i.isDefault)[0]
    },
    getTheme: state => {
        return state.theme
    },
}
