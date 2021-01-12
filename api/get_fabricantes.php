<?php


include("./conection.php");


$data = array ();


$busqueda = $mysqli->query("SELECT DISTINCT fabricante FROM listadoProductos WHERE 1 ");

if ($busqueda->num_rows > 0) {
    // output data of each row
    while($row = $busqueda->fetch_assoc()) {
        array_push($data, $row["fabricante"]);
    }

}

echo json_encode($data);