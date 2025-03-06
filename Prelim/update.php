<?php
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'dbconnection.php';

try {
    $studentId = $_POST['editStudentId'];
    $studentName = $_POST['editStudentName'];
    $School = $_POST['editSchool'];
    $SchoolAdd = $_POST['editSchoolAdd'];
    $ContactNo = $_POST['editContact'];
    $Coordinator = $_POST['editCoordinator'];
    $Organization = $_POST['editOrganization'];
    $DateStarted = $_POST['editBirthdate'];

    // Update query
    $stmt = $connection->prepare("UPDATE prelimtable SET student_name= ?,school = ?,school_address= ?,contact_number = ?, coordinator=?, organization= ?,date_created= ? WHERE assigned_id = ?");
    $stmt->execute([$studentName, $School, $SchoolAdd, $ContactNo, $Coordinator, $Organization, $DateStarted, $studentId]);

    $response = array('res' => 'success', 'msg' => 'Student updated successfully');
    echo json_encode($response);
} catch (Exception $e) {
    $response = array('res' => 'error', 'msg' => $e->getMessage());
    echo json_encode($response);
}
?>