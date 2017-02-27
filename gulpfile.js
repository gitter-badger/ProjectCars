var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var handlebars = require('gulp-compile-handlebars');


gulp.task('styles', function() {
  return gulp.src('./src/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('all.css'))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/styles'))
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/*.css', ['styles']);
});

gulp.task('default', ['styles','watch']);

gulp.task('handlebars', function () {
	var options = {
		batch : ['./src/partials/']
	};
	return gulp.src('./src/index.hbs')
		.pipe(handlebars({}, options))
		.pipe(rename('index2.html'))
		.pipe(gulp.dest('./build/'));
});