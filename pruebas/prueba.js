const botonCargar = document.getElementById("btn-cargar");
const listaLibros = document.getElementById("lista-libros");

botonCargar.addEventListener("click", function (){
    fetch("prueba_api.php")
        .then(function (respuesta) {
            return respuesta.json()
        })
        .then(function (libros){
            libros.forEach(function (libro){
                const elemento = document.createElement("li")
                elemento.textContent = libro.titulo + "-" + libro.autor
                listaLibros.appendChild(elemento)
            })
        })
})