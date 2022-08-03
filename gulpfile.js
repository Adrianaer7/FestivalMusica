//Gulp sirve para automatizar tareas. Acá se compilará el codigo de sass, mejorar codigo css,js y generar formatos webp y avif para imagenes
//Un pipe es una accion que se realiza despues de otra

const {src, dest, watch, parallel} = require("gulp")
//CSS
const sass = require("gulp-sass")(require("sass"))
const plumber = require("gulp-plumber") //para que no se detenga la ejecucion de gulp al escribir mal un bloque css
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const postcss = require("gulp-postcss")
const sourcemaps = require("gulp-sourcemaps")
//Imagenes
const cache = require("gulp-cache")
const imagemin = require("gulp-imagemin")
const webp = require("gulp-webp")
const avif = require("gulp-avif")

//JS
const terser = require("gulp-terser-js")

//compilar los archivos de sass y pasarlo a css
function css(done) {//se le puede poner done, cb, o callback
    src("src/scss/**/*.scss")    //Recorre todas las carpetas e identifica cada archivo de SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())   //Compila el/los archivo de SASS
        .pipe(postcss([autoprefixer(), cssnano()])) //hago compatible el css con todos los navegadores y achico su peso
        .pipe(sourcemaps.write("."))    //guarda el archivo llamado app.css.map en la misma ubicacion que elijo abajo
        .pipe(dest("build/css"))  //Almacenarlo en el archivo css
    done()  //se llama a este callback para indicarle a la funcion que acá termina su ejecucion. Sin esto nos sale msj de error de gulp
}

//optimizar las imagenes
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src("src/img/**/*.{png,jpg}")   //optimizo las imagenes png y jpg, y las guardo en la carpeta buld/img
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"))
    done()
}

//convertir imagenes a webp
function versionWebp(done) {
    const opciones = { 
        quality: 50 //elijo la calidad
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))   //convierte las imagenes
        .pipe(dest("build/img"))    //las guarda en esta carpeta
    done()
}

//convertir imagenes a avif
function versionAvif(done) {
    const opciones = { 
        quality: 50 //elijo la calidad
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))   //convierte las imagenes
        .pipe(dest("build/img"))    //las guarda en esta carpeta
    done()
}

//Los scripts que cree en src/js los envio al build para que estén en el deployment cuando suba la carpeta build
function javascript(done) {
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(terser()) //optimizo el codigo js
        .pipe(sourcemaps.write("."))    //se guarda el archivo en app.js.map. Esto es para que se pueda acceder al codigo fuente  de los eventos. Por ej. en el navegador > source > interrupciones del objeto > mouse > click. Seleccionar el tilde, hacer click en alguna parte de la pagina que reaccione a ese click y se mostrará el codigo fuente de lo que hace
        .pipe(dest("build/js"))
    done()
}

//por cada cambio que se realice en sass o en el build/js, recarga
function dev(done) {
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javascript) 
    done()
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//exporto las funciones para hacerlas disponibles en package.json
exports.dev = parallel(css, imagenes, versionWebp, versionAvif, javascript, dev);   //gulp parallel hace que se ejecuten a la vez estas 2 funciones