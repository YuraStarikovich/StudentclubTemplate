const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoPrefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const gulpStylelint = require('gulp-stylelint');

function style() {
  return (
    gulp
      .src('./app/scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(postcss([autoPrefixer(), cssnano()]))
      .pipe(gulp.dest('./build'))
      .pipe(browserSync.stream())
  );
}

function lintCss() {
  return gulp
    .src('./app/scss/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    }));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch('./app/scss/**/*.scss', lintCss);
  gulp.watch('./app/scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./app/scripts/**/*.js').on('change', browserSync.reload);
}

exports.lintCss = lintCss;
exports.style = style;
exports.watch = watch;
