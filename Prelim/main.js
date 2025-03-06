$.ajax({
    url : "table.php"
}).done(function(data) {

    console.log(data);
    let result = JSON.parse(data);

    let template = document.querySelector("#produtrowtemplate");
    let parent = document.querySelector("#tableBody");

    result.forEach(item => {
        let clone = template.content.cloneNode(true);
        clone.querySelector(".tdId").innerHTML = item.assigned_id;
        clone.querySelector(".student_name").innerHTML = item.student_name;
        clone.querySelector(".skul").innerHTML = item.school;
        clone.querySelector(".skuladd").innerHTML = item.school_address;
        clone.querySelector(".contak").innerHTML = item.contact_number;
        clone.querySelector(".coord").innerHTML = item.coordinator;
        clone.querySelector(".organi").innerHTML = item.organization;
        clone.querySelector(".age").innerHTML = calculateDate(item.date_created);
        clone.querySelector(".age").setAttribute("data-birthdate", item.date_created);

        parent.appendChild(clone);
    });
});

function calculateDate(datestarted) {
    let startDate = new Date(datestarted);
    let today = new Date();
    let timeDifference = today.getTime() - startDate.getTime();
    let dayDifference = Math.floor(timeDifference / (1000*3600*24));


    return dayDifference;
}

// $("h1").click(function(){
//     console.log("H1 is clicked");
   
// });

$(document).ready(function () {

    console.log("Document is ready");

    $("#addBtn").click(function () {
        console.log("Add button clicked"); 
    });

    // Add Student
    $("#addStudentForm").on("submit", function (event) {
        event.preventDefault();

        let formData = new FormData(this);

        $.ajax({
            url: "add.php",
            type: "POST",
            data: formData,
            contentType: false, 
            processData: false,
            dataType: "json"
        }).done(function (result) {
            console.log("Server Response:", result);

            if (result.res === "success") {
                alert("Student added successfully");
                $("#addStudentModal").modal("hide");
                window.location.reload();
            } else {
                alert("Error: " + result.msg);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Error:", textStatus, errorThrown);
            console.log("Response Text:", jqXHR.responseText); // Log the response text
        });
    });

    // Delete Student
   $(document).on("click", "#delete", function () {
        let row = $(this).closest("tr");
        let studentId = row.find(".tdId").text();

        $.ajax({
            url: "delete.php",
            type: "POST",
            dataType: "json",
            data: {
                id: studentId
            }
        }).done(function (result) {
            if (result.res === "success") {
                alert("Student deleted successfully");
                row.remove();
            } else {
                alert("Error deleting student: " + result.msg);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Error:", textStatus, errorThrown);
        });
    });
    // Edit Student
    $(document).on("click", ".edit-btn", function () {
        let row = $(this).closest("tr");
        let studentId = row.find(".tdId").text();
        let Studentname = row.find(".student_name").text();
        let School = row.find(".skul").text();
        let SchoolAddress = row.find(".skuladd").text();
        let ContactNo = row.find(".contak").text();
        let Coordinator = row.find(".coord").text();
        let Organization = row.find(".organi").text();
        let birthdate = row.find(".age").attr("data-birthdate");

        console.log("bitrhdate", birthdate);

        $("#editStudentId").val(studentId);
        $("#editStudentName").val(Studentname);
        $("#editSchool").val(School);
        $("#editSchoolAdd").val(SchoolAddress);
        $("#editContact").val(ContactNo);
        $("#editCoordinator").val(Coordinator);
        $("#editOrganization").val(Organization);
        $("#editBirthdate").val(birthdate);
    });

    // Update Student
    $("#editStudentForm").on("submit", function (event) {
        event.preventDefault();

        let formData = $(this).serialize();

        $.ajax({
            url: "update.php",
            type: "POST",
            data: formData,
            dataType: "json"
        }).done(function (result) {
            if (result.res === "success") {
                alert("Student updated successfully");
                $("#editStudentModal").modal("hide");
                window.location.reload();
            } else {
                alert("Error updating student: " + result.msg);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Error:", textStatus, errorThrown);
        });
    });
});