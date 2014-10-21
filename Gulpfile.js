var 
  gulp = require('gulp'),  
  gutil = require('gulp-util'),
  jsdoc = require('gulp-jsdoc'),
  mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src('./test/**/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('doc', function(){
  return gulp.src("./index.js")
    .pipe(jsdoc('./docs'));
});