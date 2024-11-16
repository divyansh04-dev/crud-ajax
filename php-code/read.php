<?php
    $conn = mysqli_connect("localhost","root","","crud-ajax");

    $sql_read = "SELECT * FROM user WHERE user_type = 'user' ";
    $result_read = mysqli_query($conn, $sql_read);
    $read_array = [];

    if($result_read){
        while($user_row = mysqli_fetch_assoc($result_read)){
            array_push($read_array, $user_row);
        }
        header('content-type: application/json');
        echo json_encode($read_array);
    } else{
        echo "failed!" . mysqli_error($conn);
    }
?>