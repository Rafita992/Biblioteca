<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../config/auth.inc.php';
require_once '../models/Reserva.php';

$reservaModel = new Reserva($conexion);
$method = $_SERVER['REQUEST_METHOD'];


if($method === 'GET'){
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $reserva = $reservaModel -> getById($id);
        echo json_encode($reserva);
    } else {
        $reservas = $reservaModel -> getAll();
        echo json_encode($reservas);
    }
} elseif($method === 'POST'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $usuario_id = $datos['usuario_id'];
    $libro_id = $datos['libro_id'];
    $fecha = $datos['fecha'];   

    $resultado = $reservaModel->create($usuario_id, $libro_id, $fecha);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Reserva creada correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al crear la reserva"]);
    }


} elseif($method === 'PUT'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $id = $datos['id'];
    $usuario_id = $datos['usuario_id'];
    $libro_id = $datos['libro_id'];
    $fecha = $datos['fecha'];

    $resultado = $reservaModel->update($id, $usuario_id, $libro_id, $fecha);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Reserva actualizada correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al actualizar la reserva"]);
    }


} elseif($method === 'DELETE'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $id = $datos['id'];

    $resultado = $reservaModel->delete($id);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Reserva eliminada correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al eliminar la reserva"]);
    }
}
?>