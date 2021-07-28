<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    die("ACCESS DENIED");
}
require_once "pdo.php";



if (isset($_POST["mail_button"])) {
    $email = $_SESSION["email"];
    $sql = "SELECT * FROM movielist WHERE user_id = :uid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        ':uid' => $_SESSION["user_id"]
    ));
    $headers = "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $msg = '<html><body>';
    $msg .= '<h1>Your Watch List</h1>';
    $msg .= '<table rules="all" border="2" style="border-color: #666;" cellpadding="10">';
    $msg .= '<tr style="background: #eee;"><td style="font-size: 18px;"><strong>Poster</strong></td> <td style="font-size: 18px;"><strong>Title</strong></td></tr>';
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $msg .= '<tr><td><img width="200" height="300"src="' . $row["image_url"] . '"></td> <td style="font-size: 18px;">' . $row["movie_title"] . '</td><tr>';
    }
    $msg .= '</table></body></html>';
    if (mail("$email", "WATCH List", $msg, $headers)) {
        header('Location: movie.php');
        return;
    }
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" integrity="sha512-aOG0c6nPNzGk+5zjwyJaoRUgCdOrfSDhmMID2u4+OIslr0GjpLKo7Xm0Ao3xmpM4T8AmIouRkqwj1nrdVsLKEQ==" crossorigin="anonymous" />
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Poppins&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
    <!-- Add the slick-theme.css if you want default styling -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />
    <link rel="stylesheet" href="css/ajax.css">
    <title>Movies</title>
</head>


<body>

    <nav class="navbar">
        <img src="images/film-reel.svg" alt="Logo" id="logo" class="reel" width="60" height="60" />
        <!-- <a class="active" href="#">Home</a>
        <a href="account.php">Account</a> -->
        <span>Hello,&nbsp; <span style="color:#23aaf2;"><?= $_SESSION["name"] ?></span></span>
        <form method="post"><button title="Mail your watchlist" id="mail_btn" name="mail_button" type="submit"><i class="fas fa-envelope" id="mail_icon"></i></button></form>
        <a href="logout.php" id="logout_btn">Logout</a>
    </nav>

    <p id="tag_line">Find all your &nbsp;<b style="color:#23aaf2; font-size:34px">ENTERTAINMENT</b></p>
    <input type="text" name="show" id="movie" autocomplete="off" placeholder="Search">
    <div id="tabs">
        <ul>
            <li><a href="#movies_tab"><span>Movie</span></a></li>
            <li><a href="#tv_tab"><span>TV</span></a></li>
        </ul>

        <div id="movies_tab"></div>
        <div id="tv_tab"></div>
    </div>
    <div class="icon movies_info"></div>
    <div class="icon tv_info"></div>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30=" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/edd862cece.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.js" integrity="sha512-WNZwVebQjhSxEzwbettGuQgWxbpYdoLf7mH+25A7sfQbbxKeS5SQ9QBf97zOY4nOlwtksgDA/czSTmfj4DUEiQ==" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js" integrity="sha512-XtmMtDEcNz2j7ekrtHvOVR4iwwaD6o/FUJe6+Zq+HgcCsk3kj4uSQQR8weQ2QVj1o0Pk6PwYLohm206ZzNfubg==" crossorigin="anonymous"></script>
    <script type='text/javascript' src='config.js'></script>

    <script src="js/ajax.js"></script>
</body>
<script>
    $(document).ready(function() {

        $("#movies_tab").on("click", "img", function() {
            $.ajax({
                url: "http://localhost/webdev/DAA_Project/movie_form.php",
                type: "post",

                data: {
                    id: $(this).attr('id')
                },
                dataType: 'text',
                success: function(response) {
                    if (response == "True") {
                        var icon = $("button.add_list_icon i");
                        if (icon.hasClass("fa-plus-square")) {
                            icon.removeClass("fa-plus-square");
                            icon.addClass("fa-check-square");
                            icon.css("color", "#00e600");
                        }
                    }
                }
            });
        });
        $(".movies_info").on("click", "button.add_list_icon", function() {
            event.preventDefault();
            var icon = $("button.add_list_icon i");
            var form = $(".form_movie_info");
            if (icon.hasClass("fa-plus-square")) {
                icon.removeClass("fa-plus-square");
                icon.addClass("fa-check-square");
                icon.css("color", "#00e600");

                //ajax request for posting data
                $.ajax({
                    url: "http://localhost/webdev/DAA_Project/movie_form.php",
                    type: "post",
                    data: $(".form_movie_info input").serialize(),
                    success: function(data) {
                        console.log("POST REQUEST SUCCESSFUL");
                    }
                });
            } else {
                // console.log($("input[name ='mov_id']").val());
                icon.removeClass("fa-check-square");
                icon.addClass("fa-plus-square");
                icon.css("color", "#23aaf2");
                $.ajax({
                    url: "http://localhost/webdev/DAA_Project/movie_form.php",
                    type: "post",
                    data: {
                        movie_id: $("input[name= 'mov_id']").val()
                    },
                    success: function(data) {
                        console.log("Removed from watchlist");
                    }
                });
            }


        }).delay(250);

    });
</script>

</html>