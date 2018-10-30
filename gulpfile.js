const gulp = require('gulp');
const babel = require('gulp-babel');

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