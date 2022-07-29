//Gulp sirve para automatizar tareas. Acá se compilará el codigo de sass, mejorar codigo css,js y generar formatos webp y avif para imagenes
//Un pipe es una accion que se realiza despues de otra

const {src, dest, watch} = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const plumber = require("gulp-plumber") //para que no se detenga la ejecucion de gulp al escribir mal un bloque css

function css(done) {//se le puede poner done, cb, o callback
    src("src/scss/**/*.scss")    //Recorre todas las carpetas e identifica cada archivo de SASS
        .pipe(plumber())
        .pipe(sass())   //Compila el/los archivo de SASS
        .pipe(dest("build/css"))  //Almacenarlo en el archivo css

    done()  //se llama a este callback para indicarle a la funcion que acá termina su ejecucion. Sin esto nos sale msj de error de gulp
}

function dev(done) {
    watch("src/scss/**/*.scss", css) //por cada cambio que se realice en sass, recarga

    done()
}

exports.css = css;
exports.dev = dev