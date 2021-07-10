export type Theme = 'light' | 'dark'
export type FollowSystemTheme = boolean
export type HomeBackground = string
export type PrimaryColor = string
export type VisibleList = string[]
export type EnginesData = EngineItem[]
export type Lang = 'zh-CN' | 'en'

export type EngineItem = {
    id: number
    name: string
    baseUrl: string
    placeholderText: string
    hotkeys?: string
    color: string
    category: number
    isDefault: boolean
    prefix: string
    suffix: string[]
}

export interface ISettings {
    enginesData: Array<EngineItem>
    theme: 'light' | 'dark'
    visibleList: VisibleList
    primaryColor: PrimaryColor
    homeBackground: HomeBackground
    followSystemTheme: FollowSystemTheme
    lang: Lang
}

export interface IMsgItem {
    type: 'error' | 'success'
    content: string
}
