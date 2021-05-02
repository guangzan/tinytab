module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        '@vue/babel-plugin-jsx',
        [
            'import',
            {
                libraryName: 'element-plus',
                customStyleName: name => {
                    name = name.slice(3)
                    return `element-plus/packages/theme-chalk/src/${name}.scss`
                },
            },
        ],
    ],
}
