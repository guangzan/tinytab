<script lang="ts" setup></script>

<template>
  <n-modal
    v-model:show="showExportModal"
    preset="card"
    title="导出配置"
    size="huge"
    :style="{ width: '460px', marginTop: '100px' }"
    :bordered="false"
    :mask-closable="true"
    @update:show="handleUpdateExportModal"
  >
    <div class="flex flex-col justify-center items-center my-8 mx-auto">
      <n-icon size="30" color="#34AC69">
        <component
          :is="downloading ? Loading : Success"
          :class="{ spin: downloading }"
        />
      </n-icon>
      <div class="mt-8">
        {{ downloading ? t('settingActions.generating') : t('settingActions.generated') }}
      </div>
    </div>
  </n-modal>
</template>
