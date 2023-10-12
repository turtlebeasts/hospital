<?php  

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
$mysqli = new mysqli("localhost", "root", "", "hospital");

if(isset($_GET['diag_ID'])){
	extract($_GET);
	$result = $mysqli->query("SELECT * FROM `prescription` INNER JOIN medicine on prescription.medicine_ID=medicine.medicine_ID WHERE `diag_ID`='$diag_ID'");
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
    foreach($prescription as $p){
    	$name = $p['name'];
    	$quantity = $p['quantity'];
    	$dosage = $p['dosage'];
        $instruction = $p['instruction'];
        $name = $mysqli->real_escape_string($name);
        $quantity = $mysqli->real_escape_string($quantity);
        $dosage = $mysqli->real_escape_string($dosage);
        $instruction = $mysqli->real_escape_string($instruction);
    	$mysqli->query("INSERT INTO `prescription`(`diag_ID`, `medicine_ID`, `water_quantity`, `times_perday`,`instruction`) VALUES ('$diag_ID','$name','$quantity','$dosage', '$instruction')");
    }
    if($mysqli->affected_rows){
        echo json_encode(200);
    }else{
        echo $mysqli->error;
        die();
    }
}
?>