<div ng-include src="'./html/navigate.html'"></div>
<div class="main">
    <?php 
    
$sql = "SELECT  FROM stilus";
$result = mysqli_query($conn, $sql);

// Kilistázás eredményének ellenőrzése
if (mysqli_num_rows($result) > 0) {
  // Kilistázás eredményének feldolgozása
  while($row = mysqli_fetch_assoc($result)) {
    echo "Név" . $row[""]. " - Név: " . $row["nev"]. " - E-mail: " . $row["email"]. "<br>";
  }
} else {
  echo "Nincs eredmény.";
}

// Adatbázis kapcsolat lezárása
mysqli_close($conn);
?>
    ?>
</div>
<div ng-include src="'./html/footer.html'"></div>
