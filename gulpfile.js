let gulp = require("gulp");
var cssnano = require("cssnano");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


gulp.task("hello", () => {
  console.log("Salut tout le monde");
});

gulp.task("sass", () => {
  return gulp
    .src("./src/assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./src/assets/css"));
});

gulp.task("sass:watch", () => {
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series("sass"));
});

gulp.task("postcss:prefix", function () {
  return gulp
    .src("./src/assets/css/*.css")
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("./src/assets/css"));
});

gulp.task("postcss:min", function () {
  return gulp
    .src("./src/assets/css/*.css")
    .pipe(postcss([cssnano]))
    .pipe(gulp.dest("./dist/assets/css"));
});

gulp.task("postcss", () => {
  return gulp
    .src("./src/assets/css/*.css")
    .pipe(postcss([autoprefixer(), cssnano]))
    .pipe(gulp.dest("./dist/assets/css"));
});

gulp.task("copy-html", () => {
  return gulp.src("./src/*.html").pipe(gulp.dest("./dist"));
});

gulp.task("imagemin", () => {
  return gulp
    .src("./src/assets/images/*.png")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("serv", () => {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series("sass")).on('change', browserSync.reload);
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);
});

gulp.task("build", gulp.parallel("postcss", "copy-html", "imagemin"));

gulp.task('concat:js', () => {
  return gulp.src('./src/assets/js/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./src/assets/js'));
});

gulp.task('uglify:js', () => {
  gulp.src('src/assets/js/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/asset/js'))
});