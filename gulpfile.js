var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runsequence = require('run-sequence');
var del = require('rimraf');
var cssmin = require('gulp-mini-css');
var imgmin = require('gulp-imagemin');

//Teste Gulp
gulp.task('teste',function(){
  console.log('Teste Gulp...');
});

//Minificar Html
gulp.task('html',function(){
  console.log('html..');
  return gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
});

//Minificar Css
gulp.task('css', function(){
  gulp.src('./src/styles/*.css')
        .pipe(cssmin({ext:'-min.css'}))
        .pipe(gulp.dest('./dist'));
  console.log('Css minificado..');
})

//Minificar Imagens
gulp.task('img',function(){
  gulp.src('./src/img/*')
  .pipe(imgmin())
  .pipe(gulp.dest('./dist/img'))
  console.log('Imagem minificado...');
});

//Sequencia de tasks a ser rodadas
gulp.task('run', function(){
  console.log('Rodando as Tasks..');
  runsequence('deletar','teste','html','css','img');
});

//Deletar a dist
gulp.task('deletar', function(callback ){
  del('./dist',callback);
  console.log('Dist Deletada...');
});
