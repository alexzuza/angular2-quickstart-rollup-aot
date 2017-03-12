var gulp = require('gulp');
var util = require('gulp-util');
var runSequence = require('run-sequence');
var systemjsBuilder = require('systemjs-builder');

var config = {
  src: './tsc-es5/',
  build: {
    path: './bundle/'
  },
  systemJs: {
    builder: {
      sourceMaps: true,
      minify: true,
      mangle: false
    }
  }
}

gulp.task('build-systemjs', function (done) {
  var builder = new systemjsBuilder();
  builder.loadConfig('./systemjs.config.js').then(function () {
    builder.buildStatic(
      config.src + 'main.js',
      config.build.path + 'bundle.js',
      config.systemJs.builder
    );
  }).then(function () {
    util.log('Build complete');
    done();
  }).catch(function (ex) {
    util.log('Build failed', ex);
    done('Build failed.');
  });

});

gulp.task('default', ['build-systemjs']);

