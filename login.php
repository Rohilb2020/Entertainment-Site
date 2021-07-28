<?php
session_start();
require_once "pdo.php";
unset($_SESSION["otp"]);
unset($_SESSION["uid"]);

function error_input()
{
    if (isset($_SESSION['error'])) {
        echo  'background-color: #ffcccc;
                border-bottom: 1px solid red;';
    } else {
        echo  'background-color: none;';
    }
}
function admin_error_input()
{
    if (isset($_SESSION['admin_error'])) {
        echo  'background-color: #ffcccc;
                border-bottom: 1px solid red;';
    } else {
        echo  'background-color: none;';
    }
}
$salt = "XyZzy12*_";

if (isset($_POST['email']) && isset($_POST['pass'])) {
    unset($_SESSION['email']);
    $check = hash('md5', $salt . $_POST['pass']);
    $stmt = $pdo->prepare("SELECT user_id,first_name FROM users WHERE email=:em AND password=:pw");
    $stmt->execute(array(
        ':em' => $_POST['email'],
        ':pw' => $check
    ));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row !== FALSE) {
        $_SESSION['email'] = $_POST['email'];
        $_SESSION['name'] = $row['first_name'];
        $_SESSION['user_id'] = $row['user_id'];
        header('Location:movie.php?user_id=' . $_SESSION["user_id"]);
        return;
    } else {
        $_SESSION['error'] = "Incorrect password or email";
        header('Location:login.php');
        return;
    }
} elseif (isset($_POST['ad_email']) && isset($_POST['ad_pass'])) {

    unset($_SESSION['ad_email']);
    $check = hash('md5', $_POST['ad_pass']);
    $stmt = $pdo->prepare("SELECT admin_id,first_name FROM admin WHERE email=:em AND password=:pw");
    $stmt->execute(array(
        ':em' => $_POST['ad_email'],
        ':pw' => $check
    ));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row !== FALSE) {
        $_SESSION['ad_email'] = $_POST['ad_email'];
        $_SESSION['ad_name'] = $row['first_name'];
        $_SESSION['admin_id'] = $row['admin_id'];
        header('Location:index.html');
        return;
    } else {
        $_SESSION['admin_error'] = "Incorrect admin password or email";
        header('Location:login.php');
        return;
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/login.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
    <title>Login</title>
</head>

<body>
    <nav class="navbar">
        <img src="images/film-reel.svg" alt="Logo" id="logo" class="reel" width="60" height="60" />
        <a href="index.html">Home</a>
        <a href="account.php">Account</a>
        <a href="login.php" class="active">Login</a>
        <button class="icon">
            <i class="fas fa-bars fa-2x"> </i>
        </button>
    </nav>


    <div class="form_container">
        <div class="button_container">
            <div id="color_button"></div>
            <button type="button" class="toggle_btn" id="user_btn">
                Login
            </button>
            <button type="button" class="toggle_btn" id="admin_btn">
                Admin
            </button>
        </div>
        <?php
        if (isset($_SESSION['error'])) {
            echo ('<span id= "user_error">' . htmlentities($_SESSION['error']) . "</span>");
            // unset($_SESSION['error']);

        } else if (isset($_SESSION['admin_error'])) {
            echo ('<span id= "admin_error">' . htmlentities($_SESSION['admin_error']) . "</span>");
        } else if (isset($_SESSION['success'])) {
            echo ('<span class="success" id="user_success">' . htmlentities($_SESSION['success']) . "</span>");
            unset($_SESSION['success']);
        }
        ?>
        <form autocomplete="off" method="post" class="user_login" id="user-login">
            <i class="fas fa-envelope" id="email_icon"></i>
            <input class="user_field" style="<?php error_input(); ?>" type="text" name="email" placeholder="email" id="username" />

            <i class="fas fa-key" id="pwd_icon"></i>
            <input class="user_field" style="<?php error_input();
                                                unset($_SESSION['error']) ?>" type="password" id="password-field" placeholder="password" name="pass" />
            <a href="forgot.php" id="forgot_pwd">Forgot password ? </a>
            <button type="submit" class="login_btn" id="user_submit">Log in</button>
        </form>

        <form autocomplete="off" method="post" class="user_login" id="admin_login">
            <i class="fas fa-envelope" id="email_icon"></i>
            <input class="user_field" style="<?php admin_error_input(); ?>" type="text" name="ad_email" placeholder="admin email" id="admin_username" />
            <i class="fas fa-key" id="pwd_icon"></i>
            <input class="user_field" style="<?php admin_error_input();
                                                unset($_SESSION['admin_error']) ?>" type="password" id="admin_password-field" placeholder="admin password" name="ad_pass" />
            <button type="submit" class="login_btn" id="admin_submit">Admin Login</button>
        </form>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>



    <script src="https://kit.fontawesome.com/edd862cece.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
    <script src="js/navbar.js"></script>
    <script src="js/login.js"></script>


</body>

</html>