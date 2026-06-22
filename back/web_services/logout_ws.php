<?php
header('Content-Type: application/json');
require_once '../config/auth.inc.php';
session_destroy();
echo json_encode(["success" => true]);
?>