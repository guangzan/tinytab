export interface TTEngine {
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
export interface TTTheme {
  mode: 'light' | 'dark'
  followSystem: TTFollowSystemTheme
  primaryColor: TTPrimaryColor
}
export interface TTSearch {
  target: TTTarget
}
export type TTFollowSystemTheme = boolean
export interface TTHomeBackground {
  src: string
  blur: number
  mask: number
}
export type TTHomeBackgroundBlur = number
export type TTHomeBackgroundMask = number
export type TTPrimaryColor = string
export type TTVisibleElements = 'homeEngines' | 'homeSettingButton' | 'homeLangButton' | 'HOME_MODE_BUTTON'
export type TTLang = 'zh-CN' | 'en'
export type TTTarget = '_blank' | '_self'
export type TTMode = 'light' | 'dark'

export interface TTSettings {
  lang: TTLang
  visibleList: TTVisibleElements[]
  homeBackground: TTHomeBackground
  engines: TTEngine[]
  theme: TTTheme
  search: TTSearch
}
