const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "eval-source-map",
    entry: __dirname + "/app/js/index.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./build",
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                },
                exclude: /node_modules/
            }, {
                test: /(\.less|\.css)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
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
            template: __dirname + "/app/index.tmpl.html"
        })
    ]
}