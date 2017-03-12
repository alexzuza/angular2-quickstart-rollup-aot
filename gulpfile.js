var gulp = require('gulp');
var runSequence = require('run-sequence');
var nodePath = require('path');
var bundling = require('./build/scripts/bundling.js');
var pathTools = require('./build/scripts/path-tools.js');

var config = require('./build/constants.js');

var rxjsBundle = function () {
    var rxjsEsDir = pathTools.normalizePathSeparators(config.RXJS_TO_ES_DIR);

    // Make list of all rxjs modules
    var packagesMap = {};
    pathTools.walkFilesSync(rxjsEsDir, filePath => {
        // Skip MicsJSDoc due to errors
        if (filePath.indexOf('Rx.js') < 0 && filePath.indexOf('MiscJSDoc.js') < 0) {
            // Get package name, removing folder path, extension and replacing \ to /
            let packageName = pathTools.normalizePathSeparators(filePath)
                .replace(rxjsEsDir, 'rxjs').replace('.js', '');
            packagesMap[packageName] = packageName;
        }
    });

    // Bundle it to the one file
    var bundle = bundling.rollupPackages("rxjs.js", packagesMap, { format: "cjs" },
        { destDir: config.TEMP_DIR, cache: true, uglify: false });
    return bundle.stream;
}

// 1) dev
// tsconfig.rxjs-to-es6.json
// bundle-rxjs
// tsconfig.json
/* dev */ {
    gulp.task("bundle-rxjs", function () {
        return rxjsBundle();
    });
}


/* prod */ {

    gulp.task('bundle-src', function () {
        let mainEntry = nodePath.join(config.APP_ROLLUP_ENTRY);
        var bundle = bundling.rollupFromEntry("app.min.js", mainEntry, { format: "iife" },
            { destDir: config.DIST_DIR, uglify: true, cache: false });
        return bundle.stream;
    });
}

