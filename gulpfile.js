var gulp        = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('server', ["cp", "js", "templates"], function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        online: false
    });
    gulp.watch('./src/js/*.js', function(){
		gulp.src("./src/js/*.js").
			pipe(concat("app.js"))
			.pipe(gulp.dest("./build/"));
			browserSync.reload();
    });
    gulp.watch('./src/templates/*.html', function(){
		gulp.src("./src/templates/index.html").
			pipe(gulp.dest("./build"));
		browserSync.reload();
    });
});

gulp.task("js",function(){
	gulp.src("./src/js/*.js").
			pipe(concat("app.js"))
			.pipe(gulp.dest("./build/"));
});

gulp.task("cp", function(){
	gulp.src("libs/*.*").
		pipe(gulp.dest("./build/libs/"));
});



gulp.task("templates",function(){
	gulp.src("./src/templates/index.html").
		pipe(gulp.dest("./build"));
	browserSync.reload();
});

