var HtmlWebpackPlugin = require('html-webpack-plugin');
var assign = require('object-assign');
var config = require('./config.js');

var webpackModule = config.module;
var webpackPlugins = config.plugins;

webpackModule.preLoaders = [
  { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
];

webpackPlugins.push(new HtmlWebpackPlugin());

module.exports = assign(config, {
  devtool: 'inline-source-map',

  module: webpackModule,

  plugins: webpackPlugins,

  eslint: {
    failOnError: true
  },

  isparta: {
    embedSource: true,
    noAutoWrap: true,
    babel: {
      presets: [ 'es2015', 'stage-0' ]
    }
  }
});
