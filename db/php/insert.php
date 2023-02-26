<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>입력</title>
</head>
<body>
<?php
    include 'conn.php';   

    $number = $_POST['number'];
    $user_name = $_POST['name'];
    $user_msg = $_POST['message'];
    $sqlCheck = "SELECT * FROM msg_board WHERE number = $number";
    $resulCheck = $conn->query($sqlCheck);
 
    // print("번호 : ".$number);
    // print '<br/>';  
    // print($resulCheck->num_rows. " 개의 게시물 확인");
    // print '<br/>'; 
    //$stmt = $conn->prepare("SELECT * FROM msg_board WHERE number = ?")

    if(($resulCheck->num_rows) === 0){
        $sql = "INSERT INTO msg_board (name, message) VALUES ('$user_name', '$user_msg')";
    } else {        
        $sql = "UPDATE msg_board SET name = '$user_name', message = '$user_msg' WHERE number = $number";
    }

    $result = mysqli_query($conn, $sql);

    if($result === false) {
        echo '저장하지 못했습니다.';
        error_log(mysqli_error($conn));
    } else {
        echo '저장되었습니다.';
    }

    mysqli_close($conn);
?>
<hr/>
<p><a href='db.php'>돌아가기</a></p>
</body>
</html>

