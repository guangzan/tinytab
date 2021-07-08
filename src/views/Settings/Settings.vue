<script lang="ts" setup>
import { ref, computed } from 'vue'
import { SettingsOutline } from '@vicons/ionicons5'
import EnginesEditor from './EnginesEdit.vue'
import ModeSetting from './ModeSetting.vue'
import EnginesSort from './EnginesSort.vue'
import SettingsActions from './SettingsActions.vue'
import VisibilitySettings from './VisibilitySettings.vue'
import BackgroundSetting from './BackgroundSetting.vue'
import { useStore } from 'vuex'

const store = useStore()
const drawerVisible = ref(false)
const homeSettingButtonVisible = computed(() =>
    store.getters.GetVisibleList.includes('homeSettingButton')
)
</script>

<template>
    <div
        class="
            group
            !absolute
            text-center
            w-8
            h-8
            leading-10
            top-6
            right-6
            cursor-pointer
        "
        @click="drawerVisible = true"
    >
        <div
            class="group-hover:block transition"
            :class="{ hidden: !homeSettingButtonVisible }"
        >
            <n-icon size="20" class="text-bg-dark-100 dark:text-gray-500">
                <settings-outline></settings-outline>
            </n-icon>
        </div>
    </div>

    <n-drawer v-model:show="drawerVisible" :width="400" placement="right">
        <n-drawer-content body-content-style="padding:0;" closable>
            <template #header>
                <div class="flex items-center">
                    <!-- <n-icon>
						<settings-outline></settings-outline>
					</n-icon> -->
                    <span>设置</span>
                </div>
            </template>
            <engines-editor></engines-editor>
            <engines-sort></engines-sort>
            <mode-setting></mode-setting>
            <BackgroundSetting></BackgroundSetting>
            <VisibilitySettings></VisibilitySettings>
            <settings-actions></settings-actions>
        </n-drawer-content>
    </n-drawer>
</template>
