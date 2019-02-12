var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var Path = require('path')


module.exports = {
    resolve: {
        alias: {
            "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        }
    },
    entry: './src/app.js',
    output: {
        path: __dirname+ '/dist',
        filename: './dist/app.bundle.js'
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test: /\.(jpg|png|woff(2)?|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.pdf$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        compress: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Conor Rogers",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeScriptTypeAttributes: true,
                removeAttributeQuotes: true,
                useShortDoctype: true,
                minifyCSS: true
            },
            hash: true,
            template: './src/index.html'

        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: false,
            allChunks: true
        })
        // new UglifyJSPlugin({
        // })
    ]
}