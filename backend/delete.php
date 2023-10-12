<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
$mysqli = new mysqli("localhost", "root", "", "hospital");

if(isset($_GET['id'])){
    extract($_GET);
    $result = $mysqli->query("SELECT * FROM `diagnosis` WHERE `patient_ID`='$id'");
    $array = array();
    while($row=$result->fetch_assoc()){
        $mysqli->query("DELETE FROM `prescription` WHERE `diag_ID`='".$row['diag_ID']."'");
    }
    $mysqli->query("DELETE FROM `diagnosis` WHERE `patient_ID`='$id'");
    $mysqli->query("DELETE FROM `photos` WHERE `patient_ID`='$id'");
    $mysqli->query("DELETE FROM `guardian` WHERE `patient_ID`='$id'");
    $mysqli->query("DELETE FROM `patient` WHERE `patient_ID`='$id'");
    echo json_encode(200);
}
?>
