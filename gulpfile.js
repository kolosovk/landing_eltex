var gulp = require("gulp");
var stylus = require("gulp-stylus");

gulp.task("stylus", function() {
  return gulp.src("./app/stylus/index.styl");
});
