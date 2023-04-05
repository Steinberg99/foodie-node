const gulp = require("gulp");

return gulp.src([
  "./src/images/**/*.*",
  "./src/fonts/**/*.*",
  "./src/service-worker.js",
  "./src/manifest.json"
])
  .pipe(gulp.dest("./static/"));
