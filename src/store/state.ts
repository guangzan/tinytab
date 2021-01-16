import { EngineItem } from '../data/enginesData'
import initApp from '@/utils/initApp'
initApp()

let enginesData = JSON.parse(localStorage['enginesData']) as EngineItem[]
const defaultEngineData = enginesData.filter(item => item.isDefault)[0]

export type State = {
    enginesData: EngineItem[]
    defaultEngineData: EngineItem
}

export const state: State = {
    enginesData,
    defaultEngineData,
}
