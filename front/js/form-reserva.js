const form = document.getElementById("form-reserva")
const tituloForm = document.getElementById("titulo-form")
const reservaId = document.getElementById("reserva-id")
const usuarioId = document.getElementById("reserva-usuario-id")
const libroId = document.getElementById("reserva-libro-id")
const reservaDate = document.getElementById("reserva-fecha")
const btnCancelar = document.getElementById("btn-cancelar")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

if(id){
    tituloForm.textContent = "Editar Reserva"
    fetch("../../back/web_services/reservas_ws.php?id=" + id)
    .then(function(respuesta){
        return respuesta.json()
    })
    .then(function(reserva){
        reservaId.value = reserva.id
        usuarioId.value = reserva.usuario_id
        libroId.value = reserva.libro_id    
        reservaDate.value = reserva.fecha
    })
} else {
    tituloForm.textContent = "Añadir Reserva"
}

form.addEventListener("submit", function(evento){
    evento.preventDefault()

    const datos ={
        usuario_id: usuarioId.value,
        libro_id: libroId.value,
        fecha: reservaDate.value
    }

    if(id){
        datos.id = reservaId.value
        fetch("../../back/web_services/reservas_ws.php", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(datos)
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
                window.location.href = "admin.html"
            }
        })
    }
})

btnCancelar.addEventListener("click", function(){
    window.location.href = "admin.html"
})