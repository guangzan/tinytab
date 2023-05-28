import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorageAsync } from '@vueuse/core'
import * as _ from 'lodash-es'
import type * as TT from '@/types'
import { removeArrItem } from '@/utils/tools'
import { initialSettings } from '@/constants/settings'
import { STORAGE_KEY_PREFIX } from '@/constants/keys'
import { Noti } from '@/composables/notification'

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
  function UpdateEngine(newItem: TT.TTEngine) {
    let isEditDefaultEngine = false
    if (!newItem.isDefault) {
      for (let i = 0; i < settings.value.engines.length; i++) {
        const item = settings.value.engines[i]
        if (item.id === newItem.id && item.isDefault === true) {
          Noti({
            type: 'warning',
            content: '无法将默认搜索引擎取消, 已恢复此项设置-[设为默认]，其他设置项已保存',
          })
          isEditDefaultEngine = true
          newItem.isDefault = true
        }
      }
    }
    if (newItem.isDefault) {
      settings.value.engines = settings.value.engines.map((engine) => {
        if (engine.isDefault)
          engine.isDefault = false

        return engine
      })
    }
    settings.value.engines = settings.value.engines.map((engine) => {
      if (engine.id === newItem.id)
        return newItem
      return engine
    })
    if (!isEditDefaultEngine) {
      Noti({
        type: 'success',
        content: '修改成功',
      })
    }
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
