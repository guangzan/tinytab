import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default ({ mode }) => {
  const __DEV__ = mode === 'development'

  return defineConfig({
    base: __DEV__ ? '/' : './',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`
      }
    },
    plugins: [
      vue(),
      // tsx 手动导入的方式按需加载组件
      // createStyleImportPlugin({
      //     libs: [
      //         {
      //             libraryName: '@arco-design/web-vue',
      //             esModule: true,
      //             resolveStyle: (name) => `@arco-design/web-vue/es/${name}/style/css.js`,
      //         },
      //     ],
      // }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          }),
          NaiveUiResolver()
        ]
      }),
      VueI18nPlugin({
        include: resolve(__dirname, 'src/locales/**')
      }),
      UnoCSS()
      // yaml(),
    ],
    server: {
      open: true
    },
    build: {
      outDir: 'docs',
      cssCodeSplit: true,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1024,
      sourcemap: false
    }
  })
}
