import {
    theme,
    primaryColor,
    visibleList,
    enginesData,
    homeBackground,
    followTheme,
} from '../data/index'

export function initStorage() {
    const state = {
        theme,
        primaryColor,
        visibleList,
        enginesData,
        homeBackground,
        followTheme,
    }

    for (const [key, val] of Object.entries(state)) {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, JSON.stringify(val))
        }
    }
}
