const env = process.env.BABEL_ENV
const CopyWebpackPlugin = require('copy-webpack-plugin')

if (env === 'production') {
    configureWebpack = {
        plugins: [
            new CopyWebpackPlugin([{ from: './background.js' }, { from: './manifest.json' }]),
        ],
    }
} else {
    configureWebpack = {}
}

module.exports = {
    publicPath: env === 'production' ? './' : '/',
    lintOnSave: false,
    configureWebpack,
    devServer: {
        host: 'localhost',
        port: '8081',
        open: true,
        https: false,
        hotOnly: true,
    },
}
