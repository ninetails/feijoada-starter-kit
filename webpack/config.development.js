var path = require('path');
var util = require('util');
var assign = require('object-assign');
var pkgConfig = require('../package.json').config;
var config = require('./config.js');

var webpackModule = config.module;
var webpackEntries = config.entry;

webpackEntries.push('./src/index.jade');
webpackEntries.push('./src/index.styl');
webpackEntries.push(util.format(
  'webpack-dev-server/client?http://%s:%d',
  pkgConfig.devServerHost,
  pkgConfig.devServerPort
));
webpackEntries.push('webpack/hot/dev-server');

webpackModule.preLoaders = [
  { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
];

webpackModule.loaders.push(
  { test: /\.styl$/, loader: 'style!css?sourceMap&minimize!postcss!stylus', exclude: /node_modules/ }
);

webpackModule.loaders.push(
  { test: /\.jade$/, loader: 'file?name=[name].html!jade-html', exclude: /node_modules/ }
);

module.exports = assign(config, {
  debug: true,
  cache: true,
  devtool: 'inline-source-map',

  entry: webpackEntries,

  module: webpackModule,

  eslint: {
    failOnError: true
  },

  devServer: {
    contentBase: path.resolve(__dirname, pkgConfig.buildDir),
    hot: true,
    noInfo: false,
    inline: true,
    stats: { colors: true }
  }
});
