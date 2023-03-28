const gulp = require("gulp");
const minify = require("gulp-minify");

return gulp.src(["./src/js/*.js"])
  .pipe(minify())
  .pipe(gulp.dest("./static/"));
