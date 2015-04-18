var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
  static: ['./client/src/**', '!**/*.less'],
  less: './client/src/less/styles.less'
};

// Generate css from less-files and concatenate all css:
gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest('./client/build'))
    .pipe(reload({stream: true}));
});

// Copy static files to build folder
gulp.task('copy', function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest('./client/build'));
});
gulp.task('copy-watch', ['copy'], reload);

// Run build-tasks when files changes
gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.static, ['copy-watch']);
});

gulp.task('server', function() {
  // Start node express app
  require('./index.js');
  // reload browser when files changes
  browserSync({ proxy: 'localhost:1337' });
});


gulp.task('default', ['copy', 'less', 'watch', 'server']);
