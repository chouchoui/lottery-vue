const webpack = require("webpack");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const os = require('os');

module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        config
            .plugin('fork-ts-checker')
            .tap(args => {
                let totalmem = Math.floor(os.totalmem() / 1024 / 1024); //get OS mem size
                let allowUseMem = totalmem > 5000 ? 4096 : 2048;
                args[0].memoryLimit = allowUseMem;
                return args
            });
    },
    configureWebpack: (config) => {
        let plugins = [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    ['js', 'css'].join('|') +
                    ')$',
                ),
                threshold: 10240,
                minRatio: 0.8,
            }),
        ];


        if (process.env.NODE_ENV !== 'development') {
            config.plugins = [...config.plugins, ...plugins];
        } else {
            config.devtool = 'source-map';
        }
    }
}