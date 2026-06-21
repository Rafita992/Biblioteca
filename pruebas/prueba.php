<?php
$nombre = "Ana";
echo "Hola, me llamo $nombre <br>";
$edad = 18;
echo "Hola, me llamo $nombre" . " " . "y tengo $edad años <br>";

$rol = "admin";
if($rol === "admin") {
    echo "Tienes acceso al panel de admin <br>";
} else {
    echo "Tienes acceso al panel de usuario";
}

$autores = ["Cervantes", "Federico", "Pablo"];
echo "$autores[0] <br>";
$libro = ["titulo" => "El ganso", "autor" => "Orwell" ];
echo $libro["autor"];

foreach ($autores as $elemento) {
    echo "$elemento <br>";
}

$conexion = new mysqli("localhost", "root", "", "biblioteca");
if( $conexion -> connect_error){
    die("Error: " . $conexion -> connect_error);
}
echo "Conexión realizada con éxito <br>"

?>