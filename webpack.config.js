'use strict';
var webpack = require('webpack');
var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

let prod = process.env.NODE_ENV === 'production';
let plugins = [
  new LodashModuleReplacementPlugin
];
let webpackconfig = {
  context: __dirname,
  entry: {
    'react-dag': './dag.js'
  },
  module: {
    loaders: [
      {
        test: /node_module\/dagre\/dist\/dagre.core.js/,
        loaders: [
          'imports?this=>window',
          'script'
        ]
      },
      {
        test:  /\.(ttf|eot|svg|woff|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: [
          /\.less$/
        ],
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: ['lodash'],
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins
};

if (prod) {
  webpackconfig = Object.assign({}, webpackconfig, {
    output: {
      filename: './[name].js',
      path: __dirname + '/dist',
      library: 'reactDag',
      libraryTarget: 'umd'
    },
    externals: {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'classname': 'classname'
    },
  });
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
        dead_code: true
      },
      output: {
        comments: false
      }
    })
  );
} else {
  webpackconfig = Object.assign({}, webpackconfig, {
    entry: {
      'index': './dev/index.js',
      'vendor': ['react', 'react-dom', 'redux', 'lodash', 'classname']
    },
    output: {
      filename: './[name].js',
      path: __dirname + '/dist'
    }
  });
}


module.exports = webpackconfig;
