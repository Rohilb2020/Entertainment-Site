<?php
session_start();
require_once "pdo.php";
unset($_SESSION["otp"]);
unset($_SESSION["uid"]);


if (isset($_POST['cancel'])) {
    header("Location: index.html");
    return;
}

$salt = "XyZzy12*_"; //for password 
if (isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['email']) && isset($_POST['pass']) && isset($_POST['cnf_pass'])) {

    if (strlen($_POST['first_name']) < 1 || strlen($_POST['last_name']) < 1 || strlen($_POST['email']) < 1 || strlen($_POST['pass']) < 1 || strlen($_POST['cnf_pass']) < 1) {
        $_SESSION['error'] = "All fields are required";
        header("Location: account.php");
        return;
    }
    if (strpos($_POST['email'], "@") === false) {
        $_SESSION['error'] = "Email address must contain @";
        header('Location: account.php');
        return;
    }
    $sql = "SELECT * FROM users where email=:email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(':email' => $_POST['email']));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row != FALSE) {
        $_SESSION['error'] = "Email already exists,try different one";
        header('Location: account.php');
        return;
    }
    $pass = $_POST['pass'];
    $cnf = $_POST['cnf_pass'];
    if ($pass != $cnf) {
        $_SESSION['error'] = "Password fields do not match. Please retype your password";
        header('Location: account.php');
        return;
    }

    //creating the hashed password
    $password = hash('md5', $salt . $pass);

    //adding the records to the database

    $sql = "INSERT INTO users(first_name,last_name,email,password)
                 VALUES(:name,:lname,:em,:pw)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        ':name' => $_POST['first_name'],
        ':lname' => $_POST['last_name'],
        ':em'   => $_POST['email'],
        ':pw'   => $password
    ));

    //success message
    $_SESSION['success'] = "Account created successfully";
    header('Location: account.php');
    return;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/account.css">
    <link href="https://fonts.googleapis.com/css2?family=Piedra&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
    <title>Register</title>
</head>

<body>

    <nav class="navbar">
        <img src="images/film-reel.svg" alt="Logo" id="logo" class="reel" width="60" height="60" />
        <a href="index.html">Home</a>
        <a href="account.php" class="active">Account</a>
        <a href="login.php">Login</a>
        <button class="icon">
            <i class="fas fa-bars fa-2x"> </i>
        </button>
    </nav>


    <div class="form_container">
        <span class="heading">Create an account</span>
        <?php
        if (isset($_SESSION['error'])) {
            echo ('<span class="alert">' . htmlentities($_SESSION['error']) . "</span>");
            unset($_SESSION['error']);
        }

        if (isset($_SESSION['success'])) {
            echo ('<span class="alert success">' . htmlentities($_SESSION['success']) . "</span>");
            unset($_SESSION['success']);
        }
        ?>
        <form method="POST" id="create_form">

            <input type="text" name="first_name" id="fname" placeholder="first name" autocomplete="new-password">

            <input type="text" name="last_name" id="lname" placeholder="last name" autocomplete="new-password">

            <input type="text" name="email" id="user" placeholder="email">

            <input type="password" name="pass" id="password-field" placeholder="password">

            <input type="password" name="cnf_pass" id="cnf_password-field" placeholder="confirm password">

            <button type="submit" class="create_btn">Create Account</button>
        </form>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/edd862cece.js" crossorigin="anonymous"></script>
    <script src="js/account.js"></script>
    <script src="js/navbar.js"></script>
</body>

</html>