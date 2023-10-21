<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$mysqli = new mysqli("localhost", "root", "", "hospital");

if($_SERVER['REQUEST_METHOD']==='POST'){
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    extract($data);
    $patient_ID = $mysqli->real_escape_string($patient_ID);
    $date = $mysqli->real_escape_string($date);
    $diagnosis = $mysqli->real_escape_string($diagnosis);
    $initial_remarks = $mysqli->real_escape_string($initial_remarks);
    $mysqli->query("INSERT INTO `diagnosis`(`patient_ID`, `date`, `diagnosis`, `initial_remarks`) VALUES ('$patient_ID','$date','$diagnosis','$initial_remarks')");

    if($mysqli->affected_rows()){
        echo 200;
    }else{
        echo "Error";
        die();
    }
    $stmt->close();
    $mysqli->close();
}

if(isset($_GET['diagid'])){
    extract($_GET);
    $result = $mysqli->query("SELECT * FROM `print_details` WHERE `diag_ID`='$diagid'");
    $array = array();
    while($row=$result->fetch_assoc()){
        array_push($array, $row);
    }
    echo json_encode($array);
}
?>
