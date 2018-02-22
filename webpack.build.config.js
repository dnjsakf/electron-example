const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

const webpack = require("webpack");
const { resolve } = require("path");

const SRC_DIR = resolve(__dirname, 'src');
const OUTPUT_DIR = resolve(__dirname, 'build');
const defaultIncludes = [SRC_DIR];

module.exports = {
    entry:[ 
        './src/index.js', 
        './src/style.css'
    ],
    output: {
        path: OUTPUT_DIR,
        filename: 'bundle.js',
        publicPath: "/"
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use:[{ loader: 'babel-loader' }],
                exclude: /node_modules/,
                include: defaultIncludes
            },
            {
                test: /\.css$/,
                use: [
                    { loader:'style-loader' },
                    { loader:'css-loader' }
                ],
                include: defaultIncludes
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new BabiliWebpackPlugin()
    ],
    target: 'electron-renderer',
    stats: {
        colors: true,
        chunks: false,
        children: false
    },
}