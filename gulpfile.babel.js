import gulp from 'gulp';
// var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runsequence = require('run-sequence');
var del = require('rimraf');
var cssmin = require('gulp-mini-css');
var imgmin = require('gulp-imagemin');
var browser = require('browser-sync');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
import webpack from 'webpack';
import react from 'react';

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

//Sass p/ Css
gulp.task('sass',function(){
  return gulp.src('./src/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist'));
  console.log('Sass para Css...');
});

//Js
gulp.task('js', function(done){
  var config = require('./webpack.config');
  var doneCalled = false;

  webpack(config, function(err, stats) {
    console.log(stats.compilation.errors.toString());
    if(!doneCalled) {
      doneCalled = true;
      done();
    }
  });
});

//Minificar Imagens
gulp.task('img',function(){
  gulp.src('./src/img/*')
  .pipe(imgmin())
  .pipe(gulp.dest('./dist/img'))
  console.log('Imagem minificado...');
});

//Sequencia de tasks a ser rodadas
gulp.task('run', function(callback){
  console.log('Rodando as Tasks..');
  runsequence('deletar','teste','html','sass','img','js','browser','monitor',callback);
});

//Browser Sync
gulp.task('browser',function(){
  browser({
    files:['./dist/**/*'],
    server:{
      baseDir: './dist/'
    }
  });
  console.log('Browser Sync start....');
});

//Monitorar mudanças
gulp.task('monitor', function(){
  watch('./src/*.html',function() {
      runsequence('html');
    });
  watch('./src/styles/*.scss',function(){
    runsequence('sass');
  });
  watch('./src/scripts/*.js',function(){
    runsequence('js');
  });
  watch('./src/img/*',function(){
    runsequence('img');
  });
  console.log('Monitorando...');
});

//Deletar a dist
gulp.task('deletar', function(callback){
  del('./dist',callback);
  console.log('Dist Deletada...');
});
