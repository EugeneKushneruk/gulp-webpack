const gulp          = require('gulp');
const newer         = require('gulp-newer');
const imagemin      = require('gulp-imagemin');
const rename        = require('gulp-rename');
const stylus        = require('gulp-stylus');
const postcss       = require('gulp-postcss');
const iconfont      = require('gulp-iconfont');
const sourcemaps    = require('gulp-sourcemaps');
const consolidate   = require('gulp-consolidate');
const svgSprite     = require('gulp-svg-sprite');
const gulpIf        = require('gulp-if');
const cssnano       = require('cssnano');
const autoprefixer  = require('autoprefixer');
const browserSync   = require('browser-sync').create();
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const errorHandler  = require('./gulp-utils/error-handler');
const { isDev }     = require('./gulp-utils/env');
const del           = require('del');


// HTML
gulp.task('html', () => {
  return gulp.src('src/*.html')
      .pipe(errorHandler())
      .pipe(gulpIf(isDev, gulp.dest('temp'), gulp.dest('dist')))
});


// Styles
gulp.task('styles', () => {
  const plugins = isDev
    ? [ autoprefixer() ]
    : [ autoprefixer(), cssnano() ];

  return gulp.src('src/stylus/index.styl')
    .pipe(errorHandler())
    .pipe(stylus())
    .pipe(postcss(plugins))
    .pipe(rename({ basename: 'style' }))
    .pipe(gulpIf(isDev, gulp.dest('temp'), gulp.dest('dist')))
    .pipe(browserSync.stream());
});


// Webpack
gulp.task('webpack', () => {
  return gulp.src('src/js/index.js')
    .pipe(errorHandler())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulpIf(isDev, gulp.dest('temp'), gulp.dest('dist')))
    .pipe(browserSync.stream());
});


// Images
gulp.task('images', () => {
  return gulp.src('src/img/*')
    .pipe(errorHandler())
    .pipe(gulpIf(isDev, newer('temp/img')))
    .pipe(imagemin())
    .pipe(gulpIf(isDev, gulp.dest('temp/img'), gulp.dest('dist/img')))
});


// SVGs
gulp.task('svg', () =>{
  return gulp.src('src/svg/*.svg')
    .pipe(errorHandler())
    .pipe(gulpIf(isDev, newer('temp/svg')))
    .pipe(imagemin())
    .pipe(gulpIf(isDev, gulp.dest('temp/svg'), gulp.dest('dist/svg')))
});


// SVG font
gulp.task('svg:font', () => {
  const customName = 'att-glyphs';

  return gulp.src('src/svg/icons/*.svg')
    .pipe(imagemin())
    .pipe(iconfont({
      fontName: customName,
      normalize: true,
      fontHeight: 1001
    }))
    .on('glyphs', (glyphs) => {
      const options = {
        glyphs: glyphs.map((glyph) => {
          return {
            name: glyph.name,
            codepoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
          }
        }),
        fontName: customName,
        className: customName,
        fontPath: 'fonts/',
      };

      gulp.src('./src/templates/glyph-styles.template')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: '_svg-font',
          extname: '.styl'
        }))
        .pipe(gulp.dest('./generated'));

      isDev && gulp.src('./src/templates/glyph-html.template')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: `${customName}`,
          extname: '.html'
        }))
        .pipe(gulpIf(isDev, gulp.dest('temp'), gulp.dest('dist')))
    })
    .pipe(gulpIf(isDev, gulp.dest('temp/fonts'), gulp.dest('dist/fonts')))
});


// SVG sprite
// *help docs: https://github.com/jkphl/svg-sprite
gulp.task('svg:sprite', () => {
  return gulp.src('src/svg/icons/*.svg')
    .pipe(errorHandler())
    .pipe(svgSprite({
      shape: {
        transform: ['svgo'],
        spacing: {
          padding: 10
        }
      },
      mode: {
        css: {
          dest: '',
          bust: false,
          dimensions: true,
          layout: 'vertical',
          sprite: 'svg/sprite-icons.svg',
          render: {
            styl: {
              dest: '../generated/_sprite-icons.styl'
            }
          },
          example: isDev && { dest: 'svg/sprite-icons.html' }
        }
      }
    }))
    .pipe(gulpIf(isDev, gulp.dest('temp'), gulp.dest('dist')))
});


// Clean
gulp.task('clean', () => {
  return del(['dist', 'temp', 'generated']);
});


// Watch
gulp.task('watch', () => {
  gulp.watch('src/img/**/*', gulp.parallel('images'));
  gulp.watch('src/svg/**/*', gulp.parallel('svg'));
  gulp.watch('src/stylus/**/*.styl', gulp.parallel('styles'));
});


// Server
gulp.task('server-proxy', () => {
  browserSync.init({
    port: 9001,
    proxy: 'localhost:9005',
    files: ['temp/**/*'],
    serveStatic: ['temp']
  });
});


gulp.task('server-html', () => {
  browserSync.init({
    server: {
      baseDir: 'temp'
    }
  });
});


// Edit live site on the fly ->
// gulp.task('server', () => {
//   browserSync.init({
//     proxy: #proxy link ("https://..."),
//     files: ['temp/**/*'],
//     serveStatic: ['temp'],
//     rewriteRules: [
//       {
//         match: new RegExp(#link here ("https://...")),
//         fn: () => 'bundle.js'
//       }
//     ]
//   });
// });


// Build
gulp.task('build', gulp.series('clean', 'svg', 'images', 'styles', 'webpack', 'html'));


// Default
gulp.task('default', gulp.series('clean', 'svg', 'images', 'styles', 'html', gulp.parallel('webpack', 'server-html', 'watch')));















