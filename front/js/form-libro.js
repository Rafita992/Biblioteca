const form = document.getElementById("form-libro")
const libroId = document.getElementById("libro-id")
const titulo = document.getElementById("libro-titulo")
const autor = document.getElementById("libro-autor")
const disponible = document.getElementById("libro-disponible")
const tituloForm = document.getElementById("titulo-form")
const btnCancelar = document.getElementById("btn-cancelar")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

if(id){
    tituloForm.textContent = "Editar Libro"
    fetch("../../back/web_services/libros_ws.php?id=" + id)
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(libro){
        titulo.value = libro.titulo
        autor.value = libro.autor
        disponible.value = libro.disponible
        libroId.value = libro.id
    })
} else {
    tituloForm.textContent = "Añadir Libro"
}

form.addEventListener("submit", function(evento){
    evento.preventDefault()

    const datos = {
        titulo: titulo.value,
        autor: autor.value,
        disponible: disponible.value
    }

    if(id){
        datos.id = libroId.value
        fetch("../../back/web_services/libros_ws.php", {
            method : "PUT",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(datos)
        })
        .then(function(respuesta){
            return respuesta.json()
        })
        .then(function(resultado){
            if(resultado.success === true){
                window.location.href = "admin.html"
            }
        })
    } else {
        fetch("../../back/web_services/libros_ws.php", {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body :  JSON.stringify(datos)
        })
        .then(function(respuesta){
            return respuesta.json()
        })
        .then(function(resultado){
            if(resultado.success === true){
                window.location.href = "admin.html"
            }
        })
    }
})

btnCancelar.addEventListener("click", function(){
    window.location.href = "admin.html"
})