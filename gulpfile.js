var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

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

gulp.task('default', ['clean'], function(){
	gulp.run('dev');
});

gulp.task('dev', ['styles', 'assets', 'scripts', 'watch', 'handlebars', 'browser-sync']);

gulp.task('clean', function() {
	return gulp.src(paths.buildDir)
		.pipe(clean());
})

gulp.task('styles', function() {
  return gulp.src(paths.stylesSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.stylesBuild))
});

gulp.task('assets', function() {
	return gulp.src('./src/assets/**/*.*')
		.pipe(gulp.dest(paths.buildDir + '/assets'));
});

gulp.task('scripts', function () {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest(paths.buildDir + '/scripts'));
});

gulp.task('watch', function() {
  gulp.watch(paths.stylesSrc, ['styles']);
  gulp.watch(paths.templates, ['handlebars']);
  gulp.watch(paths.hbsIndex, ['handlebars']);
  gulp.watch(paths.srcDir + '/scripts/*.js', ['scripts']);
  gulp.watch('src/**/*.*').on('change', browserSync.reload);
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

gulp.task('browser-sync', function() {
	return browserSync.init({
		server: {
			baseDir: paths.buildDir
		}
	});
});