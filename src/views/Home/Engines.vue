<script lang="ts" setup>
import { defineEmits, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const enginesData = computed(() => store.state.enginesData)

const emit =
	defineEmits<{
		(event: 'change-engine', searchEngine: string): void
	}>()

function handleChooseSearchEngine(id: string): void {
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
				>{{ item.name }}</n-button
			>
		</n-space>
	</div>
</template>
