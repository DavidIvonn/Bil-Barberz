<?php

// Require file
require_once('../../../common/php/Database.php');


//$_POST['data'] = '{"nev":"Dávid Ivonn","telszam":"06302296876","email":"asd@gmail.com","jelszo":"valami","lakcim":"Kiszombor"}';

// Set result
$result = null;

// Get arguments
$args = Util::getArgs();

// Connect to MySQL server
$db = new Database('barbershop');

// Check if email already exists
$query = "SELECT COUNT(*) FROM `felhasznalok` WHERE `email` = :email;";
$db->execute($query, array('email' => $args['email']));
$result = $db->get_data();




if ($db->get_data()[0]['COUNT(*)'] > 0) {
  Util::setError("Ezzel az email címmel már regisztráltak!", false);
} else {
  // Insert new user record
  $query = "INSERT INTO `felhasznalok` (`nev`,`telszam`,`email`,`jelszo`, `lakcim`) VALUES (:nev, :telszam, :email, :jelszo, :lakcim);";
  $db->execute($query, $args);
  if (!$db->is_error()) {
    $result = $db->get_data();
  } else {
    Util::setError("Hiba történt a regisztráció során: " . $db->get_error(), false);
  }
}

// Disconnect
$db = null;

// Set response
Util::setResponse($result);
