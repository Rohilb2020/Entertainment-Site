<?php
session_start();
if (!isset($_SESSION['uid'])) {
    die("ACCESS DENIED");
}


require_once "pdo.php";
if (isset($_POST['pass']) && isset($_POST['cnfpass'])) {
    if (strlen($_POST['pass']) < 1 || strlen($_POST['cnfpass']) < 1) {
        $_SESSION['error'] = "All the fields are required";
        header('Location: reset.php?user_id=' . $_REQUEST['user_id']);
        return;
    }
    $pass = $_POST['pass'];
    $cnf  = $_POST['cnfpass'];
    if ($pass != $cnf) {
        $_SESSION['error'] = "Password fields do not match.Please retype your password";
        header('Location: reset.php?user_id=' . $_REQUEST['user_id']);
        return;
    }

    $salt = "XyZzy12*_"; //for password 
    //encryption of the password
    $password = hash('md5', $salt . $pass);

    //updating the database with the new password
    $sql = "UPDATE users SET password=:pass WHERE user_id=:uid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        ':pass'     => $password,
        ':uid'  => $_REQUEST['user_id']
    ));
    $_SESSION['success'] = "password successfully reset";
    header('Location: login.php');
    return;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/reset.css" />
    <title>Reset password</title>


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
        <span class="heading">Reset Password</span>

        <!-- flash messages -->
        <?php
        if (isset($_SESSION['error'])) {
            echo ('<span class="flash_message">' . htmlentities($_SESSION['error']) . "</span>");
            unset($_SESSION['error']);
        }
        ?>
        <form method="post" id="reset_form" autocomplete="off">
            <input type="password" name="pass" placeholder="password" id="password-field" class="pwd">
            <input type="password" name="cnfpass" placeholder="retype password" class="pwd">
            <button type="submit" id="reset_btn">Reset</button>
        </form>
    </div>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>



    <script src="https://kit.fontawesome.com/edd862cece.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>
    <script src="js/navbar.js"></script>
    <script src="js/reset.js"></script>

    <script>

    </script>
</body>

</html>