const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const htmlSource = 'src/html/*.html';
const sassSource = 'src/sass/style.scss';
const jsSource = 'src/app/app.js';

const gulpTasks = [ 'html', 'babel', 'sass' ];

sass.compiler = require('node-sass');

gulp.task('html', () => {
  gulp.src(htmlSource)
    .pipe(gulp.dest('public/'));
});

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

gulp.task('watch', () => {
    gulp.watch([jsSource, sassSource], gulpTasks);
});

gulp.task('build', gulpTasks);