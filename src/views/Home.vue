<template>
    <Search></Search>
    <Settings></Settings>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from '../components/Search.vue'
import Settings from '../components/settings/Settings.vue'
export default defineComponent({
    components: {
        Search,
        Settings,
    },
})
</script>
