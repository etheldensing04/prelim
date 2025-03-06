<?php
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'dbconnection.php';

try {
    $studentName = $_POST['student_name'];
    $School = $_POST['school'];
    $SchoolAdd = $_POST['school_add'];
    $ContactNo = $_POST['contact_no'];
    $Coordinator = $_POST['coordinator'];
    $Organization = $_POST['organization'];
    $DateStarted = $_POST['age'];

    // Insert query
    $stmt = $connection->prepare("INSERT INTO prelimtable (student_name,school,school_address,contact_number,coordinator,organization,date_created) VALUES (?, ?, ?, ?, ?, ?,?)");
    $stmt->execute([$studentName, $School, $SchoolAdd, $ContactNo, $Coordinator, $Organization, $DateStarted]);

    $response = array('res' => 'success', 'msg' => 'Student added successfully');
    echo json_encode($response);
} catch (Exception $e) {
    $response = array('res' => 'error', 'msg' => $e->getMessage());
    echo json_encode($response);
}
?>