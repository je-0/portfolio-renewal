const { gulp, src, dest, lastRun, series, parallel, watch } = require("gulp");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const fileInclude = require("gulp-file-include");
const newer = require("gulp-newer");
const browserSync = require("browser-sync").create();
const del = require("del");
const beautify = require("gulp-beautify");

const sourceJe = {
    html: "sources/html/**/*.html",
    css: "sources/resources/assets/scss/",
    js: "sources/resources/assets/js/",
    img: "sources/resources/assets/images/",
    ir: "sources/resources/assets/ir/",
    commonResource: "sources/resources/common/",
};

const distJe = {
    path: "dist/_path/",
    html: "dist/html/",
    css: "dist/resources/assets/css/",
    scss: "dist/resources/assets/scss/",
    js: "dist/resources/assets/js/",
    img: "dist/resources/assets/images/",
    commonResource: "dist/resources/common/",
};

const dist = {
    path: "dist/_path/",
};

/****************** Mobile [s] ******************/

// html include
const htmlTask = () => {
    return src(
        sourceJe.html,
        { base: "sources/html/" },
        { since: lastRun(htmlTask) }
    )
        .pipe(
            fileInclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(beautify.html({ indent_size: 4 }))
        .pipe(dest(distJe.html))
        .pipe(browserSync.reload({ stream: true }))
        .on("end", () => {
            return del(["dist/html/**/__include"]);
        });
};

// CSS
const cssJe = () => {
    return src(sourceJe.css + "*.{scss,css}")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "compressed",
                indentType: "space",
                indentWidth: 4,
                precision: 8,
                sourceComments: false,
            }).on("error", sass.logError)
        )
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(sourcemaps.write())
        .pipe(dest(distJe.css))
        .pipe(browserSync.reload({ stream: true }));
};

// JS
const jsTask = () => {
    return src(sourceJe.js + "*.js", { since: lastRun(jsTask) })
        .pipe(uglify())
        .pipe(dest(distJe.js))
        .pipe(beautify.js({ indent_size: 4 }))
        .pipe(browserSync.reload({ stream: true }));
};

//Image Minify
const imgMinTask = () => {
    return src([sourceJe.img + "**/*.{png,gif,jpg,mp4,svg}"], {
        since: lastRun(imgMinTask),
    })
        .pipe(newer(distJe.img))
        .pipe(dest(distJe.img))
        .pipe(browserSync.reload({ stream: true }));
};


// watch
const watchMobileTask = () => {
    watch(sourceJe.commonResource, commonJeMove);
    watch(sourceJe.html, htmlTask);
    watch(sourceJe.css, cssJe);
    watch(sourceJe.js, jsTask);
    watch(sourceJe.img, imgMinTask);
};
/****************** Mobile [e] ******************/

/****************** Common [s] ******************/
const commonJeMove = () => {
    return src([sourceJe.commonResource + "**/*.*"])
        .pipe(dest(distJe.commonResource))
        .pipe(browserSync.reload({ stream: true }));
};
const indexMove = () => {
    return src(["sources/*.html"])
        .pipe(dest("dist/"))
        .pipe(browserSync.reload({ stream: true }));
};
/****************** Common [e] ******************/

const cleanAllTask = () => {
    return del(["dist/"]);
};

// Server
const server = () => {
    return browserSync.init({
        port: 5500,
        server: {
            baseDir: "dist/",
        },
    });
};

/****************** Common [e] *****************/

// exports
exports.clean = cleanAllTask;
//Mobile
exports.front = series(
    cleanAllTask,
    indexMove,
    commonJeMove,
    htmlTask,
    cssJe,
    jsTask,
    imgMinTask,
    parallel(server, watchMobileTask)
);

exports.build = series(
    cleanAllTask,
    indexMove,
    commonJeMove,
    htmlTask,
    cssJe,
    jsTask,
    imgMinTask,
);
