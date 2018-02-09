const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "eval-source-map",
    // devtool: "eval",
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./build",
        historyApiFallback: true,
        inline: true,
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            }, {
                test: /(\.less|\.css)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("Add by shuo."),
        new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({
            template: __dirname + "/static/index.tmpl.html"
        })
    ]
}