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
    <title>수정 하기</title>
</head>
<body>
    <h1>수정 하기</h1>
    <?php if($row= mysqli_fetch_array($result)){  ?>

    <?php } mysqli_close($conn); ?>
    <form action="./insert.php" method="post">
        <input type="hidden" name="number" value="<?= $view_num ?>">
        <p>
            <label for="name">작성자 : </label>
            <input type="text" id="name" name="name" value="<?= $row['name'] ?>">
        </p>
        <p>            
            <textarea placeholder="메시지 입력.." name="message" id="message" cols="30" rows="10"><?= $row['message'] ?></textarea>
        </p>
        <input type="submit" value="저장">
    </form>
</body>
</html>