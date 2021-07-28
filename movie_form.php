<?php
session_start();
require_once "pdo.php";
if (isset($_POST["id"])) {
    $stmt = $pdo->prepare("SELECT * FROM movielist WHERE user_id = :uid and movie_id = :mid");
    $stmt->execute(array(
        ':uid' => $_SESSION["user_id"],
        ':mid' => $_POST["id"]
    ));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row === FALSE) {
        echo 'False';
        return;
    }
    echo 'True';
    return;
}


if (isset($_POST['movie_url']) && isset($_POST['movie_title'])) {
    $sql = "INSERT INTO movielist(movie_id,user_id,image_url,movie_title) VALUES(:mid,:uid,:url,:title)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        ':mid'   => $_POST["mov_id"],
        ':uid'   => $_SESSION["user_id"],
        ':url'   => $_POST["movie_url"],
        ':title' => $_POST["movie_title"]
    ));
    header('Location: movie.php');
}

if (isset($_POST["movie_id"])) {
    $sql = "DELETE FROM movielist WHERE user_id = :uid and movie_id = :mid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        ':uid' => $_SESSION["user_id"],
        ':mid' => $_POST["movie_id"]
    ));
    header('Location: movie.php');
}
