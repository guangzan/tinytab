<template>
    <div id="app">
        <!-- <ThemePicker></ThemePicker> -->
        <Search></Search>
    </div>
</template>

<script>
import Search from '@/components/Search'
// import ThemePicker from '@/components/ThemePicker'

export default {
    name: 'App',
    components: {
        Search,
        // ThemePicker,
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
html {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#app {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f7f7f7;
    /* background-image: url('./assets/images/bg1.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%; */
}
</style>
