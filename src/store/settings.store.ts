import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorageAsync } from '@vueuse/core'
import * as _ from 'lodash-es'
import type * as TT from '@/types'
import { removeArrItem } from '@/utils/tools'
import { initialSettings } from '@/constants/settings'
import { STORAGE_KEY_PREFIX } from '@/constants/keys'

export const useSettingsStore = defineStore('settings', () => {
  const settings = useStorageAsync<TT.TTSettings>(`${STORAGE_KEY_PREFIX}_SETTINGS`, initialSettings)
  const defaultEngine = computed(() => settings.value.engines.filter(engine => engine.isDefault === true)[0])
  const GetEngineById = (id: number) => settings.value.engines.filter(engine => engine.id === id)[0]
  const GetEngineByPrefix = (prefix: string) => settings.value.engines.filter(engine => engine.prefix === prefix)
  const GetVisible = (node: TT.TTVisibleElements) => settings.value.visibleList.includes(node)

  function UpdateSettings(v: TT.TTSettings) {
    settings.value = v
  }
  function UpdateTheme(key: keyof TT.TTTheme, value: TT.TTTheme[keyof TT.TTTheme]) {
    _.set(settings.value.theme, key, value)
  }
  function UpdateHomeBackground(key: keyof TT.TTHomeBackground, value: TT.TTHomeBackground[keyof TT.TTHomeBackground]) {
    _.set(settings.value.homeBackground, key, value)
  }
  function UpdateSearch(key: keyof TT.TTSearch, value: TT.TTSearch[keyof TT.TTSearch]) {
    _.set(settings.value.homeBackground, key, value)
  }
  function CreateEngine(value: TT.TTEngine) {
    if (value.isDefault === true)
      settings.value.engines.map(item => (item.isDefault = false))

    settings.value.engines.push(value)
  }
  function DeleteEngine(id: number) {
    const data = settings.value.engines
    settings.value.engines.forEach((item, index) => {
      if (item.id === id)
        data.splice(index, 1)
    })
  }
  function UpdateEngine(newItem: TT.TTEngine): Promise<TT.TTMsgItem[]> {
    return new Promise((resolve) => {
      const resultMsg: Array<TT.TTMsgItem> = []
      if (newItem.isDefault === true) {
        settings.value.engines.forEach((item: TT.TTEngine) => {
          const updateengines = (item: TT.TTEngine, newItem: TT.TTEngine): void => {
            Object.assign(item, newItem)
            UpdateEngines(settings.value.engines)
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
            updateengines(item, newItem)
          }
        })
      }
    })
  }
  function UpdateEngines(value: TT.TTEngine[]) {
    settings.value.engines = value
  }
  function ToggleVisible(item: TT.TTVisibleElements) {
    if (settings.value.visibleList.includes(item))
      settings.value.visibleList = removeArrItem(settings.value.visibleList, item)
    else
      settings.value.visibleList.push(item)
  }
  function UpdateVisibleList(value: TT.TTVisibleElements[]) {
    settings.value.visibleList = value
  }
  function UpdateLang(value: TT.TTLang) {
    settings.value.lang = value
  }

  return {
    settings,
    defaultEngine,
    GetEngineById,
    GetEngineByPrefix,
    GetVisible,

    UpdateSettings,
    UpdateTheme,
    CreateEngine,
    DeleteEngine,
    UpdateEngine,
    UpdateEngines,
    ToggleVisible,
    UpdateVisibleList,
    UpdateHomeBackground,
    UpdateLang,
    UpdateSearch,
  }
})
