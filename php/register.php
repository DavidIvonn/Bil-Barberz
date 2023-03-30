<?php

// Inport environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Set query
$query = "SELECT `felhaszid` FROM `felhasznalok` WHERE `email` = :email;";

// Execute query
$result = $db->execute($query, array('email' => $args['email']));

// Check user exist
if (!is_null($result)) {

  // Disconnect
  $db = null;

  Util::setError('A felhasználó már létezik!');
}

// Set query
$query = "INSERT INTO `felhasznalok` (`nev`,`telszam`,`email`,`jelszo`, `lakcim`) 
          VALUES (:nev, :telszam, :email, :jelszo, :lakcim);";

// Execute query
$result = $db->execute($query, $args);

// Disconnect
$db = null;

// Set response
Util::setResponse($result);