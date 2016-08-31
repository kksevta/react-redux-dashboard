var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: null,
  entry: {
    app: "./app.js",
    vendor: [
      'axios',
      'react',
      'react-dom',
      'react-grid-layout',
      'react-bootstrap',
      'react-redux',
      'react-router',
      'redux',
      'redux-logger',
      'redux-thunk'
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      'dashboard-app/config': 'src/config',
      'dashboard-app/utils': 'src/utils',
      'dashboard-app/auth': 'src/modules/auth',
      'dashboard-app/dashboard-view': 'src/modules/dashboard-view',
      'dashboard-app/header': 'src/modules/header',
      'dashboard-app/widgets-container': 'src/modules/widgets-container',
      'dashboard-app/assets': 'src/assets',
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel-loader'],
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?prefix=font/&limit=5000"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.gif/,
        loader: "file?name=./images/[sha512:hash:base64:7].[ext]"
      },
      {
        test: /\.jpg/,
        loader: "file?name=./images/[sha512:hash:base64:7].[ext]"
      },
      {
        test: /\.png/,
        loader: "file?name=./images/[sha512:hash:base64:7].[ext]"
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name]-[hash].js"
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "[name]-[hash].js"),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
    new CopyWebpackPlugin([
      {
        from: './assets/',
        to: '../dist/assets/'
      }
    ]),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.tmpl.html"
    }),
  ],
};