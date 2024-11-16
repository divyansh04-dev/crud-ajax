<?php
    $conn = mysqli_connect("localhost","root","","crud-ajax");

    if(isset($_POST['checking_update']))
    {
        $user_id = $_POST['user_id'];
        $update_array = [];

        $sql_update = "SELECT * FROM user WHERE user_type = 'user' AND user_id = '$user_id' ";
        $result_update = mysqli_query($conn, $sql_update);

        if($result_update){
            while($update_row = mysqli_fetch_assoc($result_update)){
                array_push($update_array, $update_row);
            }
            header('content-type: application/json');
            echo json_encode($update_array);
        } else{
            echo "no details found" . mysqli_error($conn);
        }
    }

    // update data query
    if(isset($_POST['checking_updates']))
    {
        $user_id = $_POST['user_id'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $password = $_POST['password'];
        $address = $_POST['address'];

        $sql_update = "UPDATE `user` SET `name`='$name',`email`='$email',`phone`='$phone',`password`='$password',`address`='$address' WHERE user_id = '$user_id' ";
        $result_update = mysqli_query($conn, $sql_update);

        if($result_update){
            echo "update successful";
        } else{
            echo "update failed" . mysqli_error($conn);
        }
    }

?>