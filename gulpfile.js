var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var assets = require('postcss-assets');
var nested = require('postcss-nested');
var short = require('postcss-short');
var stylelint = require('stylelint');
var reporter = require('postcss-browser-reporter');

var lint = [
  autoprefixer({
    browsers: ['last 2 versions', '> 2%']
  }),
  assets({
    loadPaths: ['src/img/',
    'src/fonts/ProximaNovaBold',
    'src/fonts/ProximaNovaLight',
    'src/fonts/ProximaNovaRegular']
  }),
  nested(),
  stylelint({
    "extends": "stylelint-config-standard",
    "rules": {"block-closing-brace-empty-line-before": null,
    "block-closing-brace-newline-after": null,
    "block-closing-brace-newline-before": null,
    "block-closing-brace-space-before": null,
    "block-opening-brace-newline-after": null,
    "block-opening-brace-space-after": null,
    "block-opening-brace-space-before": null,
    "declaration-block-semicolon-newline-after": null,
    "declaration-block-semicolon-space-after": null,
    "declaration-block-semicolon-space-before": null,
    "declaration-block-trailing-semicolon": null
        }    
      }),
  reporter(),
  short()
]

gulp.task('styles', function() {
  return gulp.src('./src/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(lint))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/styles'))
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/*.css', ['styles']);
});

gulp.task('default', ['styles','watch']);