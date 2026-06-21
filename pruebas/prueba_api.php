<?php
header('Content-Type: application/json');
$conexion = new mysqli("localhost", "root", "", "biblioteca");
if($conexion -> connect_error){
    die("Error: " . $conexion -> connect_error);
}
$resultado = $conexion -> query("SELECT * FROM libros");
$libros = [];
while($fila = $resultado -> fetch_assoc()){
    $libros[] = $fila;
}
echo json_encode($libros);
?>