var webpack = require('webpack');
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    'dag': './dag.js',
    'vendor': ['react', 'react-dom', 'redux', 'lodash', 'classname']
  },
  module: {
    loaders: [
      {
        test: require.resolve('jsPlumb'),
        loaders: [
          'imports?this=>window',
          'script'
        ]
      },
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
  output: {
    filename: './[name].js',
    path: __dirname + '/dist',
    library: 'dag',
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
  plugins: [
    new LodashModuleReplacementPlugin
  ]
};
