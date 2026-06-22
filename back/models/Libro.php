<?php
class Libro{
    private $conexion;

    public function __construct($conexion){
        $this->conexion = $conexion;
    }

    public function getAll(){
        $resultado = $this->conexion->query("SELECT * FROM libros");
        $libros = [];
        while($fila = $resultado->fetch_assoc()){
            $libros[] = $fila;
        }
        return $libros;
    }

    public function create($titulo, $autor){
        $resultado = $this->conexion->query("INSERT INTO libros (titulo, autor, disponible) VALUES ('$titulo', '$autor', 1)");
        return $resultado;
    }

    public function update($id, $titulo, $autor, $disponible){
        $resultado = $this->conexion->query("UPDATE libros SET titulo='$titulo', autor='$autor', disponible='$disponible' WHERE id=$id");
        return $resultado;
    }

    public function delete($id){
        $resultado = $this->conexion->query("DELETE FROM libros WHERE id=$id");
        return $resultado;
    }
}
?>