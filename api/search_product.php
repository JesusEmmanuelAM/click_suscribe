<?php


include("./conection.php");

$json_obt = json_decode(file_get_contents('php://input'), true);
$search_word = $json_obt['search_word'];
$data = array ();

$contador = 0;


$search = $mysqli->query("SELECT * FROM `listadoProductos` WHERE `nombre` LIKE '%$search_word%' ");

if ($search->num_rows > 0) {
    while($row = $search->fetch_assoc()) {

        $contador ++;
        
        $data[$contador]['id'] = $row["id"];
        $data[$contador]['nombre'] = $row["nombre"];
        $data[$contador]['descripcion'] = $row["descripcion"];
        $data[$contador]['fabricante'] = $row["fabricante"];
        $data[$contador]['idArticulo'] = $row["idArticulo"];
        $data[$contador]['precio'] = $row["precio"];
        $data[$contador]['img'] = $row["img"];

    }

} else {
    $data = array(   'res' => 0);
}

echo json_encode($data);