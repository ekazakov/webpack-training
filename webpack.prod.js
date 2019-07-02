'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const packageJSON = require('./package.json');
const common = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
/**
 * Here we defined all environment variables that will be available throughout
 * the application.
 */
const getEnvironmentVariables = environment => ({
    'process.env': {
        NODE_ENV: JSON.stringify(environment),
        APP_VERSION: JSON.stringify(packageJSON.version)
    }
});

/**
 * Additional plugins based on flags.
 * It also takes the environment (type) in case that forwarding is needed
 */
const getAdditionalPlugins = (flag, environment) => {
    switch (flag) {
        case 'analyze': {
            return [new BundleAnalyzerPlugin()];
        }
        default: {
            return [];
        }
    }
};

/**
 *
 * TL;DR - 'type' refers to build type therefore inferring the environment.
 *
 * Both 'type' and 'flag' come from the --env option that can be provided when
 * using the CLI. We use 'type' from build environment to avoid having the to set
 * at CLI level '--env-environment prod (or rc, dev, whatever)'.
 *
 **/
module.exports = ({ type, flag } = {}) => {
    const environment = type || 'production';
    const options = flag || null;

    return merge(common, {
        mode: 'production',
        devtool: 'source-map',
        output: {
            filename: '[name].[chunkhash:8].js',
            chunkFilename: 'chunk-[name].[chunkhash:8].js'
        },
        performance: {
            // Sets a warning for all assets and bundles exceeding 2.5mb
            hints: 'warning',
            maxEntrypointSize: 2500000,
            maxAssetSize: 2500000
        },
        optimization: {
            // splitChunks: {
            //     chunks: 'all',
            //     cacheGroups: {
            //         vendors: {
            //             test: /[\\/]node_modules[\\/]/,
            //             reuseExistingChunk: true,
            //             priority: -10
            //         }
            //     }
            // },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true, // Must be set to true if using source-maps in production
                    terserOptions: {
                        mangle: false,
                        compress: {
                            dead_code: true
                        },
                        output: {
                            beautify: true
                        }
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    }
                })
            ]
        },
        plugins: [
            new webpack.DefinePlugin(getEnvironmentVariables(environment)),
            new CleanWebpackPlugin(),
            ...getAdditionalPlugins(options, environment)
        ]
    });
};
