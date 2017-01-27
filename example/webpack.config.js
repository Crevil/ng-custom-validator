var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./example/app.ts",
    output: {
        filename: "[name].js",
        path: "dist",
    },
    resolve: {
        extensions: ["", ".ts", ".js"],
    },
    externals: {
        "angular": "angular"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./example/index.html",
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
    ],
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
            },
            {
                test: /\.html$/,
                loader: "html",
            },
        ],
    },
};
