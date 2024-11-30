//ПОДКЛЮЧЕНИЕ ЗАВИСИМОСТЕЙ

// подключаем gulp
const gulp					= require('gulp');
// подключаем browserSync
const browserSync 	= require('browser-sync');
// подключаем gulp-sass
const sass 					= require('gulp-sass')(require('sass'));
// подключаем cleanCSS
const cleanCSS 			= require('gulp-clean-css');
// подключаем autoprefixer
const autoprefixer  = require('gulp-autoprefixer');
// подключаем gulp-rename
const rename 				= require("gulp-rename");


// Static server (настройка сервера)
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});
	gulp.watch('src/*.html').on('change', browserSync.reload);
});

// компиляция sass|scss файлов в css файлы
gulp.task('styles', function(){
	return gulp.src('src/sass/**/*.+(scss|sass|css)')
				.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
				.pipe(rename({ prefix: '', suffix: '.min' }))
				.pipe(autoprefixer())
				.pipe(cleanCSS({compatibility: 'ie8'}))
				.pipe(gulp.dest('src/css'))
				.pipe(browserSync.stream());
});

// Отслеживание изменений в файлах js
gulp.task('scripts', function () {
	return gulp.src('src/js/**/*.js')
				.pipe(gulp.dest('dist/js'))
				.pipe(browserSync.stream());
});

// отслеживание изменений в файлах sass|scss и html файлах

// gulp.task('watch', function(){
// 	gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
// 	gulp.watch("src/*.html").on("change", browserSync.reload);
// });


gulp.task('watch', function () {
	gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
	gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
	// gulp.watch("src/*.html").on("change", gulp.parallel("html"));
});


// запуск всех задачь
gulp.task('default', gulp.parallel('watch', 'server', 'styles',));