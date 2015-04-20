var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var less = require('gulp-less');
var babelify = require('babelify');
var watchify = require('watchify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var eslint = require('gulp-eslint');

var paths = {
  static: [
    './client/src/**',
    './node_modules/bootstrap/**/fonts/*.*',
    '!./client/src/**/*.less',
    '!./client/src/**/*.js'
  ],
  less: './client/src/less/styles.less',
  js: [
    './client/src/**/*.(js|jsx)',
    './server/**/*.js',
    './gulpfile.js'
  ],
  build: './client/build'
};

// Generate css from less-files and concatenate all css:
gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest('./client/build'))
    .pipe(reload({stream: true}));
});

// Generate css from less-files and concatenate all css:
gulp.task('eslint', function() {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Copy static files to build folder
gulp.task('copy', function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest(paths.build));
});
gulp.task('copy-watch', ['copy'], reload);

// Watch javascript files, bundle, browserify and reactify on change
function scripts(watch, startFile, destinationFile) {
  var bundler, rebundle;
  bundler = browserify({
    basedir: './',
    debug: true,
    entries: startFile,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(babelify);

  rebundle = function() {
    console.log('rebundling...');
    return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(destinationFile))
            .pipe(buffer())
            .pipe(gulp.dest(paths.build))
            .pipe(reload({ stream: true }));
  };

  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('scripts', function() {
  return scripts(false, './client/src/app.js', 'bundle.js');
});
gulp.task('isomorphic', function() {
  return scripts(false, './client/src/isomorphic.js', 'isomorphic.js');
});

gulp.task('watchScripts', ['scripts'], function() {
  return scripts(true, './client/src/app.js', 'bundle.js');
});

// Run build-tasks when files changes
gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.static, ['copy-watch']);
  gulp.watch(paths.js, ['eslint']);
});

gulp.task('server', ['less', 'copy', 'scripts'], function() {
  // Start node express app
  require('./server/index.js');
  // reload browser when files changes
  browserSync({ proxy: 'localhost:1337' });
});

// Delete gulp-generated files
gulp.task('clean', function() {
  del(paths.build);
});

gulp.task('default',
  [
    'copy',
    'less',
    'eslint',
    'scripts',
    'isomorphic',
    'watch',
    'watchScripts',
    'server'
  ]);
