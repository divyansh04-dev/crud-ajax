<?php
    $conn = mysqli_connect("localhost","root","","crud-ajax");

    // insert query
    if(isset($_POST['checking_add']))
    {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $password = $_POST['password'];
        $address = $_POST['address'];

        $sql_insert = "INSERT INTO `user`(`name`, `email`, `phone`, `password`, `address`, `user_type`, `status`) VALUES ('$name','$email','$phone','$password','$address','user','0') ";
        $result = mysqli_query($conn, $sql_insert);

        if($result){
            echo 'Record added';
        } else{
            echo 'recorded failed';
        }
    }
    
    // view select query
    if(isset($_POST['checking_view']))
    {
        $user_id = $_POST['user_id'];
        $view_array = [];

        $sql_view = "SELECT * FROM user WHERE user_type = 'user' AND user_id = '$user_id' ";
        $result_view = mysqli_query($conn, $sql_view);

        if($result_view){
            while($view_row = mysqli_fetch_assoc($result_view)){
                array_push($view_array, $view_row);
            }
            header('content-type: application/json');
            echo json_encode($view_array);
        } else{
            echo "no details found" . mysqli_error($conn);
        }
    }
?>