const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].[contenthash].js",
    },
    mode: process.env.NODE_ENV || "development",
    module: {
        rules: [
            {
                // JSX 및 JS 파일 처리
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                // CSS 파일 처리
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                // 이미지 파일 처리
                test: /\.(png|jpe?g|gif|svg)$/,
                include: path.resolve(__dirname, "public"), // include 추가
                type: "asset/resource", // file-loader 대신 asset 모듈 사용
                generator: {
                    filename: "images/[name][ext]", // generator 설정 추가
                },
            },
            {
                // JSON 파일 처리
                test: /\.json$/,
                type: "javascript/auto",
                use: "json-loader",
            },
        ],
    },
    resolve: {
        // 파일 확장자 처리
        extensions: [".js", ".jsx", ".json", ".css", ".png"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: "public/images", to: "images" }],
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(env),
            "process.env.PUBLIC_URL": JSON.stringify(""),
        }), // 환경 변수 주입
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        hot: true,
        historyApiFallback: true,
        proxy: [
            {
                context: ["/api"],
                target: "http://localhost:8080/",
                // target: "http://52.79.175.221:8080/",
                changeOrigin: true,
                pathRewrite: { "^/api": "" },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
        runtimeChunk: "single", // 런타임 청크 분리
        usedExports: true,
    },
    devtool: "source-map",
};
