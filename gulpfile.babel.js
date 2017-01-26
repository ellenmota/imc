import gulp from 'gulp';
// var gulp = require('gulp');
import htmlmin from 'gulp-htmlmin';
import runsequence from 'run-sequence';
import del from 'rimraf';
import cssmin from 'gulp-mini-css';
import imgmin from 'gulp-imagemin';
import browser from 'browser-sync';
import watch from 'gulp-watch';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import webpack from 'webpack';
import react from 'react';

//Teste Gulp
gulp.task('teste',() => {
  console.log('Teste Gulp...');
});

//Minificar Html
gulp.task('html',() => {
  console.log('html..');
  return gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
});

//Sass p/ Css
gulp.task('sass',() => {
  return gulp.src('./src/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist'));
  console.log('Sass para Css...');
});

//Js
gulp.task('js',(done) => {
  let config = require('./webpack.config');
  let doneCalled = false;

  webpack(config, (err, stats) => {
    console.log(stats.compilation.errors.toString());
    if(!doneCalled) {
      doneCalled = true;
      done();
    }
  });
});

//Minificar Imagens
gulp.task('img',() => {
  gulp.src('./src/img/*')
  .pipe(imgmin())
  .pipe(gulp.dest('./dist/img'))
  console.log('Imagem minificado...');
});

//Sequencia de tasks a ser rodadas
gulp.task('run',(callback) => {
  console.log('Rodando as Tasks..');
  runsequence('deletar','teste','html','sass','img','js','browser','monitor',callback);
});

//Browser Sync
gulp.task('browser',() => {
  browser({
    files:['./dist/**/*'],
    server:{
      baseDir: './dist/'
    }
  });
  console.log('Browser Sync start....');
});

//Monitorar mudanças
gulp.task('monitor',() =>{
  watch('./src/*.html',() =>{
      runsequence('html');
    });
  watch('./src/styles/*.scss',() =>{
    runsequence('sass');
  });
  watch('./src/scripts/*.js',() =>{
    runsequence('js');
  });
  watch('./src/img/*',() =>{
    runsequence('img');
  });
  console.log('Monitorando...');
});

//Deletar a dist
gulp.task('deletar',(callback) => {
  del('./dist',callback);
  console.log('Dist Deletada...');
});
