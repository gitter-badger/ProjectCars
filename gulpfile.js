var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

const hbsContext = require('./src/test.json');

var paths = {
	srcDir: './src',
	buildDir: './build',
	templatesDir: ['./src/partials/'],
	templates: './src/partials/*.hbs',
	hbsIndex: './src/index.hbs',
	stylesSrc: './src/styles/*.css',
	stylesBuild: './build/styles'
};

gulp.task('default', ['styles', 'watch', 'handlebars']);

gulp.task('styles', function() {
  return gulp.src(paths.stylesSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.stylesBuild))
});

gulp.task('watch', function() {
  gulp.watch(paths.stylesSrc, ['styles']);
  gulp.watch(paths.templates, ['handlebars']);
});

gulp.task('handlebars', function () {
	var options = {
		batch: paths.templatesDir
	};

	return gulp.src(paths.hbsIndex)
		.pipe(handlebars(hbsContext, options))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(paths.buildDir));
});