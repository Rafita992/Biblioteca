<?php
session_start();
function estaLogueado(){
    return isset($_SESSION["usuario_id"]);
}
function esAdmin(){
    return isset($_SESSION["rol"]) && $_SESSION["rol"] === "admin";
}
?>