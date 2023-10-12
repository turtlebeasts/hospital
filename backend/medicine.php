<?php  

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
$mysqli = new mysqli("localhost", "root", "", "hospital");

if(isset($_GET['medicine'])){
	$result = $mysqli->query("SELECT * FROM (`medicine` INNER JOIN `manufacturer` ON medicine.man_ID=manufacturer.man_ID)INNER JOIN `dosage_form` ON medicine.dosage_ID=dosage_form.dosage_ID");
	$array = array();
	while($row=$result->fetch_assoc()){
		array_push($array, $row);
	}
	echo json_encode($array);
}

if(isset($_GET['manufacturer'])){
	$result = $mysqli->query("SELECT * FROM `manufacturer`");
	$array = array();
	while($row=$result->fetch_assoc()){
		array_push($array, $row);
	}
	echo json_encode($array);
}

if(isset($_GET['dosage_form'])){
	$result = $mysqli->query("SELECT * FROM `dosage_form`");
	$array = array();
	while($row=$result->fetch_assoc()){
		array_push($array, $row);
	}
	echo json_encode($array);
}

if($_SERVER['REQUEST_METHOD']==='POST'){
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    extract($data);
    $name = $mysqli->real_escape_string($name);
    $generic_name = $mysqli->real_escape_string($generic_name);
    $description = $mysqli->real_escape_string($description);
    $man_ID = $mysqli->real_escape_string($man_ID);
    $dosage_ID = $mysqli->real_escape_string($dosage_ID);
    $price = $mysqli->real_escape_string($price);
    
    $mysqli->query("INSERT INTO `medicine`(`name`, `generic_name`, `description`, `man_ID`, `dosage_ID`, `price`) VALUES ('$name','$generic_name','$description','$man_ID','$dosage_ID','$price')");
    if($mysqli->affected_rows){
        echo json_encode(200);
    }else{
        echo "Error";
        die();
    }
}
?>