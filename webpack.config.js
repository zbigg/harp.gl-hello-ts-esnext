const webpack = require("webpack");
const merge = require("webpack-merge");

const path = require("path");

const commonConfig = {
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.ts", ".ts", ".tsx", ".web.js", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    onlyCompileBundledFiles: true,
                    // use the main tsconfig.json for all compilation
                    configFile: path.resolve(__dirname, "tsconfig.json")
                }
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            // default NODE_ENV to development. Override by setting the environment variable NODE_ENV to 'production'
            NODE_ENV: process.env.NODE_ENV || "development"
        })
    ],
    performance: {
        hints: false
    },
    mode: process.env.NODE_ENV || "development"
};

const appConfig = merge(commonConfig, {
    entry: {
        index: "./index.ts"
    }
});
const mapDecodersWorkerConfig = merge(commonConfig, {
    target: "webworker",
    entry: {
        decoder: "./map-decoder-worker.ts"
    },
    output: {
        filename: "map-decoder-worker.bundle.js"
    },
    mode: process.env.NODE_ENV || "development"
});

module.exports = [appConfig, mapDecodersWorkerConfig];
