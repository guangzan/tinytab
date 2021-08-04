<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { LinkOutline } from '@vicons/ionicons5'
import { useStore } from 'vuex'
import { MutationType } from '../../store/mutations'
import type { Target } from '@/types'

const { t } = useI18n()
const store = useStore()

const target = ref('_self')

function updateTarget(v: Target) {
    target.value = v
}

watch(
    () => store.getters.GetTarget,
    (v) => updateTarget(v)
)

onMounted(() => {
    updateTarget(store.getters.GetTarget)
})

type TargetList = Array<{
    value: Target
    label: string
}>

const targetList = ref<TargetList>([
    {
        value: '_blank',
        label: '在新标签页打开',
    },
    {
        value: '_self',
        label: '在当前标签页打开',
    },
])

function handleUpdateTarget(v: Target) {
    store.commit(MutationType.UpdateTarget, v)
}
</script>

<template>
    <pannel :title="t('targetSetting.title')">
        <template #icon>
            <NIcon>
                <LinkOutline />
            </NIcon>
        </template>
        <div>
            <n-radio-group @update:value="handleUpdateTarget" :value="target">
                <n-radio-button
                    v-for="target in targetList"
                    :key="target.value"
                    :value="target.value"
                >
                    {{ target.label }}
                </n-radio-button>
            </n-radio-group>
        </div>
    </pannel>
</template>
