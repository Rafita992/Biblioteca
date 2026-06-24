const form = document.getElementById("form-usuario")
const usuarioId = document.getElementById("usuario-id")
const nombre = document.getElementById("usuario-nombre")
const email = document.getElementById("usuario-email")
const password = document.getElementById("usuario-password")
const rol = document.getElementById("usuario-rol")
const tituloForm = document.getElementById("titulo-form")
const btnCancelar = document.getElementById("btn-cancelar")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

if(id) {
    tituloForm.textContent = "Editar Usuario"
    fetch("../../back/web_services/usuarios_ws.php?id=" + id)
    .then(function(respuesta) {
        return respuesta.json()
    })
    .then(function(usuario) {
        nombre.value = usuario.nombre
        email.value = usuario.email
        rol.value = usuario.rol
        usuarioId.value = usuario.id
    })
} else {
    tituloForm.textContent = "Añadir Usuario"
}

form.addEventListener("submit", function(evento) {
    evento.preventDefault()

    const datos = {
        nombre: nombre.value,
        email: email.value,
        password: password.value,
        rol: rol.value
    }

    if(id) {
        datos.id = usuarioId.value
        fetch("../../back/web_services/usuarios_ws.php", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(datos)
        })
        .then(function(respuesta) { return respuesta.json() })
        .then(function(resultado) {
            if(resultado.success) {
                window.location.href = "admin.html"
            }
        })
    } else {
        fetch("../../back/web_services/usuarios_ws.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(datos)
        })
        .then(function(respuesta) {
             return respuesta.json() 
            })
        .then(function(resultado) {
            if(resultado.success) {
                window.location.href = "admin.html"
            }
        })
    }
})

btnCancelar.addEventListener("click", function() {
    window.location.href = "admin.html"
})