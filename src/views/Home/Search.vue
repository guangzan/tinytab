<script lang="ts" setup>
import Engines from './Engines.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { hexToRgba } from '../../utils/tools'
import {
	CloseSharp as Close,
	ReturnDownBackSharp,
	SearchOutline as Search,
} from '@vicons/ionicons5'
import type { EngineItem } from '@/types'
import { isEngineAttrValue } from '@/utils/tools'
import type { DropdownOption } from 'naive-ui'
import { MutationType } from '@/store/mutations'

const store = useStore()
const currentEngine = ref<EngineItem>(store.getters.getDefaultEngineData)
const searchValue = ref('')
const suffix = ref<DropdownOption>()

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
	searchIcon.style.color = 'gray'
}

function handleSubmit(): void {
	window.open(`${currentEngine.value?.baseUrl}${searchValue.value}`)
}

function handleBlurInput(e: any) {
	handleClearInputStyle()
}

function clearSearchValue() {
	searchValue.value = ''
}

function handleChangeEngine(engineId: number): void {
	const engineData = store.getters.GetEngineById(engineId)
	const searchInput = document.querySelector('.search-component') as HTMLInputElement

	currentEngine.value = engineData
	handleSetInputStyle()
	searchInput.focus()
}

/**
 * 输入时按下空格触发
 * 更具前缀切换引擎
 */
function hanldePressSpace() {
	const str = searchValue.value
	const index = str.indexOf(' ')
	const prefix = str.substring(0, index)

	if (!prefix.length) return
	if (!isEngineAttrValue('prefix', prefix)) return

	const engineData = store.getters.GetEngineByPrefix(prefix)
	handleChangeEngine(engineData.id)
	searchValue.value = ''
}

/**
 * 选择后缀时触发
 */
function handleSelectSuffix() {}

// watch(searchValue, (searchValue, prevSearchValue) => {
// 	console.log(searchValue)
// })

// watch(searchEngine, (searchEngine) => {
// 	let suffixArr = currentEngine.value.suffix as any
// 	suffixArr = suffixArr.map((item: any) => (item = { lable: item, key: item }))
// 	console.log(searchEngine)
// })

onMounted(() => {
	const searchInput = document.querySelector('.search-component') as HTMLInputElement
	setTimeout(() => {
		searchInput.focus()
	}, 300)
})
</script>

<template>
	<div class="mx-auto mt-40 w-2/5 rounded-lg <md:w-4/5">
		<div class="relative w-full flex items-center">
			<n-icon
				size="20"
				class="icon-search absolute left-4 cursor-pointer text-gray-500"
				@click="handleSubmit"
			>
				<Search></Search>
			</n-icon>
			<n-dropdown @select="handleSelectSuffix" :show="true" :options="suffix">
				<input
					type="text"
					class="
						search-component
						px-10
						w-full
						h-10
						outline-none
						border-2 border-gray-500
						rounded-3xl
						placeholder-gray-500
						dark:(bg-gray-800
						text-light-500
						placeholder-gray-400
						)
					"
					v-model="searchValue"
					:placeholder="currentEngine.placeholderText"
					@keyup.enter="handleSubmit"
					@keyup.space="hanldePressSpace"
					@focus="handleSetInputStyle"
					@blur="handleBlurInput"
				/>
			</n-dropdown>
			<n-icon
				size="20"
				color="red"
				class="absolute right-4 cursor-pointer"
				v-show="searchValue !== ''"
				@click="clearSearchValue"
			>
				<close></close>
			</n-icon>
		</div>

		<engines class="mt-4" @change-engine="handleChangeEngine"></engines>
	</div>
</template>
