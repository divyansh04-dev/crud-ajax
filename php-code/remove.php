<?php
    $conn = mysqli_connect("localhost","root","","crud-ajax");

    if(isset($_POST['checking_remove']))
    {
        $user_id = $_POST['user_id'];

        $sql_remove = "DELETE FROM `user` WHERE user_id='$user_id' ";
        $result_remove = mysqli_query($conn, $sql_remove);

        if($result_remove){
            echo "remove successful";
        } else{
            echo "remove failed" . mysqli_error($conn);
        }
    }

?>