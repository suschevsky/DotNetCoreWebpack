const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const webpackConfig = {
    entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        about: path.resolve(__dirname, 'src/about.ts'),
        contact: path.resolve(__dirname, 'src/contact.ts'),
        criticalCss: path.resolve(__dirname, 'src/criticalCss.ts')
    },
    output: {
        path: path.join(__dirname, 'wwwroot'),
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:8080/wwwroot/'
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
    },
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        stats: 'errors-only'        
    }
};

if (isProduction) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
    webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;
