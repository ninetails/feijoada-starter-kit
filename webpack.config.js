var path = require('path');
var util = require('util');
var configPath = util.format('config.%s.js', process.env.NODE_ENV || 'development');
configPath = path.join(__dirname, 'webpack', configPath);
module.exports = require(configPath);
