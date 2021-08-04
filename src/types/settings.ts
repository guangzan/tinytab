import { EngineItem } from './engines'

export type Theme = 'light' | 'dark'
export type FollowSystemTheme = boolean
export type HomeBackground = string
export type HomeBackgroundBlur = number
export type HomeBackgroundMask = number
export type PrimaryColor = string
export type VisibleList = string[]
export type Lang = 'zh-CN' | 'en'
export type Target = '_blank' | '_self'

export interface ISettings {
    enginesData: Array<EngineItem>
    theme: 'light' | 'dark'
    visibleList: VisibleList
    primaryColor: PrimaryColor
    homeBackground: HomeBackground
    homeBackgroundBlur: HomeBackgroundBlur
    homeBackgroundMask: HomeBackgroundMask
    followSystemTheme: FollowSystemTheme
    lang: Lang
    target: Target
}
