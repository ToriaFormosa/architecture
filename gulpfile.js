'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const formatHtml = require('gulp-format-html');
const image = require('gulp-image');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
//const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const del = require("del");
const { parallel } = require('gulp');
const replace = require('gulp-replace');

let scriptsPath = ['source/js/main.js'];

const sassLibs = {
	src: ['source/scss/vendor/bootstrap.min.css',
		'source/scss/vendor/aos.css',
		'source/scss/vendor/swiper-bundle.css',
		'source/scss/vendor/jquery.pagepiling.css',
		'source/scss/vendor/jquery.fancybox.css',
		'source/scss/vendor/revolution.css',
		'source/scss/utils/normalize.css'],
	build: 'build/css/'
};

gulp.task('server', function() {
	browserSync.init({
    server: './build',
    index: 'index.html'
	});

   gulp.watch('source/scss/**/*.scss', gulp.series('sass'));

	 gulp.watch('source/themes/dark/**/*.scss', gulp.series('sassDark'));
	 gulp.watch('source/themes/intro/**/*.scss', gulp.series('sassIntro'));
	 //gulp.watch(['source/fonts.scss', 'source/scss/utils/variables.scss'], gulp.series('sassFonts'));
   gulp.watch('source/pug/**/*.pug', gulp.series('pug', 'refresh'));
	 gulp.watch('source/icons/*.svg', gulp.series('sprite', 'pug', 'refresh'));
	 gulp.watch('source/js/*.js', gulp.series('scripts'));
	 gulp.watch('source/img/**/*.{png,jpg,svg,webp}', gulp.series('img'/*, 'webp'*/));
});

gulp.task('refresh', function(done) {
  browserSync.reload();
  done();
});

gulp.task('sass', function() {
	return gulp.src('source/scss/main.scss')
		.pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'SASS',
          sound: false,
          message: err.message
        }
      })
    }))
		.pipe(replace(/\/\/ignorescss/g, ''))
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		//.pipe(postcss([
		//	autoprefixer({
		//		grid: true
		//	})
		//]))
		.pipe(gulp.dest('build/css'))
		//.pipe(csso())
		//.pipe(rename('main.min.css'))
		//.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('sassLibs', function() {
	return gulp.src(sassLibs.src)
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'SASS-LIBS',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(sass())
		.pipe(gulp.dest(sassLibs.build))
		.pipe(browserSync.stream());
});

gulp.task('sassDark', function() {
	return gulp.src('source/themes/dark/theme-dark.scss')
		.pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'SASS-DARK',
          sound: false,
          message: err.message
        }
      })
    }))
		.pipe(sass({
      outputStyle: 'expanded',
    }))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('sassIntro', function() {
	return gulp.src('source/themes/intro/intro-page.scss')
		.pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'SASS-INTRO',
          sound: false,
          message: err.message
        }
      })
    }))
		.pipe(sass({
            outputStyle: 'expanded',
        }))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

/*
	gulp.task('sassFonts', function() {
		return gulp.src('source/fonts.scss')
			.pipe(plumber({
				errorHandler: notify.onError(function(err) {
					return {
						title: 'SASS-FONTS',
						sound: false,
						message: err.message
					}
				})
			}))
			.pipe(sass())
			.pipe(gulp.dest('build/css'))
			.pipe(browserSync.stream());
	});
*/

gulp.task('pug', function() {
	return gulp.src("source/pug/*.pug")
		.pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'PUG',
          sound: false,
          message: err.message
        }
      })
    }))
		.pipe(pug({
			pretty: true
    }))
    .pipe(formatHtml())
		.pipe(gulp.dest("build/"));
});

gulp.task('scripts', function() {
  return gulp.src(scriptsPath)
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'js',
          sound: false,
          message: err.message
        }
      })
    }))
    .pipe(concat("main.js"))
    //.pipe(uglify())
    //.pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
});

gulp.task('img', function() {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(newer('build/img'))
    .pipe(image({
        mozjpeg: false,
        jpegoptim: false,
        jpegRecompress: true
    }))
    .pipe(gulp.dest('build/img'));
});

//gulp.task('webp', function() {
 // return gulp.src('build/img/**/*.{png,jpg}')
  //  .pipe(webp({quality: 90}))
  //  .pipe(gulp.dest('build/img'));
//});

gulp.task('favicon', function() {
	return gulp.src('source/favicons/*.*')
		.pipe(gulp.dest('build/favicons'));
});

gulp.task('sprite', function() {
  return gulp.src('source/icons/*.svg')
    .pipe(image())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/js/**',
    'source/video/**'
    ],{
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('copyVendorCss', function() {
  return gulp.src([
    'source/scss/vendor/*.css'
    ])
    .pipe(gulp.dest('build/css'));
});

gulp.task('copy:img', function() {
  return gulp.src([
    'source/images/**/*.{jpg,png,svg}',
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('php', function() {
	return gulp.src('source/php/**/*.*')
		.pipe(gulp.dest('build/php/'));
});

gulp.task('default', gulp.series('clean', 'copy', 'copyVendorCss', 'img'/*, 'webp'*/, 'scripts', 'favicon', 'sprite', parallel('sass', /*'sassLibs',*/ 'sassDark', 'sassIntro', 'php'), 'pug', 'server'));
