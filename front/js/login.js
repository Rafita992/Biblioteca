const email = document.getElementById("email")
const password = document.getElementById("password")
const formulario = document.getElementById("form-login")
const parrafo = document.getElementById("mensaje-error")

formulario.addEventListener("submit", function(evento){
    evento.preventDefault()
    fetch("../../back/web_services/login_ws.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: email.value, password: password.value})
    })
    .then(function(respuesta) {
        return respuesta.json()
    })
    .then(function(datos) {
        if(datos.success === true) {
            if(datos.rol === "admin") {
                window.location.href = "../html/admin.html"
            } else {
                window.location.href = "../html/panel.html"
            }
        } else {
            parrafo.textContent = datos.mensaje
        }
    })
})