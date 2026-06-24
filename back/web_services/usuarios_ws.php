<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../config/auth.inc.php';
require_once '../models/Usuario.php';

$usuarioModel = new Usuario($conexion);
$method = $_SERVER['REQUEST_METHOD'];


if($method === 'GET'){
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $usuario = $usuarioModel->getById($id);
        echo json_encode($usuario);
    } else {
        $usuarios = $usuarioModel->getAll();
        echo json_encode($usuarios);
    }
} elseif($method === 'POST'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $nombre = $datos['nombre'];
    $email = $datos['email'];
    $password = $datos['password'];
    $rol = $datos['rol'];

    $resultado = $usuarioModel->create($nombre, $email, $password, $rol);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Usuario creado correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al crear el usuario"]);
    }


} elseif($method === 'PUT'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $id = $datos['id'];
    $nombre = $datos['nombre'];
    $email = $datos['email'];
    $rol = $datos['rol'];

    $resultado = $usuarioModel->update($id, $nombre, $email, $rol);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Usuario actualizado correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al actualizar el usuario"]);
    }


} elseif($method === 'DELETE'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $id = $datos['id'];

    $resultado = $usuarioModel->delete($id);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Usuario eliminado correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al eliminar el usuario"]);
    }
}
?>