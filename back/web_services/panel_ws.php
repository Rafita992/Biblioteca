<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../config/auth.inc.php';
require_once '../models/Reserva.php';

echo json_encode([
    "nombre" => $_SESSION['nombre'],
    "usuario_id" => $_SESSION['usuario_id'],
    "rol" => $_SESSION['rol']
]);
?>