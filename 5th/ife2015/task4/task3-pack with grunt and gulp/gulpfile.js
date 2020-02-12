// place code for your default task here
'use strict';

var gulp = require('gulp');
var uglify = require("gulp-uglify");
var babel = require('gulp-babel');
var browserify = require('browserify');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var log = require('gulplog');
var glob = require('glob');
var es = require('event-stream');
var rename = require('gulp-rename');
gulp.task("htmlmin", function (done) {
  gulp
    .src("src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyJS: true,//压缩页面js
        minifyCSS: true//压缩页面css
      })
    )
    .pipe(
      gulp.dest("dest/")
    )
  done();
});
gulp.task('cssmin', function (done) {
  gulp.src('src/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dest/'));
  done();
});
gulp.task("babel", function (done) {
  gulp
    .src("src/**/*.js")
    .pipe(babel({
      presets: ['@babel/env']
    }))//支持es6
    .pipe(gulp.dest("dest/"));
  done();
});
gulp.task('uglify', function (done) {
  gulp
    .src('dest/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest("dest/"));
  done();
});
gulp.task('babel-uglify', function (done) {
  gulp
    .src('src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest("dest/"));
  done();
});
gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: 'dest/scripts/task3.js',
    debug: true
  });
  return b.bundle()
    .pipe(source('./scripts/task3.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add transformation tasks to the pipeline here.
    .on('error', log.error)
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dest/'));
})
gulp.task('browser', function (done) {
  glob('dest/**/*.js', function (err, files) {
    if (err) done(err);
    var tasks = files.map(function (entry) {
      return browserify({ entries: [entry] })
        .bundle()
        .pipe(source('../'+entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dest/'));
    });
    es.merge(tasks).on('end', done);
  })
})
gulp.task('build', gulp.series('cssmin', 'htmlmin','babel-uglify', (done) => {
  console.log('Done!');
  done();
}));
//好像browserify是能用了 但是目前只能输出一个 文件是否可读也不知道