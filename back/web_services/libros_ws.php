<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../config/auth.inc.php';
require_once '../models/Libro.php';

$libroModel = new Libro($conexion);
$method = $_SERVER['REQUEST_METHOD'];

// GET → listar todos los libros
if($method === 'GET'){
    $libros = $libroModel->getAll();
    echo json_encode($libros);

// POST → crear libro nuevo
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

// PUT → editar libro
} elseif($method === 'PUT'){
    $datos = json_decode(file_get_contents('php://input'), true);
    $id = $datos['id'];
    $titulo = $datos['titulo'];
    $autor = $datos['autor'];
    $disponible = $datos['disponible'];

    $resultado = $libroModel->update($id, $titulo, $autor, $disponible);

    if($resultado){
        echo json_encode(["success" => true, "mensaje" => "Libro actualizado correctamente"]);
    } else {
        echo json_encode(["success" => false, "mensaje" => "Error al actualizar el libro"]);
    }

// DELETE → borrar libro
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