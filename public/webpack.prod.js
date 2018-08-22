const glob = require('glob-all');
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {ImageminWebpackPlugin} = require("imagemin-webpack");
const imageminOptipng = require("imagemin-optipng");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminSvgo = require("imagemin-svgo");
const PurifyCSSPlugin = require("purifycss-webpack");
const PATHS = path.join(__dirname, '../../www/app/templates/');
let Files = [];

glob(PATHS + "**/**/**/*.ss", function (er, files) {
    for (let i = 0; i < files.length; i++) {
        Files.push(files[i]);
    }
})

module.exports = {
    entry: {
        app: ['./src/js/entry.js', './src/css/main.scss'],
    },
    output: {
        filename: "js/[name].min.js",
        path: path.resolve(__dirname, "./dist"),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ss/,
                loader: 'silverstripe-template-loader'
            },
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
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                    publicPath: '/public/dist/',
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css',
            chunkFilename: "[id].css"
        }),
        new PurifyCSSPlugin({
            paths: (Files),
            purifyOptions: {
                minify: true,
                info: true,
                rejected: true,
                whitelist: ['*js*']
            }
        }),
        new ImageminWebpackPlugin({
            imageminOptions: {
                plugins: [
                    imageminOptipng({
                        optimizationLevel: 5
                    }),
                    imageminGifsicle({
                        interlaced: true
                    }),
                    imageminJpegtran({
                        progressive: true
                    }),
                    imageminSvgo({
                        removeViewBox: true
                    })
                ]
            }
        })
    ],
}