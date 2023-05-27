import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  EngineItem,
  EnginesData,
  FollowSystemTheme,
  HomeBackground,
  HomeBackgroundBlur,
  HomeBackgroundMask,
  IMsgItem,
  Lang,
  PrimaryColor,
  Target,
  Theme,
  VisibleList,
} from '@/types'
import { removeArrItem } from '@/utils/tools'
import { initStorage } from '@/logic/initStorage'

const initialValue = initStorage()

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<Theme>(initialValue.theme)
  const primaryColor = ref<PrimaryColor>(initialValue.primaryColor)
  const visibleList = ref<VisibleList>(initialValue.visibleList)
  const enginesData = ref<EnginesData>(initialValue.enginesData)
  const homeBackground = ref<HomeBackground>(initialValue.homeBackground)
  const followSystemTheme = ref<FollowSystemTheme>(initialValue.followSystemTheme)
  const lang = ref<Lang>(initialValue.lang)
  const homeBackgroundBlur = ref<HomeBackgroundBlur>(initialValue.homeBackgroundBlur)
  const homeBackgroundMask = ref<HomeBackgroundMask>(initialValue.homeBackgroundMask)
  const target = ref<Target>(initialValue.target)

  const defaultEngineData = computed(() => {
    return enginesData.value.filter(engine => engine.isDefault === true)[0]
  })

  function GetEngineById(id: number) {
    return enginesData.value.filter(engine => engine.id === id)[0]
  }

  function GetEngineByPrefix(prefix: string) {
    return enginesData.value.filter(engine => engine.prefix === prefix)[0]
  }

  function UpdateTheme(value: Theme) {
    theme.value = value
    localStorage.setItem('theme', JSON.stringify(value))
  }
  function UpdatePrimaryColor(value: PrimaryColor) {
    primaryColor.value = value
    localStorage.setItem('primaryColor', JSON.stringify(value))
  }
  function CreateEngine(value: EngineItem) {
    if (value.isDefault === true)
      enginesData.value.map(item => (item.isDefault = false))

    enginesData.value.push(value)
    localStorage.setItem('enginesData', JSON.stringify(enginesData))
  }
  function DeleteEngine(id: number) {
    const data = enginesData.value
    enginesData.value.forEach((item: any, index: any) => {
      if (item.id === id) {
        data.splice(index, 1)
        localStorage.enginesData = JSON.stringify(data)
      }
    })
  }
  function UpdateEnginesData(value: EnginesData) {
    enginesData.value = value
    localStorage.setItem('enginesData', JSON.stringify(enginesData))
  }
  function UpdateEngine(newItem: EngineItem): Promise<IMsgItem[]> {
    return new Promise((resolve) => {
      const resultMsg: Array<IMsgItem> = []
      if (newItem.isDefault === true)
        enginesData.value.map(item => (item.isDefault = false))

      enginesData.value.forEach((item: EngineItem) => {
        const updateEnginesData = (item: EngineItem, newItem: EngineItem): void => {
          Object.assign(item, newItem)
          UpdateEnginesData(enginesData.value)
        }
        if (newItem.isDefault === false) {
          if (item.id === newItem.id) {
            if (item.isDefault === true) {
              resultMsg.push({
                type: 'error',
                content: '不能将默认搜索引擎取消',
              })
              newItem.isDefault = true
            }
          }
        }
        if (item.id === newItem.id) {
          resultMsg.push({
            type: 'success',
            content: '修改成功',
          })
          resolve(resultMsg)
          updateEnginesData(item, newItem)
        }
      })
    })
  }
  function ToggleVisible(item: string) {
    if (visibleList.value.includes(item))
      visibleList.value = removeArrItem(visibleList.value, item)
    else
      visibleList.value.push(item)

    localStorage.setItem('visibleList', JSON.stringify(visibleList))
  }
  function UpdateVisibleList(value: VisibleList) {
    visibleList.value = value
    localStorage.setItem('visibleList', JSON.stringify(visibleList))
  }
  function UpdateHomeBackground(value: HomeBackground) {
    homeBackground.value = value
    localStorage.setItem('homeBackground', JSON.stringify(homeBackground))
  }
  function UpdateFollowSystemTheme(value: FollowSystemTheme) {
    followSystemTheme.value = value
    localStorage.setItem('followSystemTheme', JSON.stringify(followSystemTheme))
  }
  function UpdateLang(value: Lang) {
    lang.value = value
    localStorage.setItem('lang', JSON.stringify(lang))
  }
  function UpdateHomeBackgroundBlur(value: HomeBackgroundBlur) {
    homeBackgroundBlur.value = value
    localStorage.setItem('homeBackgroundBlur', JSON.stringify(value))
  }
  function UpdateHomeBackgroundMask(v: HomeBackgroundMask) {
    homeBackgroundMask.value = v
    localStorage.setItem('homeBackgroundMask', JSON.stringify(v))
  }
  function UpdateTarget(v: Target) {
    target.value = v
    localStorage.setItem('target', JSON.stringify(v))
  }

  return {
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

    defaultEngineData,
    GetEngineById,
    GetEngineByPrefix,

    UpdateTheme,
    UpdatePrimaryColor,
    CreateEngine,
    DeleteEngine,
    UpdateEngine,
    UpdateEnginesData,
    ToggleVisible,
    UpdateVisibleList,
    UpdateHomeBackground,
    UpdateFollowSystemTheme,
    UpdateLang,
    UpdateHomeBackgroundBlur,
    UpdateHomeBackgroundMask,
    UpdateTarget,
  }
})
