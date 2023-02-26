<?php
    include 'conn.php';  
    
    //msg_board 테이블에서 조회
    $view_num = $_GET['number'];
    $sql = "SELECT * FROM msg_board WHERE number = $view_num";
    $result = mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DB 입력 테스트</title>
    <link rel="stylesheet" type="text/css" href="./db.css">
</head>
<body>
    <h1>DB 입력 테스트</h1>
    <h2>내용</h2>
    <?php if($row= mysqli_fetch_array($result)){  ?>
        <h3>글번호: <?= $row['number']?> / 글쓴이: <?= $row['name'] ?></h3>
        <div> <?= $row['message'] ?> </div>
    <?php } mysqli_close($conn); ?>
    
    <p><a href='db.php'>돌아가기</a></p>   
    <p><a href='update.php?number=<?= $row['number']?>'>수정하기</a></p>  
</body>
</html>
