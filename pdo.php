<?php
//Establishing connection to the database
$pdo = new PDO('mysql:host=localhost; port=3306; dbname=daaproject', 'daa', 'project');

//setting the method to diaplay the errors
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
