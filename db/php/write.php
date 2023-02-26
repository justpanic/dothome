<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>입력 하기</title>
</head>
<body>
    <h1>입력 하기</h1>
    <form action="./insert.php" method="post">
        <input type="hidden" name="number" value="-1">
        <p>
            <label for="name">작성자 : </label>
            <input type="text" id="name" name="name">
        </p>
        <p>            
            <textarea placeholder="메시지 입력.." name="message" id="message" cols="30" rows="10"></textarea>
        </p>
        <input type="submit" value="저장">
    </form>
</body>
</html>


