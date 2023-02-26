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
    <br/>
    <h2>삭제 결과</h2>
    <ul>
    <?php
        include 'conn.php';   

        $user_delnum = $_POST['delnum'];

        $sqlDEL = "DELETE FROM msg_board WHERE number = '$user_delnum'";
        mysqli_query($conn, $sqlDEL);

        $sql = "SELECT * FROM msg_board";
        $result = mysqli_query($conn, $sql);
        $list = '';
        print '<br/>';

        if(mysqli_num_rows($result)>0){
            while($row = mysqli_fetch_array($result)){
                $list = $list."<li>{$row['number']}:
                <a href=\"view.php?number={$row['number']}\">{$row['name']}</a></li>";           
            }
            echo $list;
        }
        else {
            print '<br/>검색결과가 없습니다.';
        }
        mysqli_close($conn);
    ?>
    </ul>
    <br/>
    <p><?php echo $user_delnum.'번째 데이터가 삭제되었습니다.'; ?></p>
    <p><a href='db.php'>돌아가기</a></p>    
</body>
</html>
