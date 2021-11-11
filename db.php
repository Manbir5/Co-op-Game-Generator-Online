<?php
$servername = "localhost";
$username = "manzaib";
$password = "IWillMakeAScript436";
$myDB = "games";


try {
  $conn = new PDO("mysql:host=$servername;dbname=$myDB", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected";
} catch(PDOException $e) {
  echo "Failed: " . $e->getMessage();
}
?>