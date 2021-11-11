<!DOCTYPE html>
<body>

<?php

if (isset($_GET["console"]) and isset($_GET["type"]) and isset($_GET["type"])){
	
  $selected_console = $_GET["console"];
  $selected_type = $_GET["type"];
  $selected_genre = $_GET["genre"];

  $array_length = count($selected_console);
  $array_length = count($selected_type);

	$hostname="localhost";
	$username="manzaib";
	$password="IWillMakeAScript436";
	$dbname="games_for_game_hoard";
	$yourfield = "genre";
	
	$conn = mysqli_connect($hostname,$username, $password) or die ("<script language='JavaScript'>alert('Error: Unable to connect to database.'),history.go(-1)</script>");
	mysqli_select_db($conn,$dbname);
	
	# Check If Record Exists
	
	# $query = "SELECT * FROM $usertable";
  $query = "SELECT gc.game_title FROM (SELECT * FROM Games INNER JOIN Games_Consoles ON Games.id = Games_Consoles.id INNER JOIN Consoles ON Consoles.cid = Games_Consoles.cid) as gc";
	
	$result = mysqli_query($conn,$query);

  printf("Select returned %d rows.\n", $result->num_rows);
	
	if($result){
		while($row = mysqli_fetch_array($result)){
			$name = $row;
			echo "Name: ".$name."<br/>";

    }
		}
	}
else{
  echo "Please Select At Least One Of Each Criteria";
} 
?>

</body>
</html> 