<script lang="ts" setup>
import { InformationCircleOutline as Info } from '@vicons/ionicons5'

defineProps<{
    title: string
    desc?: string
}>()
</script>

<template>
    <!-- <n-card :bordered="false">
        <n-collapse>
            <template #arrow>
                <slot name="icon"></slot>
            </template>
            <n-collapse-item :title="title">
                <template #header>
                    <n-popover
                        trigger="hover"
                        v-if="desc?.length"
                        :style="{ width: '200px' }"
                    >
                        <template #trigger>
                            <n-icon class="ml-1 text-gray-400" size="16">
                                <Info></Info>
                            </n-icon>
                        </template>
                        <span v-if="desc">{{ desc }}</span>
                    </n-popover>
                </template>
                <slot></slot>
            </n-collapse-item>
        </n-collapse>
    </n-card> -->

    <n-card :bordered="false">
        <template #header>
            <div class="flex items-center">
                <slot name="icon"></slot>
                <span class="ml-2 text-sm">{{ title }}</span>
                <n-popover
                    trigger="hover"
                    v-if="desc?.length"
                    :style="{ width: '200px' }"
                >
                    <template #trigger>
                        <n-icon class="ml-1 text-gray-400" size="16">
                            <Info></Info>
                        </n-icon>
                    </template>
                    <span v-if="desc">{{ desc }}</span>
                </n-popover>
            </div>
        </template>
        <slot></slot>
    </n-card>
</template>
