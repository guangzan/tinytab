import { initStorage } from '../logic/index'
import type {
    EngineItem,
    VisibleList,
    Theme,
    PrimaryColor,
    HomeBackground,
    FollowSystemTheme,
    Lang,
    HomeBackgroundBlur,
    HomeBackgroundMask,
    Target,
} from '@/types'

initStorage()

const theme = JSON.parse(localStorage['theme'])
const primaryColor = JSON.parse(localStorage['primaryColor'])
const enginesData = JSON.parse(localStorage['enginesData'])
const visibleList = JSON.parse(localStorage['visibleList'])
const homeBackground = JSON.parse(localStorage['homeBackground'])
const followSystemTheme = JSON.parse(localStorage['followSystemTheme'])
const lang = JSON.parse(localStorage['lang'])
const homeBackgroundBlur = JSON.parse(localStorage['homeBackgroundBlur'])
const homeBackgroundMask = JSON.parse(localStorage['homeBackgroundMask'])
const target = JSON.parse(localStorage['target'])

export type State = {
    theme: Theme
    primaryColor: PrimaryColor
    visibleList: VisibleList
    enginesData: EngineItem[]
    homeBackground: HomeBackground
    followSystemTheme: FollowSystemTheme
    lang: Lang
    homeBackgroundBlur: HomeBackgroundBlur
    homeBackgroundMask: HomeBackgroundMask
    target: Target
}

export const state: State = {
    theme,
    primaryColor,
    visibleList,
    enginesData,
    homeBackground,
    followSystemTheme,
    lang,
    homeBackgroundBlur,
    homeBackgroundMask,
    target,
}
