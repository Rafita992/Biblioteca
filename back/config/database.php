<?php
$conexion = new mysqli("localhost", "root", "", "biblioteca");
if($conexion -> connect_error){
    die("Error: " . $conexion -> connect_error);
}
?>