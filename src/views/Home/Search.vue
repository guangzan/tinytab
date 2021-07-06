<script lang="ts" setup>
import Engines from './Engines.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { hexToRgba } from '../../utils/tools'
import type { EngineItem } from '@/types'
import { isEngineAttrValue } from '@/utils/tools'
import type { DropdownOption } from 'naive-ui'
import { MutationType } from '@/store/mutations'
import {
	CloseSharp as Close,
	ReturnDownBackSharp,
	SearchOutline as Search,
} from '@vicons/ionicons5'

const store = useStore()
const currentEngine = ref<EngineItem>(store.getters.getDefaultEngineData)
const searchValue = ref('')
const suffix = ref<any>([])

onMounted(() => {
	const searchInput = document.querySelector(
		'.search-component'
	) as HTMLInputElement
	setTimeout(() => {
		searchInput.focus()
	}, 300)
	suffix.value = currentEngine.value.suffix
})

watch(currentEngine, () => {
	suffix.value = currentEngine.value.suffix
})

function handleSetInputStyle() {
	const searchInput = document.querySelector(
		'.search-component'
	) as HTMLInputElement
	const searchIcon = document.querySelector('.icon-search') as HTMLElement
	const color = currentEngine.value.color
	const shadowColor = hexToRgba(color, 0.3)

	searchInput.style.borderColor = color
	searchInput.style.boxShadow = `0 0 0 3px ${shadowColor}`
	searchIcon.style.color = color
}

function handleClearInputStyle() {
	const searchInput = document.querySelector(
		'.search-component'
	) as HTMLInputElement
	const searchIcon = document.querySelector('.icon-search') as HTMLElement

	searchInput.style.borderColor = ''
	searchInput.style.boxShadow = ''
	searchIcon.style.color = 'gray'
}

function handleSubmit(): void {
	let url = `${currentEngine.value?.baseUrl}${searchValue.value}`

	if (searchValue.value.length && suffix.value.length) {
		url += ' ' + suffix.value.join(' ')
	}

	window.open(url)
}

function handleBlurInput(e: any) {
	handleClearInputStyle()
}

function clearSearchValue() {
	searchValue.value = ''
}

function handleChangeEngine(engineId: number): void {
	const engineData = store.getters.GetEngineById(engineId)
	const searchInput = document.querySelector(
		'.search-component'
	) as HTMLInputElement

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
function handleCloseSuffix(suffixItem: string) {
	suffix.value = suffix.value.filter((item: string) => item !== suffixItem)
}

// watch(searchValue, (searchValue, prevSearchValue) => {
// 	console.log(searchValue)
// })

// watch(searchEngine, (searchEngine) => {
// 	let suffixArr = currentEngine.value.suffix as any
// 	suffixArr = suffixArr.map((item: any) => (item = { lable: item, key: item }))
// 	console.log(searchEngine)
// })
</script>

<template>
	<div class="mx-auto mt-40 w-2/5 rounded-lg <md:w-4/5">
		<div class="relative w-full flex items-center">
			<n-icon
				size="20"
				class="
					icon-search
					!absolute
					left-4
					cursor-pointer
					text-gray-500
					transition
				"
				@click="handleSubmit"
			>
				<Search></Search>
			</n-icon>
			<input
				type="text"
				class="
					search-component
					px-10
					w-full
					h-10
					outline-none
					border-2 border-gray-500
					rounded-xl
					placeholder-gray-500
					transition
					dark:(
					bg-gray-800
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
			<div
				class="flex justify-center !absolute right-10 mb-2"
				:style="{ top: '7.8px' }"
			>
				<n-space>
					<n-tag
						closable
						size="small"
						v-for="(item, index) in suffix"
						:key="index"
						@close="handleCloseSuffix(item)"
					>
						{{ item }}
					</n-tag>
				</n-space>

				<!-- <n-dynamic-tags size="small" v-model:value="suffix" /> -->
			</div>
			<n-icon
				size="20"
				color="red"
				class="!absolute right-4 cursor-pointer"
				v-show="searchValue !== ''"
				@click="clearSearchValue"
			>
				<close></close>
			</n-icon>
		</div>
		<engines class="mt-4" @change-engine="handleChangeEngine"></engines>
	</div>
</template>
