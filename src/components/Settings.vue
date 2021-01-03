<template>
    <i class="el-icon-setting"></i>
    <div class="settings-form">
        <h3 class="settings-item-title">搜索引擎</h3>
        <el-tag
            v-for="item in enginesData"
            :key="item.name"
            closable
            type=""
            size="medium"
            effect="plain"
            :style="{ borderColor: red }"
        >
            {{ item.name }}
        </el-tag>
        <el-tag class="engines-tag" size="medium" type="danger">
            <i class="el-icon-plus"></i>
        </el-tag>
        <el-form ref="form" :model="engines" label-width="80px">
            <el-form-item label="名称">
                <el-input size="small" v-model="engines.name"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import enginesData from '../constants/enginesData'
export default defineComponent({
    setup() {
        const engines = reactive({
            name: '',
        })

        return {
            engines,
            enginesData,
        }
    },
})
</script>

<style lang="scss">
.el-icon-setting {
    position: absolute;
    top: 30px;
    right: 30px;
    color: red;
    font-size: 22px;
}
.settings-form {
    position: absolute;
    top: 10px;
    right: 0;
    background-color: #fff;
    padding: 20px;
}

.engines-tag {
    margin-right: 8px;
}
</style>
