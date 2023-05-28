import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorageAsync } from '@vueuse/core'
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
  TinyTabSettings,
  VisibleList,
} from '@/types'
import { removeArrItem } from '@/utils/tools'
import { initialSettings } from '@/constants/settings'
import { STORAGE_KEY_PREFIX } from '@/constants/keys'

export const useSettingsStore = defineStore('settings', () => {
  const settings = useStorageAsync<TinyTabSettings>(`${STORAGE_KEY_PREFIX}_SETTINGS`, initialSettings)

  const defaultEngineData = computed(() => {
    return settings.value.enginesData.filter(engine => engine.isDefault === true)[0]
  })

  function GetEngineById(id: number) {
    return settings.value.enginesData.filter(engine => engine.id === id)[0]
  }
  function GetEngineByPrefix(prefix: string) {
    return settings.value.enginesData.filter(engine => engine.prefix === prefix)[0]
  }

  function UpdateSettings(v: TinyTabSettings) {
    settings.value = v
  }
  function UpdateTheme(value: Theme) {
    settings.value.theme = value
  }
  function UpdatePrimaryColor(value: PrimaryColor) {
    settings.value.primaryColor = value
  }
  function CreateEngine(value: EngineItem) {
    if (value.isDefault === true)
      settings.value.enginesData.map(item => (item.isDefault = false))

    settings.value.enginesData.push(value)
  }
  function DeleteEngine(id: number) {
    const data = settings.value.enginesData
    settings.value.enginesData.forEach((item, index) => {
      if (item.id === id)
        data.splice(index, 1)
    })
  }
  function UpdateEnginesData(value: EnginesData) {
    settings.value.enginesData = value
  }
  function UpdateEngine(newItem: EngineItem): Promise<IMsgItem[]> {
    return new Promise((resolve) => {
      const resultMsg: Array<IMsgItem> = []
      if (newItem.isDefault === true) {
        settings.value.enginesData.forEach((item: EngineItem) => {
          const updateEnginesData = (item: EngineItem, newItem: EngineItem): void => {
            Object.assign(item, newItem)
            UpdateEnginesData(settings.value.enginesData)
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
      }
    })
  }
  function ToggleVisible(item: string) {
    if (settings.value.visibleList.includes(item))
      settings.value.visibleList = removeArrItem(settings.value.visibleList, item)
    else
      settings.value.visibleList.push(item)
  }
  function UpdateVisibleList(value: VisibleList) {
    settings.value.visibleList = value
  }
  function UpdateHomeBackground(value: HomeBackground) {
    settings.value.homeBackground = value
  }
  function UpdateFollowSystemTheme(value: FollowSystemTheme) {
    settings.value.followSystemTheme = value
  }
  function UpdateLang(value: Lang) {
    settings.value.lang = value
  }
  function UpdateHomeBackgroundBlur(value: HomeBackgroundBlur) {
    settings.value.homeBackgroundBlur = value
  }
  function UpdateHomeBackgroundMask(v: HomeBackgroundMask) {
    settings.value.homeBackgroundMask = v
  }
  function UpdateTarget(v: Target) {
    settings.value.target = v
  }

  return {
    settings,

    defaultEngineData,
    GetEngineById,
    GetEngineByPrefix,

    UpdateSettings,
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
