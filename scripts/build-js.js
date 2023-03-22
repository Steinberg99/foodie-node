const gulp = require("gulp");
const concat = require("gulp-concat");
const minify = require("gulp-minify");

return gulp.src(["./src/js/*.js"])
  .pipe(concat("index.js"))
  .pipe(minify())
  .pipe(gulp.dest("./static/"));
