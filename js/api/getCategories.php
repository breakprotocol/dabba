<?php 
require_once 'connection/connect.php'; // The mysql database connection script

function getCategories(){
$query="select * from categories";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
// $arr = array();
// if($result->num_rows > 0) {
// 	while($row = $result->fetch_assoc()) {
// 		$arr[] = $row;	
// 	}
// }

# JSON-encode the response
echo $json_response = json_encode($result);
}
getCategories();
?>