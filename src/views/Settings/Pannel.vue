<script lang="ts" setup>
import { defineProps } from 'vue'
import { InformationCircleOutline as Info } from '@vicons/ionicons5'

const props =
	defineProps<{
		title: string
		desc?: string
	}>()
</script>

<template>
	<n-card :bordered="false" header-style="font-size:13px;">
		<template #header>
			{{ props.title }}
			<n-popover
				trigger="hover"
				v-if="props.desc?.length"
				:style="{ width: '200px' }"
			>
				<template #trigger>
					<n-icon class="text-gray-400" size="20">
						<Info></Info>
					</n-icon>
				</template>
				<span>{{ props.desc }}</span>
			</n-popover>
		</template>
		<slot></slot>
	</n-card>
</template>
