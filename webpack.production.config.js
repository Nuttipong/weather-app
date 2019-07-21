const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
    entry: {
        app: './src/index.js'
    },
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
});