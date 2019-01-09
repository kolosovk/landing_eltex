var gulp = require("gulp");
var stylus = require("gulp-stylus");
var browserSync = require("browser-sync");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var del = require("del");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("stylus", function() {
  return gulp
    .src("./app/stylus/index.styl")
    .pipe(stylus())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true
      })
    )
    .pipe(gulp.dest("./app/css/"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("css-libs", function() {
  return gulp
    .src("app/css/index.css")
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("app/css"));
});

gulp.task("style", gulp.series("stylus", "css-libs"));

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
  });
});

gulp.task("clean", function(done) {
  return del.sync("dist"), done();
});

gulp.task("replace", function(done) {
  gulp.src("app/css/index.min.css").pipe(gulp.dest("dist/css"));
  gulp.src("app/js/index.js").pipe(gulp.dest("dist/js"));
  gulp.src("app/**/*.html").pipe(gulp.dest("dist"));
  gulp.src("app/img/**/*.*").pipe(gulp.dest("dist/img"));
  done();
});

gulp.task("img", function() {
  return gulp
    .src("app/img/**/*")
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()]
      })
    )
    .pipe(gulp.dest("dist/img"));
});

gulp.task("default", gulp.parallel("stylus", "browser-sync", "css-libs"));

gulp.task("build", gulp.series("style", "clean", "replace"));
