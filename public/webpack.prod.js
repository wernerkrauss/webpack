const glob = require('glob-all');
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {ImageminWebpackPlugin} = require("imagemin-webpack");
const imageminOptipng = require("imagemin-optipng");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminSvgo = require("imagemin-svgo");
const PurifyCSSPlugin = require("purifycss-webpack");
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  MyPlugin = require('./plugin.js')
const PATHS = path.join(__dirname, '../../www/app/templates/');
let Files = [];

glob(PATHS + "**/**/**/*.ss", function (er, files) {
    for (let i = 0; i < files.length; i++) {
        Files.push(files[i]);
    }
});


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
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')({'browsers': ['> 1%', 'last 2 versions']}),

                            ]
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
            {
                test: /\.ss/,
                loader: 'silverstripe-template-loader'
            }
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
        }),
        new HtmlWebpackPlugin({
            excludeChunks: ['app'],
            filename: 'icons.html',
            template: './src/icons/icons.html',

        }),
        new WebappWebpackPlugin({
            // Your source icons
            logo: './src/icons/icon.png',
            // The prefix for all image files (might be a folder or a name)
            // Emit all stats of the generated icons
            emitStats: false,
            // The name of the json containing all favicon information
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: true,
            // Inject the html into the html-webpack-plugin
            inject: 'force',
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: '#fff',
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: 'Webpack App',
            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
    ],
}