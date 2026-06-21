class persona{
    public $nombre;
    public $edad;

    public function __construct($nombre, $edad) {
        $this -> nombre = $nombre;
        $this -> edad = $edad;
    }

    public function saludar (){
        echo "Hola, soy" . $this.nombre . "y tengo" . $this -> edad . "años. <br>";
    }

    
}