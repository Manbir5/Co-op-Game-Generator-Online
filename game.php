<!DOCTYPE html>
<head>
<link rel="stylesheet" href="design.css">
</head>
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
	
	#$conn = mysqli_connect($hostname,$username, $password) or die ("<script language='JavaScript'>alert('Error: Unable to connect to database.'),history.go(-1)</script>");
	#mysqli_select_db($conn,$dbname);
	
	# Check If Record Exists
	
	# $query = "SELECT * FROM $usertable";
  #$query = "SELECT gc.game_title FROM (SELECT * FROM Games INNER JOIN Games_Consoles ON Games.id = Games_Consoles.id INNER JOIN Consoles ON Consoles.cid = Games_Consoles.cid) as gc";
	
	#$result = mysqli_query($conn,$query);
	
	#if($result){
	#	while($row = mysqli_fetch_array($result)){
	#		$name = $row;
			#echo "Name: ".$name."<br/>";

  #  }
	#	}
	}
else{
	$invalid = "invalid";
} 

$number = rand(1,2);

if ($number == 1)
{
	$game = "Borderlands 2";
	$website = "https://en.wikipedia.org/wiki/Borderlands_2";
}
else{
	$game = "OverCooked 2";
	$website = "https://en.wikipedia.org/wiki/Overcooked_2";
}

?>

<p>The following co-op game has been selected. You can click resubmit at the bottom to get another choice.</p>
<h1><?php echo $game ?></h1>
<br/>
<?php
$myfile = fopen("images.txt", "w");
$url = "\n".$website;
fwrite($myfile,$url);
fclose($myfile);
sleep(1);
foreach(file("images.txt") as $line){
}
$line = $line.".png";

$image_transformer = fopen(".//images/image_transformer_pipe.txt", "w");
$measurements = 'IN | 200,300,"'.$line.'"';
fwrite($image_transformer,$measurements);
fclose($image_transformer);
sleep(1);
foreach(file("./images/image_transformer_pipe.txt") as $output){
}
$output = substr($output,7);
$output = substr($output,0,-1);

?>
<div>
<img class="center" src = <?php echo "images/".$output ?>>
</div>
<br />
<br />
<form action ="./game.php" method="get">
<div class ="submit">
<button type ="submit"> Re-Submit </button>
</div>
</form>
</body>
</html> 