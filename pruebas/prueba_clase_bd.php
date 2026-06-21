<?php
$conexion = new mysqli("localhost", "root", "", "biblioteca");
class Libro{
    private $conexion;

    public function __construct($conexion){
        $this -> conexion = $conexion;
    }
    public function getAll(){
        $resultado = $this -> conexion -> query("SELECT titulo, autor FROM libros");
        $libros = [];
        while($fila = $resultado -> fetch_assoc()){
            $libros[] = $fila;
        }
        return $libros;
    }
}
$libro1 = new Libro($conexion);
$lista = $libro1 -> getAll();
print_r($lista);
?>