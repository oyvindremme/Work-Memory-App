const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

gulp.task('babel',  () => {
    gulp.src('js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('public/js'))
});

gulp.task('watch', () => {
    gulp.watch('js/app.js', [ 'babel' ]);
});