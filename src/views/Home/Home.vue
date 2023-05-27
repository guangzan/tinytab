<script setup lang="ts">
import settings from '../Settings/Settings.vue'
import Search from './Search.vue'

defineOptions({
  name: 'HomeView',
})
</script>

<template>
  <Search />
  <settings />
</template>
