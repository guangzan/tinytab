<script lang="ts" setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings.store'

defineOptions({
	name: 'home-engines-list',
})

const store = useSettingsStore()
const enginesData = computed(() => store.enginesData)

const emit =
	defineEmits<{
		(event: 'change-engine', searchEngine: number): void
	}>()

function handleChooseSearchEngine(id: number): void {
	emit('change-engine', id)
}
</script>

<template>
	<div>
		<n-space>
			<n-button
				v-for="(item, index) in enginesData"
				:key="index"
				:color="item.color"
				@click="handleChooseSearchEngine(item.id)"
				ghost
				size="small"
				>{{ item.name }}
				<!-- <template #default>
					<span class="text-gray-700 dark:text-gray-300">{{
						item.name
					}}</span>
				</template> -->
			</n-button>
		</n-space>
	</div>
</template>
