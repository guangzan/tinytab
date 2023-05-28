<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

import Engines from './Engines.vue'
import { useSettingsStore } from '@/store/settings.store'
import type { TTEngine, TTTarget } from '@/types'
import { hexToRgba, isEngineAttrValue } from '@/utils/tools'

defineOptions({
  name: 'HomeSearch',
})

const store = useSettingsStore()

const currentEngine = ref<TTEngine>(store.defaultEngine)
const searchValue = ref('')
const suffix = ref<any>([])
const hasHomeBackground = ref()
const target = ref()
const showHomeEngines = computed(() => store.settings.visibleList.includes('homeEngines'))

function updateHasHomeBackground(v: boolean): void {
  hasHomeBackground.value = v
}

function updateTarget(v: TTTarget) {
  target.value = v
}

watch(
  () => store.settings.search.target,
  v => updateTarget(v),
)

watch(
  () => store.settings.homeBackground.src,
  v => updateHasHomeBackground(v !== ''),
)

onMounted(() => {
  const searchInput = document.querySelector('.search-component') as HTMLInputElement
  setTimeout(() => {
    searchInput.focus()
  }, 300)

  suffix.value = currentEngine.value.suffix
  updateHasHomeBackground(store.settings.homeBackground.src !== '')
  updateTarget(store.settings.search.target)
})

watch(currentEngine, () => {
  suffix.value = currentEngine.value.suffix
})

function handleSetInputStyle() {
  const searchInput = document.querySelector('.search-component') as HTMLInputElement
  const searchIcon = document.querySelector('.icon-search') as HTMLElement
  const color = currentEngine.value.color
  const shadowColor = hexToRgba(color, 0.3)

  searchInput.style.borderColor = color
  searchInput.style.boxShadow = `0 0 0 3px ${shadowColor}`
  searchIcon.style.color = color
}

function handleClearInputStyle() {
  const searchInput = document.querySelector('.search-component') as HTMLInputElement
  const searchIcon = document.querySelector('.icon-search') as HTMLElement
  searchInput.style.borderColor = ''
  searchInput.style.boxShadow = ''
  searchIcon.style.color = ''
}

function handleSubmit(): void {
  let url = `${currentEngine.value?.baseUrl}${encodeURIComponent(searchValue.value)}`

  if (searchValue.value.length && suffix.value.length)
    url += ` ${suffix.value.join(' ')}`

  // Use `window.location.href` instead of  `window.open(url, '_self')`
  target.value === '_self' ? (window.location.href = url) : window.open(url)
}

function clearSearchValue() {
  searchValue.value = ''
}

function handleChangeEngine(engineId: number): void {
  currentEngine.value = store.GetEngineById(engineId)
  const searchInput = document.querySelector('.search-component') as HTMLInputElement
  handleSetInputStyle()
  searchInput.focus()
}

/**
 * Triggered by pressing space while typing
 * More prefix switching engine
 */
function hanldePressSpace() {
  const str = searchValue.value
  const index = str.indexOf(' ')
  const prefix = str.substring(0, index)

  if (!prefix.length)
    return
  if (!isEngineAttrValue('prefix', prefix))
    return

  const engineData = store.GetEngineByPrefix(prefix)
  handleChangeEngine(engineData.id)
  searchValue.value = ''
}

/**
 * Triggered when suffix is selected
 */
function handleCloseSuffix(suffixItem: string) {
  suffix.value = suffix.value.filter((item: string) => item !== suffixItem)
}
</script>

<template>
  <div class="mx-auto pt-40 w-2/5 rounded-lg <md:w-4/5">
    <div
      class="search-component relative w-full h-10 flex items-center rounded-[20px] border border-gray-500 border-solid  border-dark overflow-hidden"
      :class="{
        'translate-y-6': !showHomeEngines,
        '-translate-y-8': hasHomeBackground,
      }"
    >
      <icon-search class="icon-search text-coolgray !absolute left-4 cursor-pointer" @click="handleSubmit" />
      <input
        v-model="searchValue"
        type="text"
        class="px-10 w-full h-full text-base border-none outline-none bg-transparent dark:text-white"
        :class="hasHomeBackground && ['bg-[rgba(255,255,255,0.7)]', 'dark:bg-[rgba(0,0,0,0.7)]']"
        :placeholder="currentEngine.placeholderText"
        @keyup.enter="handleSubmit"
        @keyup.space="hanldePressSpace"
        @focus="handleSetInputStyle"
        @blur="handleClearInputStyle"
      >
      <div class="flex justify-center !absolute right-10 mb-2" :style="{ top: '7.8px' }">
        <a-space>
          <n-tag
            v-for="(item, index) in suffix"
            :key="index"
            closable
            size="small"
            @close="handleCloseSuffix(item)"
          >
            {{ item }}
          </n-tag>
        </a-space>
      </div>
      <icon-close v-show="searchValue !== ''" class="text-red !absolute right-4 cursor-pointer" @click="clearSearchValue" />
    </div>
    <Engines
      v-if="showHomeEngines"
      class="mt-4 transform transition"
      :class="{ '-translate-y-8': hasHomeBackground }"
      @change-engine="handleChangeEngine"
    />
  </div>
</template>
