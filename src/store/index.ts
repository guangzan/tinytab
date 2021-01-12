import { createStore } from 'vuex'
import { EngineItem } from '../data/enginesData'
import initApp from '@/utils/initApp'
initApp()

let enginesData: Array<EngineItem> = JSON.parse(localStorage['enginesData'])

/**
 * Get default engine data.
 * @returns {Object} an engine data
 */
function getDefaultEngineData() {
    for (const engine of enginesData) {
        if (engine.isDefault) {
            return engine
        }
    }
}

export default createStore({
    state: {
        enginesData,
        defaultEngineData: getDefaultEngineData(),
    },
    mutations: {
        /**
         * Add an engine.
         * @param state
         * @param info engine data
         */
        addEngine(state, info) {
            const data = state.enginesData
            data.push(info)
            localStorage['enginesData'] = JSON.stringify(data)
        },
        /**
         * Delete an engine by id.
         * @param state
         * @param id engine id
         */
        delEngine(state, id) {
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
         * Update an engine info.
         * @param state
         * @param newData new engine data
         */
        updateEngine(state, newData: EngineItem) {
            const data = state.enginesData
            const { id } = newData
            data.forEach((item: EngineItem) => {
                if (item.id === id) {
                    Object.assign(item, newData)
                    localStorage['enginesData'] = JSON.stringify(data)
                    return
                }
            })
        },
        /**
         * Change Default engine by id.
         * @param state
         * @param id engine id
         */
        changeDefaultEngine(state, id) {
            const data = state.enginesData
            data.forEach((item: EngineItem) => {
                if (item.id === id) {
                    item.isDefault = true
                    state.defaultEngineData = item
                    return
                }
            })
        },
    },
    actions: {},
    modules: {},
})
