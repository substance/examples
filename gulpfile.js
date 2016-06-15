'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var through2 = require('through2');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');

var demos = ['code-editor', 'collabwriter', 'input', 'form', 'focused', 'tables', 'images', 'macros'];

gulp.task('lint', function() {
  return gulp.src([
    '**/*.js',
  ]).pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('assets', function () {
  demos.forEach(function(demoFolder) {
    gulp.src(demoFolder+'/index.html')
          .pipe(gulp.dest('dist/'+demoFolder));
  });
  gulp.src('index.html')
        .pipe(gulp.dest('dist'));
  gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('node_modules/ace-builds/src-min/*')
    .pipe(gulp.dest('./dist/ace'));
});

gulp.task('sass', function() {
  demos.forEach(function(demoFolder) {
    gulp.src('./'+demoFolder+'/app.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('app.css'))
      .pipe(gulp.dest('./dist/'+demoFolder));
  });
});

gulp.task('browserify', function() {
    demos.forEach(function(demoFolder) {
      gulp.src('./'+demoFolder+'/app.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path)
            .bundle(function (err, res) {
              if (err) { return next(err); }
              file.contents = res;
              next(null, file);
            });
        }))
        .on('error', function (error) {
            console.log(error.stack);
            this.emit('end');
        })
        .pipe(uglify().on('error', function(err){console.log(err); }))
        .pipe(gulp.dest('./dist/'+demoFolder));
    });

});

gulp.task('default', ['assets', 'sass', 'browserify']);
