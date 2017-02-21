var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
 
gulp.task('default', function () {
  return gulp.src('src/styles/*.css')
    .pipe(concatCss("styles/bundle.css"))
    .pipe(gulp.dest('out/'));
});
