<template>
    <div class="search-container">
        <el-input
            placeholder="请输入内容"
            v-model="searchValue"
            class="search-component"
            @keyup.enter="handleSubmit"
        >
            <template #append>
                <el-button
                    icon="el-icon-search"
                    @click="handleSubmit"
                ></el-button>
            </template>
        </el-input>
        <el-row class="search-engines">
            <el-button
                v-for="(item, index) in searchEngines"
                :key="index"
                size="mini"
                @click="handleChooseSearchEngine(item.name)"
                :class="item.name"
                >{{ item.name }}</el-button
            >
        </el-row>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

const searchEngines = [
    {
        name: 'Baidu',
        icon: '',
    },
    {
        name: 'NPM',
        icon: '',
    },
    {
        name: 'Bing',
        icon: '',
    },
    {
        name: 'Google',
        icon: '',
    },
    {
        name: 'Sougou',
        icon: '',
    },
    {
        name: 'Yuque',
        icon: '',
    },
]

const searchUrls = {
    Baidu: 'https://www.baidu.com/s?ie=UTF-8&wd=',
    NPM: 'https://www.npmjs.com/search?q=',
    Bing: 'https://cn.bing.com/search?FORM=BESBTB&q=',
    Google: 'https://www.google.com/search?q=',
    Sougou: 'https://www.sogou.com/web?query=',
    Yuque: 'https://yuque.com/search?related=true&q=',
}

export default defineComponent({
    setup() {
        const searchValue = ref('')
        const searchEnine = ref('')
        const baseUrl = ref('')
        onMounted(() => {})

        const handleChooseSearchEngine = engine => {
            baseUrl.value = searchUrls[engine]
            searchEnine.value = engine
            document.querySelector('.search-component input').focus()
        }

        const handleSubmit = () => {
            const url = baseUrl.value + searchValue.value
            window.open(url)
        }

        return {
            searchValue,
            searchEngines,
            searchEnine,
            handleChooseSearchEngine,
            handleSubmit,
        }
    },
})
</script>

<style scoped lang="scss">
$sources-color: (
    Baidu: #2932e1,
    Bing: #0c8484,
    Sougou: #ff6f17,
    Google: #4285f4,
    NPM: #ea4335,
    Yuque: #28c46f,
);

@each $key, $item in $sources-color {
    .#{$key} {
        &.el-button {
            border-color: map-get($sources-color, $key);
        }
    }
}

.search-container {
    width: 30vw;
    margin: 20vh auto 0;
}

.search-engines {
    margin-top: 10px;
    button {
        margin-bottom: 8px;
    }
}

@media screen and (max-width: 1024px) {
    .search-container {
        width: 90%;
    }
}
</style>
