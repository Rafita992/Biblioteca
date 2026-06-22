<?php
class Usuario{
    private $conexion;

    public function __construct($conexion){
        $this->conexion = $conexion;
    }

    public function getByEmail($email){
        $resultado = $this->conexion->query("SELECT * FROM usuarios WHERE email = '$email'");
        return $resultado->fetch_assoc();
    }

    public function getAll(){
    $resultado = $this->conexion->query("SELECT * FROM usuarios");
    $usuarios = [];
    while($fila = $resultado->fetch_assoc()){
        $usuarios[] = $fila;
    }
    return $usuarios;
    }

    public function create($nombre, $email, $password, $rol){
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $resultado = $this->conexion->query("INSERT INTO usuarios (nombre, email, password, rol) VALUES ('$nombre', '$email', '$passwordHash', '$rol')");
        return $resultado;
    }

    public function update($id, $nombre, $email, $rol){
        $resultado = $this->conexion->query("UPDATE usuarios SET nombre='$nombre', email='$email', rol='$rol' WHERE id=$id");
       return $resultado;
    }

    public function delete($id){
        $resultado = $this->conexion->query("DELETE FROM usuarios WHERE id=$id");
        return $resultado;
    }
}
?>