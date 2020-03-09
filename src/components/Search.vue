<template>
    <div>
        <div id="searchInput">
            <el-input
                @keyup.enter.native="onSubmit"
                @input="change"
                clearable
                autofocus
                placeholder="请输入内容"
                v-model="value"
            >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api'

export default {
    setup(props, ctx) {
        const value = ref('')

        const onSubmit = () => {
            location.href = 'https://www.baidu.com/s?wd=' + value.value
        }

        const change = v => {
           value.value = v
        }

        onMounted(() => {
            // value.value = 2222
        })

        return {
            value,
            onSubmit,
            change,
        }
    },
}
</script>

<style scoped>
#searchInput {
    width: 30vw;
    margin: 30vh auto auto;
}
</style>
