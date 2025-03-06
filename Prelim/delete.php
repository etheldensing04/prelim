<?php
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("dbconnection.php");

$studentId = $_POST['id'];

$query = "DELETE FROM prelimtable WHERE assigned_id = ?";
$statement = $connection->prepare($query);
$res = $statement->execute([$studentId]);

if($res){
    echo json_encode(["res" => "success"]);
}else{
    echo json_encode(["res" => "error", "msg" => "Student not deleted"]);
}
?>