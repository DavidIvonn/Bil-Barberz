<?php

// Require file
require_once('../../../common/php/Database.php');

// Set result
$result = null;

// Get arguments
$args = Util::getArgs();

// Connect to MySQL server
$db = new Database('barbershop');

$query = "INSERT INTO `felhasznalok` (`nev`,`telszam`,`email`,`jelszo`, `lakcim`) VALUES (:nev, :telszam, :email, :jelszo, :lakcim);";

$db->execute($query, $args);

if (!$db->is_error()) {
  
        $result = $db->get_data();

} else  Util::setError($db->get_error(), false);

// Disconect
$db = null;

// Set response
Util::setResponse($result);