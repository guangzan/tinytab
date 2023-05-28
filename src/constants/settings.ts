import type * as TT from '@/types'

export const engines: TT.TTEngine[] = [
  {
    id: 1,
    name: 'Baidu',
    baseUrl: 'https://www.baidu.com/s?ie=UTF-8&wd=',
    placeholderText: '百度一下，你就知道',
    hotkeys: 'ctrl+a',
    color: '#4E6EF2',
    category: 1,
    isDefault: true,
    prefix: 'bd',
    suffix: [],
  },
  {
    id: 2,
    name: '中 ⇆ 英',
    baseUrl: 'https://fanyi.baidu.com/translate#en/zh/',
    placeholderText: '百度翻译',
    hotkeys: 'f4',
    color: '#4395FF',
    category: 1,
    isDefault: false,
    prefix: 'fy',
    suffix: [],
  },
]

export const initialSettings: TT.TTSettings = {
  lang: 'zh-CN',
  engines,
  theme: {
    mode: 'light',
    primaryColor: '#3051ff',
    followSystem: false,
  },
  visibleList: ['homeEngines', 'homeSettingButton', 'homeLangButton'],
  homeBackground: {
    src: '',
    blur: 0,
    mask: 0,
  },
  search: {
    target: '_blank',
  },
}
