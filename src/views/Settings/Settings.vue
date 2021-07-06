<script lang="ts" setup>
import { ref } from 'vue'
import { SettingsOutline } from '@vicons/ionicons5'
import EnginesEditor from './EnginesEdit.vue'
import ModeSetting from './ModeSetting.vue'
import EnginesSort from './EnginesSort.vue'
import SettingsActions from './SettingsActions.vue'

const drawerVisible = ref(false)
</script>

<template>
	<n-icon
		size="20"
		color="red"
		class="!absolute top-8 right-8 cursor-pointer"
		@click="drawerVisible = true"
	>
		<settings-outline></settings-outline>
	</n-icon>
	<n-drawer v-model:show="drawerVisible" :width="400" placement="right">
		<n-drawer-content body-content-style="padding:0;" closable>
			<template #header>
				<div class="flex items-center">
					<n-icon>
						<settings-outline></settings-outline>
					</n-icon>
					<span class="ml-2">设置</span>
				</div>
			</template>
			<engines-editor></engines-editor>
			<engines-sort></engines-sort>
			<mode-setting></mode-setting>
			<settings-actions></settings-actions>
		</n-drawer-content>
	</n-drawer>
</template>
