<?php

session_start();
require('kapcs.php');
$conn = dbkapcs();


// Lekérdezés az adatbázisból
$result = mysqli_query($conn, 'SELECT megnev,kep,leiras,ar FROM stilus');

// Az eredmény tömbbe rendezése
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// A tömb átalakítása JSON formátumra
$json = json_encode($data);

// A JSON adatok küldése a kliensnek
echo $json;


?>
