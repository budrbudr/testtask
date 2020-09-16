const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const routes = require('vue-router');
const optimize = () => {
    const config = {
        // splitChunks: {
        //     chunks: 'async',
        //     minSize: 300000,
        //     maxSize: 400000,
        //     minChunks: 1,
        //     maxAsyncRequests: 6,
        //     maxInitialRequests: 4,
        //     automaticNameDelimiter: '.',
        // },
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({

            }),

        ],
        minimize: true

    }
    return config
}

module.exports = {
    chainWebpack: config => {
        config.plugins.delete('prefetch');
        // config.plugin('preload').tap(options => {
        //     options[0].fileBlacklist = options[0].fileBlacklist || []
        //     options[0].fileBlacklist.push(/home(.)+?\.css$/)
        //     return options
        // })
        // config.plugins.delete('preload');
    },

    configureWebpack: config => {
        config.optimization = optimize();
        webpack.plugins = [
            new CleanWebpackPlugin(),
            new CompressionPlugin(),
            new MiniCssExtractPlugin(),
            new PreloadWebpackPlugin({
                rel: 'preload',
                as: ['app']
            }),

        ]
        webpack.module = {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ],
        }
    },


};
