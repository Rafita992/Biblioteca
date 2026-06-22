<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../config/auth.inc.php';
require_once '../models/Usuario.php';
$datos = json_decode(file_get_contents('php://input'), true);
$email = $datos['email'];
$password = $datos['password'];

$usuarioModel = new Usuario($conexion);
$usuario = $usuarioModel->getByEmail($email);

if($usuario === null){
    echo json_encode(["success" => false, "mensaje" => "Usuario no encontrado"]);
    exit;
}
if(!password_verify($password, $usuario['password'])){
    echo json_encode(["success" => false, "mensaje" => "Contraseña incorrecta"]);
    exit;
}

$_SESSION['usuario_id'] = $usuario['id'];
$_SESSION['rol'] = $usuario['rol'];
$_SESSION['nombre'] = $usuario['nombre'];

echo json_encode(["success" => true, "rol" => $usuario['rol']]);
$conexion->close();
?>