const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');

const sassSource = 'src/sass/style.scss';
const jsSource = 'src/app/app.js';

sass.compiler = require('node-sass');

gulp.task('babel',  () => {
    gulp.src(jsSource)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('public/js'))
});

gulp.task('sass', () => {
    gulp.src(sassSource)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
      .pipe(gulp.dest('public/css'));
});

gulp.task('compress', function() {
    gulp.src('public/js/app.js')
      .pipe(minify())
      .pipe(gulp.dest('public/js'))
  });

gulp.task('watch', () => {
    gulp.watch([jsSource, sassSource], [ 'babel', 'sass', 'compress' ]);
});