import type {
    EngineItem,
    VisibleList,
    Theme,
    PrimaryColor,
    HomeBackground,
    FollowSystemTheme,
    Lang,
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
const followSystemTheme = JSON.parse(
    localStorage['followSystemTheme']
) as FollowSystemTheme
const lang = JSON.parse(localStorage['lang']) as Lang

export type State = {
    theme: 'light' | 'dark'
    primaryColor: string
    visibleList: VisibleList
    enginesData: EngineItem[]
    homeBackground: HomeBackground
    followSystemTheme: FollowSystemTheme
    lang: Lang
}

export const state: State = {
    theme,
    primaryColor,
    visibleList,
    enginesData,
    homeBackground,
    followSystemTheme,
    lang,
}
