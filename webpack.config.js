'use strict';

const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * HtmlWebpackPlugin configurations
 */
const HtmlWebpackConfig = {
    inject: true,
    template: path.resolve(__dirname, 'public/index.html'),
    favicon: path.resolve(__dirname, 'public/favicon.ico')
};

module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    'eslint-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                    priority: -10
                }
            }
        }
    },
    plugins: [
        // new HtmlWebpackPlugin(HtmlWebpackConfig),
        // new CopyWebpackPlugin([{ from: 'public/static.json', to: 'static.json' }]),
        new DashboardPlugin(),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'md4',
            hashDigest: 'base64',
            hashDigestLength: 8
        }),
        new CleanWebpackPlugin()
    ]
};
