// Gulpfile.js 
var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
 
gulp.task('start', function () {
  nodemon({ 
      script: 'index.js',
      ext: 'html js'})
    .on('restart', function () {
      console.log('restarted!')
    })
});