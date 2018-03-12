var gulp = require("gulp");
// Require the gulp-sass plugin
var sass = require("gulp-sass");
const babel = require('gulp-babel');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task("sass", function () {
  return gulp
    .src("assets/styles/scss/**/*.scss")
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest("assets/styles/css/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("browserSync", function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("*.html").on("change", reload);
});

gulp.task("babel", function () {
  return gulp.src("assets/js/main.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"))
})

gulp.task("watch", ["browserSync", "sass", "babel"], function () {
  // Gulp watch syntax
  gulp.watch("assets/styles/scss/**/*.scss", ["sass"]);
  // Other watchers
});