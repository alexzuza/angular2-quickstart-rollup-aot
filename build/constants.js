var path = require('path');

var root = path.resolve(__dirname + '/..') + '/';

var APP_DIR_NAME = 'src';
var TEMP_DIR = root + "temp";
var APP_PROD = root + "temp/app-prod-compiled";

var config = {
  TEMP_DIR: TEMP_DIR,
  RXJS_TO_ES_DIR: TEMP_DIR + "/rxjs-es",
  ROLLUP_CONFIG: root + "build/rollup-config.js",
  DIST_DIR: root + "./prod",
  APP_ROLLUP_ENTRY: APP_PROD + "/" + APP_DIR_NAME + "/main-aot.js"
};

module.exports = config;
