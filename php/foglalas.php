<?php
session_start();
require('kapcs.php');

$conn = dbkapcs();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Ellenőrizni, hogy a felhasználó be van-e jelentkezve
  if (!isset($_SESSION['username'])) {
    echo "Hiba: A foglaláshoz be kell jelentkezni!";
  }
  // Ellenőrizni, hogy az időpont üres-e
  else if (empty($_POST['idopont'])) {
    echo "Hiba: Az időpont nem lehet üres!";
  } else {
    $idopont = mysqli_real_escape_string($conn, $_POST['idopont']);

    // Előkészíti az SQL lekérdezést
    $check_query = mysqli_prepare($conn, "SELECT * FROM idopontfoglalas WHERE idopont = ?");
    mysqli_stmt_bind_param($check_query, 's', $idopont);
    mysqli_stmt_execute($check_query);
    $result = mysqli_stmt_get_result($check_query);
    if (mysqli_num_rows($result) > 0) {
      echo "Az időpont már foglalt!";
    } else {
      // Az időpont mentése az adatbázisban
      $insert_query = mysqli_prepare($conn, "INSERT INTO idopontfoglalas (idopont) VALUES (?)");
      mysqli_stmt_bind_param($insert_query, 's', $idopont);
      if (mysqli_stmt_execute($insert_query)) {
        echo "Az időpont foglalva!";
      } else {
        echo "Hiba: Az időpont mentése sikertelen!";
      }
    }
  }
}

// Bezárni az adatbáziskapcsolatot
mysqli_close($conn);
?>