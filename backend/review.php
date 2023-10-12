<?php  

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
$mysqli = new mysqli("localhost", "root", "", "hospital");

if($_SERVER['REQUEST_METHOD']==='POST'){
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    extract($data);
    $review_date = $mysqli->real_escape_string($review_date);
    $review = $mysqli->real_escape_string($review);
    $patient_ID = $mysqli->real_escape_string($patient_ID);
    
    $sql = "INSERT INTO `reviews`(`review_date`, `review`, `patient_ID`) VALUES ('$review_date','$review','$patient_ID')";
	
	if($mysqli->query($sql)){		
    	echo json_encode(300);
	}else{
		echo $mysqli->error;
	}
}

if(isset($_GET['getReview'])){
	extract($_GET);
	$array = array();

    $sql = "SELECT * FROM `reviews` WHERE patient_ID='$getReview'";

    $res = $mysqli->query($sql);


    while($row=$res->fetch_assoc()){
    	array_push($array, $row);
    }

    echo json_encode($array);
}
?>