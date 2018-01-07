<?php 
include 'connect.php';

$url =  $_SERVER['PHP_SELF'];	
$url = explode("/", $url);

if(isset($url[4]))
$service = $url[4];

if(isset($url[5]))
$method = $url[5];


$data = file_get_contents('php://input');

 switch($service)
 {
	case "categories":
	categories($method,$mysqli,$data);
	break;

	case "sub_categories":
	sub_categories($method,$mysqli,$data);
	break;

	case "products":
	product($method,$mysqli,$data);
	break;

	default :
	echo "Don't do this";
	break;
}


function categories($method,$mysqli,$data)
{
	$data = json_decode($data, true);
	
	if ($method=="get")
	{
		$query="select * from categories";
		$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		echo json_encode($json );
	}

	if ($method=="create")
	{

		//Getting the data 
		$name = $data['name'];
		$priority = $data['priority'];
	
		$stmt = $mysqli->prepare('INSERT INTO categories (name, priority) VALUES (?, ?)');
		$stmt->bind_param('ss', $name,$priority);
		$result = $stmt->execute();
		echo json_encode($result);
	}

	if ($method=="delete")
	{

		$id = $data['id'];
		$stmt = $mysqli->prepare('DELETE FROM categories WHERE _id = ?');
		$stmt->bind_param('s', $id);
		$result = $stmt->execute();
		echo json_encode($result);
	}

	if($method=="update")
	{
		$query = "UPDATE categories SET";
		$comma = " ";
		$id = $data['_id'];
		$whitelist = array(
			'name',
			'priority'
		);

		foreach($data as $key => $val) {
			if( ! empty($val) && in_array($key, $whitelist)) {
				$query .= $comma . $key . " = '" . $mysqli->real_escape_string(trim($val)) . "'";
				$comma = ", ";
			}
		}
		$query .= " where _id = ?";
		echo $query;
		$stmt = $mysqli->prepare($query);
		$stmt->bind_param('s', $id);
		$result = $stmt->execute();

		echo $result;
	}

}


function sub_categories($method,$mysqli,$data)
{

	$data = json_decode($data, true);
	
	if(isset($data['category']))
	$category = $data['category'];

	else
	echo "Parameters are not defined properly\n";
	

	if ($method=="get")
	{
		$stmt = $mysqli->prepare('SELECT * FROM sub_categories WHERE category = ?');
		$stmt->bind_param('s', $category);
		$stmt->execute();
		$result = $stmt->get_result();
		$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		echo json_encode($json );
	}

	if ($method=="create")
	{

	}

	if ($method=="delete")
	{

	}

	if($method=="update")
	{

	}


}

function product($method,$mysqli,$data)
{

	$data = json_decode($data, true);
	
	if(isset($data['sub_cat']))
	$sub_cat = $data['sub_cat'];

	else
	echo "Parameters are not defined properly";

	if ($method=="get")
	{
		$stmt = $mysqli->prepare('SELECT * FROM products WHERE sub_categories = ?');
		$stmt->bind_param('s', $sub_cat);
		$stmt->execute();
		$result = $stmt->get_result();
		$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		echo json_encode($json );
	}
	
	
	if ($method=="create")
	{

	}

	if ($method=="delete")
	{

	}

	if($method=="update")
	{

	}
}


?>