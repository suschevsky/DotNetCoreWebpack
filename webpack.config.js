const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const webpackConfig = {
    entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        about: path.resolve(__dirname, 'src/about.ts'),
        contact: path.resolve(__dirname, 'src/contact.ts')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.scss$/,
                use: isProduction ? ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader',
                    fallback: 'style-loader'
                }) : ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    resolve: {
        extensions: [".js", ".scss", ".ts", ".tsx"]
    }
};

if (isProduction) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
    webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;