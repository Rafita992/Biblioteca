<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../config/auth.inc.php';
require_once '../models/Libro.php';

$libroModel = new Libro($conexion);
$method = $_SERVER['REQUEST_METHOD'];

if($method === 'GET'){
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $libro = $libroModel -> getById($id);
        echo json_encode($libro);
    } else {
        $libros = $libroModel -> getAll();
        echo json_encode($libros);
    }

} elseif($method === 'POST'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $titulo = $datos['titulo'];
    $autor = $datos['autor'];

    $resultado = $libroModel->create($titulo, $autor);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Libro creado correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al crear el libro"]);
    }

} elseif($method === 'PUT'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $id = $datos['id'];
    
    if(isset($datos['titulo'])){
        $titulo = $datos['titulo'];
        $autor = $datos['autor'];
        $disponible = $datos['disponible'];
        $resultado = $libroModel->update($id, $titulo, $autor, $disponible);
    } else {
        $disponible = $datos['disponible'];
        $resultado = $libroModel->updateDisponible($id, $disponible);
    }
    
    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Libro actualizado correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al actualizar el libro"]);
    }

} elseif($method === 'DELETE'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $id = $datos['id'];

    $resultado = $libroModel->delete($id);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Libro eliminado correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al eliminar el libro"]);
    }
}
?>