<?php

session_start();

require_once "pdo.php";

if (isset($_POST['email'])) {
    if (strlen($_POST['email']) < 1) {
        $_SESSION['error'] = "Email Id required";
        header('Location: forgot.php');
        return;
    }
    if (strpos($_POST['email'], "@") === false) {
        $_SESSION['error'] = "Email address must contain @";
        header('Location: forgot.php');
        return;
    }
    $sql = "SELECT * FROM users where email=:email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(':email' => $_POST['email']));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row === FALSE) {
        $_SESSION['error'] = "Invalid Email";
        header('Location: forgot.php');
        return;
    }
    $uid = $row['user_id'];
    $email = $_POST['email'];

    //OTP generation
    $otp = rand(100000, 999999);
    $_SESSION['otp'] = $otp;

    // //emailing the password using the php mail() function
    $headers = "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $msg = '<html><body>';
    // $msg.= 'Click this link to reset the password ';
    // $msg.= '<a href="http://localhost/webdev/profile_pos/reset.php?user_id='.$uid.'">reset password</a>';
    $msg .= '<p>Dear User,<br>Your OTP is: <b>' . $_SESSION['otp'] . '</b></p>';
    $msg .= '</body></html>';
    if (mail("$email", "password recovery", $msg, $headers)) {
        $_SESSION['uid'] = $uid;
        // $_SESSION['success'] = "password mailed successfully ";
        header('Location: otp.php');
        return;
    } else {
        $_SESSION['error'] = "Failed to send the mail";
        header('Location: forgot.php');
        return;
    }
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/forgot.css">
    <title>Forgot password</title>
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
        <span class="heading">Reset your password</span>

        <?php
        if (isset($_SESSION['error'])) {
            echo ('<span id="otp_error">' . htmlentities($_SESSION['error']) . "</span>");
            unset($_SESSION['error']);
        }
        ?>
        <form method="post" id="forgot_form">
            <span class="details"><i>Please enter your Email Id</i></span>
            <i class="fas fa-envelope" id="email_icon"></i>
            <input type="text" name="email" id="mail" placeholder="Email" autocomplete="off">
            <button type="submit" id="otp_btn">Send OTP</button>

        </form>

    </div>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/edd862cece.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
    <script src="js/navbar.js"></script>
</body>

</html>