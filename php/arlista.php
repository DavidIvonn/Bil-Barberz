<?php

session_start();
require('kapcs.php');
$conn = dbkapcs();


$sql = "SELECT * FROM stilus";
$result = mysqli_query($conn, $sql);

// Tároljuk az eredményt egy tömbben
$cards = array();
while($row = mysqli_fetch_assoc($result)) {
  $cards[] = $row;
}

// Bezárjuk az adatbázis kapcsolatot
mysqli_close($conn);

// Visszatérünk az eredményekkel
echo json_encode($cards);


?>