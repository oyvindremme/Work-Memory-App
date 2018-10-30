const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel',  () => {
    gulp.src('js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('public/js'))
});

gulp.task('default', [ 'babel' ]);