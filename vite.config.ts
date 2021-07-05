import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { ElementPlusResolver, NaiveUiResolver } from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import placeholderColor from 'windicss/colors'

export default defineConfig({
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, 'src')}/`,
        },
    },
    server: {
        open: false,
    },
    plugins: [
        vue(),
        ViteComponents({
            globalComponentsDeclaration: true,
            customComponentResolvers: [ElementPlusResolver(), NaiveUiResolver()],
        }),
        WindiCSS(),
    ],
})
