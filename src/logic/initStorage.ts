import {
  enginesData,
  followSystemTheme,
  homeBackground,
  homeBackgroundBlur,
  homeBackgroundMask,
  lang,
  primaryColor,
  target,
  theme,
  visibleList,
} from '../data/index'

export function initStorage() {
  const state = {
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

  for (const [key, val] of Object.entries(state)) {
    if (localStorage.getItem(key) === null)
      localStorage.setItem(key, JSON.stringify(val))
  }

  return state
}
