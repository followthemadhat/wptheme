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
    proxy: 'dev.loc',
    notify: false,
    open: false
  });
  gulp.watch('./sass/**/*', ['styles']);
});

gulp.task('styles', function() {
  return gulp.src('./sass/main.scss')
    .pipe(sassGlob())
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 15 versions', '> 1%', 'ie 9'], cascade: true }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src([
    // './libs/jquery/dist/jquery.min.js'
    ])
    .pipe(plumber())
    .pipe(concat('libs.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
  gulp.watch('./sass/**/*.+(sass|scss)', ['styles']);
  gulp.watch('./**/*.php', browserSync.reload);
  gulp.watch('./js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
  return del.sync('../'+themeName, {force: true});
});

gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(newer('img/**/*'))
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('img/'));
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
  .pipe(replace('customtheme', themeName, {skipBinary: true}))
  .pipe(gulp.dest('../'+themeName));

});

gulp.task('default', ['watch']);
