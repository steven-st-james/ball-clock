var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('script',function(){
  gulp.src('app.js')
  .pipe(livereload());
})
// Watch
gulp.task('watch', function(){
  console.log('starting Watch Task');
  require('./server.js');
  livereload.listen();
  gulp.watch('app.js',['script']);
});
