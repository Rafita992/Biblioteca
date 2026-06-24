<?php
class Reserva{
    private $conexion;

    public function __construct($conexion){
        $this->conexion = $conexion;
    }

    public function getAll(){
        $resultado = $this->conexion->query("SELECT * FROM reservas");
        $reservas = [];
        while($fila = $resultado->fetch_assoc()){
            $reservas[] = $fila;
        }
        return $reservas;
    }

    public function getById($id){
        $resultado = $this -> conexion -> query("SELECT * FROM reservas WHERE id = $id");
        return $resultado -> fetch_assoc();
    }

    public function create($usuario_id, $libro_id, $fecha){
        $resultado = $this->conexion->query("INSERT INTO reservas (usuario_id, libro_id, fecha) VALUES ('$usuario_id', '$libro_id', '$fecha')");
        return $resultado;
    }

    public function update($id, $usuario_id, $libro_id, $fecha){
        $resultado = $this->conexion->query("UPDATE reservas SET usuario_id='$usuario_id', libro_id='$libro_id', fecha='$fecha' WHERE id=$id");
        return $resultado;
    }

    public function delete($id){
        $resultado = $this->conexion->query("DELETE FROM reservas WHERE id=$id");
        return $resultado;
    }
}
?>