<?php
    //$conn = mysqli_connect("localhost", "root", "db1234", "justpanic");
    $conn = mysqli_connect("localhost", "justpanic", "still3704!", "justpanic");
    
    if(!$conn){
        echo 'DB에 연결하지 못했습니다.'.mysqli_connect_error();
    } else {
        echo 'DB에 접속했습니다.';
    }
    print '<br/><br/>';
?>