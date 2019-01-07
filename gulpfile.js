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
    .src("./app/stylus/**/*.styl")
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

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
  });
});

gulp.task("clean", function() {
  return del.sync("dist");
});

gulp.task("build", function() {
  gulp.src("app/css/index.min.css").pipe(gulp.dest("dist/css"));
  gulp.src("app/**/*.html").pipe(gulp.dest("dist"));
  done();
});

gulp.task("def", function() {
  gulp.series(["clean", "build"]);
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

gulp.task("watch", function() {
  // gulp.watch("app/stylus/*.styl", gulp.parallel("stylus"));
  gulp.watch("./app/index.html", browserSync.reload());
});

gulp.task("default", gulp.parallel("stylus", "browser-sync", "css-libs"));
