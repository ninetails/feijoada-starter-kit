var path = require('path');
var webpack = require('webpack');
var jeet = require('jeet');
var autoprefixer = require('autoprefixer');
var pkgConfig = require('../package.json').config;

module.exports = {
  entry: [
    './src/index.js'
  ],

  output: {
    path: path.resolve(__dirname, '..', pkgConfig.buildDir),
    filename: 'bundle.js',
    publicPath: '/'
  },

  target: 'web',

  resolve: {
    extensions: ['', '.js', '.jsx', '.styl', '.jade'],

    alias: {
      src: path.join(__dirname, 'src'),
      components: 'src/components',
      reducers: 'src/reducers',
      actions: 'src/actions',
      constants: 'src/constants',
      utils: 'src/utils',
      lib: 'src/lib'
    }
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: { presets: [ 'es2015', 'stage-0' ] }, exclude: /node_modules/ },
      { test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/, loader: 'file?name=build/[path][name].[ext]' }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') },
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],

  babel: {
    presets: [ 'es2015', 'stage-0' ]
  },

  stylus: {
    use: [ jeet() ]
  },

  postcss: [
    autoprefixer
  ]
};
