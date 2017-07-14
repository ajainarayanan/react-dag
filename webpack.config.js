var webpack = require('webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

var buildmode = process.env.NODE_ENV;
var plugins = [
  new LodashModuleReplacementPlugin(),
  new StyleLintPlugin({
    syntax: 'scss',
    files: ['**/*.scss']
  })
];
var webpackconfig = {
  context: __dirname,
  entry: {
    'react-dag': './dag.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /node_module\/dagre\/dist\/dagre.core.js/,
        use: [
          'imports?this=>window',
          'script'
        ]
      },
      {
        test:  /\.(ttf|eot|svg|woff|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
      },
      {
        test: [
          /\.less$/
        ],
        use: [
          'style-loader', 
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins
};

if (['production', 'libtest'].indexOf(buildmode) !== -1) {
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
      }
    },
  });
  if (buildmode === 'production') {
    webpackconfig.plugins.push(
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
  }
} else if ('test') {
  webpackconfig = Object.assign({}, webpackconfig, {
    entry: {
      'index': './dev/index.js',
      'vendor': ['react', 'react-dom', 'redux', 'lodash', 'classnames']
    },
    output: {
      filename: './[name].js',
      path: __dirname + '/dist'
    }
  });
}


module.exports = webpackconfig;
