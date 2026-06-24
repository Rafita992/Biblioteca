const btnAddUsuario = document.getElementById("btn-add-usuario")
const btnAddLibro = document.getElementById("btn-add-libro")
const btnAddReserva = document.getElementById("btn-add-reserva")

const btnLogout = document.getElementById("btn-logout")

const tbodyUsuarios = document.getElementById("tbody-usuarios")
const tbodyLibros = document.getElementById("tbody-libros")
const tbodyReservas = document.getElementById("tbody-reservas")

function cargarUsuarios(){
    fetch("../../back/web_services/usuarios_ws.php")
        .then(function(respuesta){
            return respuesta.json()
        })
        .then(function(usuarios){
            tbodyUsuarios.innerHTML = ""
            usuarios.forEach(function(usuario){
                const fila = document.createElement("tr")
                fila.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.rol}</td>
                    <td>
                        <button onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button onclick="borrarUsuario(${usuario.id})">Borrar</button>
                    </td>
                `
                 tbodyUsuarios.appendChild(fila)
            })
        })
}

function cargarLibros(){
    fetch("../../back/web_services/libros_ws.php")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(libros){
        tbodyLibros.innerHTML = ""
        libros.forEach(function(libro){
            const fila = document.createElement("tr")
            fila.innerHTML = `
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.disponible}</td>
                    <td>
                        <button onclick="editarLibro(${libro.id})">Editar</button>
                        <button onclick="borrarLibro(${libro.id})">Borrar</button>
                    </td>
                `
                 tbodyLibros.appendChild(fila)
        })
    })
}

function cargarReservas(){
    fetch("../../back/web_services/reservas_ws.php")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(reservas){
        tbodyReservas.innerHTML = ""
        reservas.forEach(function(reserva){
            const fila = document.createElement("tr")
            fila.innerHTML = `
                    <td>${reserva.id}</td>
                    <td>${reserva.usuario_id}</td>
                    <td>${reserva.libro_id}</td>
                    <td>${reserva.fecha}</td>
                    <td>
                        <button onclick="editarReserva(${reserva.id})">Editar</button>
                        <button onclick="borrarReserva(${reserva.id})">Borrar</button>
                    </td>
                `
            tbodyReservas.appendChild(fila)
        })
    })
}

btnLogout.addEventListener("click", function() {
    fetch("../../back/web_services/logout_ws.php")
    .then(function(respuesta) {
        return respuesta.json()
    })
    .then(function(datos) {
        if(datos.success === true) {
            window.location.href = "../html/login.html"
        }
    })
})

btnAddUsuario.addEventListener("click", function(){
    window.location.href = "form-usuario.html"
})

btnAddLibro.addEventListener("click", function() {
    window.location.href = "form-libro.html"
})

btnAddReserva.addEventListener("click", function() {
    window.location.href = "form-reserva.html"
})

function editarUsuario(id) {
    window.location.href = "form-usuario.html?id=" + id
}

function editarLibro(id){
    window.location.href = "form-libro.html?id=" + id
}

function editarReserva(id){
    window.location.href = "form-reserva.html?id=" + id
}
function borrarUsuario(id) {
    if(confirm("¿Seguro que quieres borrar este usuario?")) {
        fetch("../../back/web_services/usuarios_ws.php", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: id})
        })
        .then(function(respuesta) { 
            return respuesta.json() 
        })
        .then(function(resultado) {
            if(resultado.success) {
                cargarUsuarios()
            }
        })
    }
}

function borrarLibro(id){
    if(confirm("¿Seguro que quieres borrar este libro?")){
        fetch("../../back/web_services/libros_ws.php", {
            method : "DELETE",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify({id: id})
        })
        .then(function(respuesta){
            return respuesta.json()
        })
        .then(function(resultado){
            if(resultado.success === true){
                cargarLibros()
            }
        })()
    }
}
function borrarReserva(id){
    if(confirm("¿Seguro que quieres borrar este libro?")){
        fetch("../../back/web_services/reservas_ws.php", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: id})
        })
        .then(function(respuesta){
            return respuesta.json()
        })
        .then(function(resultado){
            if(resultado.success === true){
                cargarReservas()
            }
        })
    }
}


cargarUsuarios()
cargarLibros()
cargarReservas()