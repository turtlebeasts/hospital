<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
$mysqli = new mysqli("localhost", "root", "", "hospital");

if(isset($_GET['get_meds'])){
    $array = array();
    $result = $mysqli->query("SELECT * FROM patient");
    while($row = $result->fetch_assoc()){
        array_push($array, $row);
    }
    echo json_encode($array);
}


if(isset($_GET['getDiag'])){
    $id = $_GET['getDiag'];
    $result = $mysqli->query("SELECT * FROM patient INNER JOIN  diagnosis ON patient.patient_ID = diagnosis.patient_ID WHERE patient.`patient_ID`='$id'");
    $array = array();
    while($row=$result->fetch_assoc()){
        array_push($array, $row);
    }

    if(sizeof($array)===0){
        echo json_encode(404);
    }else{
        echo json_encode($array);
    }
}

if(isset($_GET['profile'])){
    $id = $_GET['profile'];
    $result = $mysqli->query("SELECT * FROM patient WHERE `patient_ID`='$id'");
    $array = array();
    while($row=$result->fetch_assoc()){
        array_push($array, $row);
    }

    if(sizeof($array)===0){
        echo json_encode(404);
    }else{
        echo json_encode($array);
    }
}

if(isset($_GET['getDetail'])){
    $id = $_GET['getDetail'];
    $result = $mysqli->query("SELECT * FROM patient INNER JOIN  photos ON patient.patient_ID = photos.patient_ID WHERE patient.`patient_ID`='$id'");
    $array = array();
    $result2 = $mysqli->query("SELECT * FROM patient WHERE `patient_ID`='$id'");
    $array2 = array();
    
    while($row=$result->fetch_assoc()){
        array_push($array, $row);
    }

    while($row2=$result2->fetch_assoc()){
        array_push($array2, $row2);
    }

    if(sizeof($array)===0){
        echo json_encode($array2);
    }else{
        echo json_encode($array);
    }
}

if($_SERVER['REQUEST_METHOD']==='POST'){
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    extract($data);
    $registration = $mysqli->real_escape_string($registration);
    $reg_date = $mysqli->real_escape_string($reg_date);
    $firstName = $mysqli->real_escape_string($firstName);
    $middleName = $mysqli->real_escape_string($middleName);
    $lastName = $mysqli->real_escape_string($lastName);
    $age = $mysqli->real_escape_string($age);
    $email = $mysqli->real_escape_string($email);
    $phone = $mysqli->real_escape_string($phone);
    $address = $mysqli->real_escape_string($address);
    $gender = $mysqli->real_escape_string($gender);    
    $type = $mysqli->real_escape_string($type);    
    $result = $mysqli->query("SELECT * FROM `patient` WHERE `patient_ID`='$registration'");

    if($result->num_rows){
        echo json_encode(200);
        die();
    }
    $sql = "INSERT INTO `patient`(`patient_ID`, `reg_date`, `first_name`, `middle_name`, `last_name`, `age`, `gender`, `email`, `phone`, `address`, `cured`) VALUES ('$registration','$reg_date','$firstName','$middleName','$lastName','$age','$gender','$email','$phone','$address','0')";

    if($mysqli->query($sql)){
        $patient_id= $mysqli->insert_id;
    }else{
        echo "Error";
        echo $mysqli->error;
        die();
    }
    foreach($images as $i){
        $mysqli->query("INSERT INTO photos (`patient_ID`, `file`, `type`) VALUES ('$registration', '$i', '$type')");
    }

    echo json_encode(300);
}

?>
