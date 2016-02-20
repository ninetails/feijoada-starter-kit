var webpack = require('webpack');
var assign = require('object-assign');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config.js');

var webpackEntries = config.entry;
webpackEntries.push('./src/index.styl');

var webpackModule = config.module;
webpackModule.loaders.push(
  { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&minimize!postcss!stylus'), exclude: /node_modules/ }
);

var configPlugins = config.plugins;
configPlugins.push(new ExtractTextPlugin('styles.css'));
configPlugins.push(new webpack.optimize.DedupePlugin());
configPlugins.push(new webpack.optimize.OccurrenceOrderPlugin());
configPlugins.push(new webpack.optimize.UglifyJsPlugin({
  mangle: true,
  output: {
    comments: false
  },
  compress: {
    warnings: false
  }
}));

module.exports = assign(config, {
  devtool: 'source-map',

  entry: webpackEntries,

  plugins: configPlugins
});
