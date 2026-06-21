<?php
class Persona {
    public $nombre;
    public $edad;

    public function __construct($nombre, $edad) {
        $this->nombre = $nombre;
        $this->edad = $edad;
    }

    public function saludar() {
        echo "Hola, soy" . " " . $this->nombre . " " . "y tengo" . " " . $this->edad . " " . "años. <br>";
    }
}

$persona1 = new Persona("Ana", 18);
$persona1->saludar();
$persona2 = new Persona("Manolo", 20);
$persona2->saludar();
?>