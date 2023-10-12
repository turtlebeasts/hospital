<?php


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
$mysqli = new mysqli("localhost", "root", "", "hospital");

if($_SERVER['REQUEST_METHOD']==='POST'){
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    extract($data);
    $email = $mysqli->real_escape_string($email);
    $password = $mysqli->real_escape_string($password);
    $type = $mysqli->real_escape_string($type);
    
    $mysqli->query("SELECT * FROM `login` WHERE `email`='$email' AND `password`='$password' AND `user_type`='$type'");
    if($mysqli->affected_rows){
        echo json_encode(200);
    }else{
        echo "Error";
        die();
    }
}

?>