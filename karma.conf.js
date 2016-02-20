var path = require('path');
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    singleRun: true,

    browsers: [ 'PhantomJS2' ],

    frameworks: [ 'mocha', 'chai' ],

    files: [ './tests.webpack.js' ],

    preprocessors: {
      './src/**/*.js': [ 'webpack', 'sourcemap', 'coverage' ],
      './test/**/*.js': [ 'webpack', 'sourcemap' ],
      './tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'spec', 'coverage' ],

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    coverageReporter: {
      type: 'html',
      dir: path.resolve(__dirname, 'reports', 'coverage'),

      instrumenterOptions: {
        istanbul: {
          noCompact: true
        }
      }
    }
  });
};
