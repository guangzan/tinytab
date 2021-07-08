import type {
    EngineItem,
    VisibleList,
    Theme,
    PrimaryColor,
    HomeBackground,
    FollowTheme,
} from '@/types'
import { initStorage } from '../logic/index'

initStorage()

const theme = JSON.parse(localStorage['theme']) as Theme
const primaryColor = JSON.parse(localStorage['primaryColor']) as PrimaryColor
const enginesData = JSON.parse(localStorage['enginesData']) as EngineItem[]
const visibleList = JSON.parse(localStorage['visibleList']) as VisibleList
const homeBackground = JSON.parse(
    localStorage['homeBackground']
) as HomeBackground
const followTheme = JSON.parse(localStorage['followTheme']) as FollowTheme

export type State = {
    theme: 'light' | 'dark'
    primaryColor: string
    visibleList: VisibleList
    enginesData: EngineItem[]
    homeBackground: HomeBackground
    followTheme: FollowTheme
}

export const state: State = {
    theme,
    primaryColor,
    visibleList,
    enginesData,
    homeBackground,
    followTheme,
}
