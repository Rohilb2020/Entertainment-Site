<?php
require_once "pdo.php";
session_start();

if (!isset($_SESSION['otp'])) {
    die("ACCESS DENIED");
}
if (isset($_POST['cancel'])) {
    header('Location: forgot.php');
    return;
}


if (isset($_POST['otp1'])) {
    if (strlen($_POST['otp1']) < 1) {
        $_SESSION['error'] = "Please enter the OTP";
        header('Location: otp.php');
        return;
    } else if (!is_numeric($_POST['otp1'])) {
        $_SESSION['error'] = "OTP entered must be numerical value";
        header('Location: otp.php');
        return;
    }
    $OTP = $_POST['otp1'];
    if ($OTP == $_SESSION['otp']) {
        // $_SESSION['success'] = "OTP verified. Now you can reset your password.";
        unset($_SESSION["otp"]);
        header('Location: reset.php?user_id=' . $_SESSION['uid']);
        return;
    } else {
        // $_SESSION['count']++;
        // if($_SESSION['count']>3){
        //     $_SESSION['error'] = "OTP has expired"
        //     header('Location: forgot.php');
        //     return; 
        // }
        $_SESSION['error'] = "The OTP is incorrect";
        header('Location: otp.php');
        return;
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/otp.css">
    <title>OTP</title>
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
        <span class="heading">OTP verification</span>


        <?php
        if (isset($_SESSION['error'])) {
            echo ('<span id="otp_error">' . htmlentities($_SESSION['error']) . "</span>");
            unset($_SESSION['error']);
        }
        ?>
        <form method="post" id="otp_form">
            <span class="details"><i>Please check your email for OTP</span>
            <i class="fas fa-key" id="otp_icon"></i>
            <input type="text" name="otp1" id="OTP" placeholder="Enter otp" autocomplete="off">
            <button type="submit" id="verify_otp_btn">Verify OTP</button>
        </form>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/edd862cece.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
    <script src="js/navbar.js"></script>
</body>

</html>