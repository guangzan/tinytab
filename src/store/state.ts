import type { EngineItem } from '@/types'
import initApp from '../utils/initApp'

initApp()

const enginesData = JSON.parse(localStorage['enginesData']) as EngineItem[]

export type State = {
    enginesData: EngineItem[]
    theme: 'light' | 'dark'
    primaryColor: string
}

export const state: State = {
    enginesData,
    theme: 'light',
    primaryColor: '#18A058',
}
