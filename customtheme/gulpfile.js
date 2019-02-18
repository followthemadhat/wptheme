var themeName = 'theme';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'http://localhost:8888/wordpress/'+themeName+'/',
    notify: false,
    open: false
  });
  gulp.watch('./sass/**/*', ['styles']);
});

gulp.task('styles', function() {
  return gulp.src('./sass/main.scss')
    .pipe(sassGlob())
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 10 versions', '> 1%', 'ie 10'], cascade: true }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src([
    './libs/slicknav/dist/jquery.slicknav.min.js',
    './libs/swiper/dist/js/swiper.min.js',
    './libs/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
    .pipe(plumber())
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
  gulp.watch('./sass/**/*.+(sass|scss)', ['styles']);
  gulp.watch('./**/*.php', browserSync.reload);
  gulp.watch('./js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
  return del.sync('../'+themeName+'-build', {force: true});
});

gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('../'+themeName+'-build'));
});

gulp.task('build', ['clean', 'images'], function() {

  gulp.src(['./**/*',
  // exludes
  '!./sass',
  '!./sass/**',
  '!./libs',
  '!./libs/**',
  '!./*.json',
  '!./gulpfile.js',
  '!./node_modules',
  '!./node_modules/**'
    ])
  .pipe(gulp.dest('../'+themeName+'-build'));

});

gulp.task('default', ['watch']);
