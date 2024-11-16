<?php
    $conn = mysqli_connect("localhost","root","","crud-ajax");

    if (isset($_POST['id'])) {
        $id = $_POST['id'];
        $new_status = $_POST['newStatus'];

        // Update the status in the database
        $sql_status_update = "UPDATE `user` SET `status` = '$new_status' WHERE `user_id` = '$id' ";
        $sql_status_result = mysqli_query($conn, $sql_status_update);

        if ($sql_status_result) {
            echo 200;
        } else {
            echo 201;
        }
    }


?>