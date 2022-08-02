document.addEventListener("DOMContentLoaded", function () {
    iniciarApp()
})

function iniciarApp() {
    crearGaleria()
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes") //guardo el <ul>

    for(let i = 1; i <=12; i++) {
        const imagen = document.createElement("picture")    //creo la etiqueta picture

        //pongo estas etiquetas dentro del <picture>
        imagen.innerHTML = ` 
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img src="build/img/thumb/${i}.jpg" loading="lazy" width="200" height="300" alt="Imagen galería">
        `
        imagen.onclick = function() {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen) //agrego el <picture> a la <ul> y la muestro en pantalla
    }
}

function mostrarImagen(id) {    //tomo la id de la funcion crearGaleria
    const imagen = document.createElement("picture")    //creo la etiqueta picture

    //pongo estas etiquetas dentro del <picture>
    imagen.innerHTML = ` 
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img src="build/img/grande/${id}.jpg" loading="lazy" width="200" height="300" alt="Imagen galería">
    `
    const overlay = document.createElement("DIV");  //creo un <div>
    overlay.classList.add("overlay")
    overlay.appendChild(imagen) //le agrego el <picture> al <div>
    overlay.onclick = function() {  //cierro el modal al hacer click en él
        const body = document.querySelector("body")
        body.classList.remove("fijar-body")
        overlay.remove()
    }

    const cerrarModal = document.createElement("P")
    cerrarModal.classList.add("btn-cerrar")
    cerrarModal.textContent = "X"
    overlay.appendChild(cerrarModal)
    cerrarModal.onclick = function() {  //al hacer click en la X cierro el modal
        const body = document.querySelector("body")
        body.classList.remove("fijar-body")
        cerrarModal.remove()
    }

    const body = document.querySelector("body")
    body.appendChild(overlay)   //al final del body agrego el div creado con el onclick
    body.classList.add("fijar-body")
}