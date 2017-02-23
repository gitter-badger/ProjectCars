var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('styles', function() {
  return gulp.src('./src/styles/main.css')
    .pipe(postcss([autoprefixer({})]))
    .pipe(gulp.dest('./build/styles'))
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/main.css', ['styles']);
});