const btnLogout = document.getElementById("btn-logout")
const bienvenida = document.getElementById("bienvenida")
const tbodyLibros = document.getElementById("tbody-libros-disponibles")
const tbodyReservas = document.getElementById("tbody-mis-reservas")

let usuarioActualId = null
function cargarDatosUsuario(){
    fetch("../../back/web_services/panel_ws.php")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(datos){
        bienvenida.textContent = "Bienvenido, " + datos.nombre
        usuarioActualId = datos.usuario_id
        cargarMisReservas()
    })
}

function cargarLibrosDisponibles(){
    fetch("../../back/web_services/libros_ws.php")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(libros){
        tbodyLibros.innerHTML = ""
        libros.forEach(function(libro){
            if(libro.disponible === "1"){
                const fila = document.createElement("tr")
                fila.innerHTML = `
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>
                        <button onclick="reservarLibro(${libro.id})">Reservar</button>
                    </td>
                `
                tbodyLibros.appendChild(fila)
            }
        })
    })
}

function cargarMisReservas(){
    tbodyReservas.innerHTML = ""
    fetch("../../back/web_services/reservas_ws.php")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(reservas){
        reservas.forEach(function(reserva){
            if(reserva.usuario_id === usuarioActualId){
                const fila = document.createElement("tr")
                fila.innerHTML = `
                    <td>${reserva.id}</td>
                    <td>${reserva.libro_id}</td>
                    <td>${reserva.fecha}</td>
                    <td>
                        <button onclick="devolverReserva(${reserva.id}, ${reserva.libro_id})">Devolver</button>
                    </td>
                `
                tbodyReservas.appendChild(fila)
            }
        })
    })
}

function reservarLibro(libroId){
    if(tbodyReservas.rows.length >= 2){
        alert("Ya tienes el máximo de dos reservas")
        return
    }

    const hoy = new Date().toISOString().split("T")[0]

    const datos = {
        usuario_id: usuarioActualId,
        libro_id: libroId,
        fecha: hoy
    }

    fetch("../../back/web_services/reservas_ws.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(datos)
    })
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(resultado){
        if(resultado.success === true){
            const datoLibro = {
                id: libroId,
                disponible: 0
            }
            fetch("../../back/web_services/libros_ws.php", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(datoLibro)
            })
            .then(function(respuesta){
                return respuesta.json()
            })  
            .then(function(){
                cargarLibrosDisponibles()
                cargarMisReservas()
            }) 
        }   
    })
} 

function devolverReserva(reservaId, libroId){
    if(confirm("¿Estás seguro de que quieres devolver el libro?")){
        fetch("../../back/web_services/reservas_ws.php", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: reservaId})
        })
        .then(function(respuesta){
            return respuesta.json()
        })
        .then(function(resultado){
            if(resultado.success === true){
                datoLibro = {
                    id: libroId,
                    disponible: 1
                }
                fetch("../../back/web_services/libros_ws.php", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(datoLibro)
                })
                .then(function(respuesta){
                    return respuesta.json()
                })
                .then(function(){
                    cargarLibrosDisponibles()
                    cargarMisReservas()
                })
            }
        })
    }
}

btnLogout.addEventListener("click", function(){
    fetch("../../back/web_services/logout_ws.php")
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(resultado){
        if(resultado.success === true){
            window.location.href = "../html/login.html"
        }
    })
})

cargarDatosUsuario()
cargarLibrosDisponibles()