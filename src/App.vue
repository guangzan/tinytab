<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from './store/actions'
import { darkTheme, NConfigProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
	// common: {
	//     primaryColor: store.state.primaryColor,
	//     primaryColorHover: 'red',
	//     primaryColorPressed: 'green',
	// },
}

const store = useStore()

const theme = computed(() => (store.state.theme === 'dark' ? darkTheme : undefined))

store.dispatch(ActionTypes.InitTheme)
</script>

<template>
	<n-config-provider :theme="theme" :theme-overrides="themeOverrides">
		<n-notification-provider>
			<n-message-provider>
				<router-view />
			</n-message-provider>
		</n-notification-provider>
	</n-config-provider>
</template>

<style lang="scss">
html,
body,
#app {
	width: 100%;
	height: 100%;
}

#app {
	overflow: hidden;
}
</style>
