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
    <h2>입력 목록</h2>
    <ul>
    <?php
        include 'conn.php';       

        //msg_board 테이블에서 조회
        $sql = "SELECT * FROM msg_board";
        $result = mysqli_query($conn, $sql);
        $list = '';

        // echo, print : 값을 그대로 출력 
        // print_r : 배열-객체 모양 그대로 출력
        // var_dump : print_r 상세하게

        while($row = mysqli_fetch_array($result)){
            $list = $list."<li>{$row['number']}:
            <a href=\"view.php?number={$row['number']}\">{$row['name']}</a></li>";            
        }
        echo $list;
    ?>
    </ul>

    <hr>
    <h2><p><a href="./write.php">입력 하기</a></p></h2>
    <hr>
    <h2>검색 하기</h2>
    <form action="./search.php" method="post">
        <h3>검색어 키워드 입력</h3>
        <p>
            <input type="text" id="search" name="skey" placeholder="검색할 항목">
        </p>
        <input type="submit" value="검색">
    </form>
    <hr>
    <h2>삭제 하기</h2>
    <form action="./delete.php" method="post">
        <h3>삭제할 번호 입력</h3>
        <p>
            <label for="msgdel">번호 : </label>
            <input type="text" id="msgdel" name="delnum">
        </p>
        <input type="submit" value="삭제">
    </form>   
    <p><a href='/index.html'>메인으로</a></p> 
</body>
</html>
