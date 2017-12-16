/* eslint-disable no-var, strict, prefer-arrow-callback */
"use strict";

var path = require("path");
var webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

var packageJson = require("./package.json");

module.exports = {
  cache: true,
  entry: {
    main: "./src/dag.tsx",
  },
  output: {
    filename: "./react-dag.js",
    path: __dirname + "/dist",
    library: "reactDag",
    libraryTarget: "umd",
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
    "prop-types": "prop-types",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "@epegzz/sass-vars-loader", // read Sass vars from file or options
            options: {
              files: [path.resolve(__dirname, "src/styles/colors.js")],
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: [{ loader: "svg-sprite-loader", options: { symbolId: "[name]" } }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      watch: ["./src", "./test"], // optional but improves performance (less stat calls)
    }),
    new UglifyJsPlugin(),
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
};
