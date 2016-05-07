var gulp = require('gulp');
var bundle = require('aurelia-bundler').bundle;

var config = {
  force: true,
  baseURL: '.',                   // baseURL of the application
  configPath: './config.js',      // config.js file. Must be within `baseURL`
  bundles: {
    "dist/app-build": {           // bundle name/path. Must be within `baseURL`. Final path is: `baseURL/dist/app-build.js`.
      includes: [
        '[*.js]',
        '*.html!text',
        '*.css!text',
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "dist/vendor-build": {
      includes: [
        'aurelia-framework',
        'vGrid/v-grid-contextmenu',
        'vGrid/v-grid-header-cells-label',
        'vGrid/v-grid-header-cells-filter',
        'vGrid/v-grid-row-cells-image',
        'vGrid/v-grid-row-cells-checkbox',
        'vGrid/v-grid-row-cells-input',
        'vGrid/v-grid-col',
        'vGrid/v-grid-header-col',
        'vGrid/v-grid-row-col',
        'vGrid/v-grid.js',
        'vGrid/v-grid-atts',
        'moment',
        'numeral',
        'samples/sample01.js'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

gulp.task('bundle', function () {
  return bundle(config);
});
