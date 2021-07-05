<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'
import type { EngineItem } from '@/types'
import { MutationType } from '../../store/mutations'
import ModalForm from './ModalForm.vue'
import Pannel from './Pannel.vue'
import { CloseSharp as Close, TrashBinOutline as Trash, Add } from '@vicons/ionicons5'

const store = useStore()
const message = useMessage()
const showModal = ref(false)
const enginesData = computed(() => store.state.enginesData)
const operateType = ref<'add' | 'edit'>('add')
const engineId = ref(0)

/**
 * 点击添加按钮以添加引擎
 */
function handleAddEngine() {
	operateType.value = 'add'
	engineId.value = 0
	showModal.value = true
}

/**
 * 点击引擎名称以修改引擎
 */
function handleEditEngine(id: number): void {
	operateType.value = 'edit'
	engineId.value = id
	showModal.value = true
}

/**
 * 点击 x 以删除引擎
 */
function handleRemoveEngine(item: EngineItem): void {
	const { id, isDefault } = item
	if (isDefault) {
		message.error('不可以删除默认搜索引擎')
	} else {
		store.commit(MutationType.DeleteEngine, id)
		message.success('删除成功')
	}
}
</script>

<template>
	<pannel title="编辑引擎" desc="点击 x 以删除，点击名称进入编辑">
		<n-space>
			<n-button
				size="small"
				ghost
				:color="item.color"
				v-for="item in enginesData"
				:key="item.id"
			>
				<span @click="handleEditEngine(item.id)">{{ item.name }}</span>
				<n-popconfirm
					confirmButtonText="确认"
					cancelButtonText="取消"
					icon="el-icon-info"
					iconColor="red"
					title="要删除该搜索引擎吗？"
					positive-text="确认"
					negative-text="取消"
					@positive-click.stop="handleRemoveEngine(item)"
				>
					<template #icon>
						<n-icon color="red">
							<trash />
						</n-icon>
					</template>
					<template #trigger>
						<n-icon size="20" class="ml-1 hover:text-red-500">
							<close></close>
						</n-icon>
					</template>
					要删除这个搜索引擎吗
				</n-popconfirm>
			</n-button>
			<n-button type="success" size="small" @click="handleAddEngine">
				<template #icon>
					<n-icon>
						<Add></Add>
					</n-icon>
				</template>
			</n-button>
		</n-space>
	</pannel>
	<modal-form
		v-model:showModal="showModal"
		:operateType="operateType"
		:engineId="engineId"
	></modal-form>
</template>
