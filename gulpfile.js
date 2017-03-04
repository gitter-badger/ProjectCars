var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

const hbsContext = require('./src/test.json');

var paths = {
	srcDir : './src',
	buildDir : './build',
	hbsPartials : ['./src/partials/'],
	styles : './src/styles/*.css'
}

gulp.task('default', ['styles', 'watch', 'handlebars']);

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.buildDir + '/styles'))
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('handlebars', function () {
	var options = {
		batch: paths.hbsPartials
	};
	return gulp.src(paths.srcDir + '/index.hbs')
		.pipe(handlebars(hbsContext, options))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(paths.buildDir));
});