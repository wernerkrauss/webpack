const path = require("path");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        app: ['./src/js/entry.js', './src/css/main.scss'],
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "./dist"),
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader:  'file-loader',
                options: {
                    name:  'images/[name].[ext]',
                    publicPath: '/public/dist/',
                }

            }
        ]
    },
    plugins: [
        new LiveReloadPlugin({
            protocol: 'http',
            hostname: '127.0.0.1',
            appendScriptTag: true
        }),
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: "[id].css"
        }),
    ],
}