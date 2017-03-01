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
  stylelint({
    "extends": "stylelint-config-standard",
    "rules": {}    
      }),
  reporter(),
  nested(),
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