import type {
    EngineItem,
    VisibleList,
    Theme,
    PrimaryColor,
    HomeBackground,
    FollowTheme,
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
const followTheme = JSON.parse(localStorage['followTheme']) as FollowTheme
const lang = JSON.parse(localStorage['lang']) as Lang

export type State = {
    theme: 'light' | 'dark'
    primaryColor: string
    visibleList: VisibleList
    enginesData: EngineItem[]
    homeBackground: HomeBackground
    followTheme: FollowTheme
    lang: Lang
}

export const state: State = {
    theme,
    primaryColor,
    visibleList,
    enginesData,
    homeBackground,
    followTheme,
    lang,
}
