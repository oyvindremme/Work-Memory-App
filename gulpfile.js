const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('babel',  () => {
    gulp.src('js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('public/js'))
});

gulp.task('sass', () => {
    gulp.src('sass/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
      .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
    gulp.watch(['js/app.js', 'sass/style.scss'], [ 'babel', 'sass' ]);
});