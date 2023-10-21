<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
$mysqli = new mysqli("localhost", "root", "", "hospital");

if(isset($_GET['id'])){
    extract($_GET);
    $mysqli->query("UPDATE `medicine` SET `isdelete`=1 WHERE `medicine_ID`='$id'");
    echo json_encode(200);
}
?>
