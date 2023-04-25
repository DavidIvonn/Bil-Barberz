<?php
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Loop over the array of products
foreach ($args['products'] as $product) {
  // Set query
  $query = "INSERT INTO `rendeles` (`termekid`, `dbszam`, `fizetesmod`, `felhaszid`, `vegosszeg`, `datum`) 
            VALUES (:termekid, :dbszam, :fizetesmod, :felhaszid, :vegosszeg, :datum);";

  // Execute query
  $result = $db->execute($query, array(
    'termekid' => $product['termekid'],
    'dbszam' => $product['dbszam'],
    'fizetesmod' => $args['fizetesmod'],
    'felhaszid' => $args['felhaszid'],
    'vegosszeg' => $args['total'],
    'datum' => $args['datum']
  ));
}

// Disconnect
$db = null;

// Set response
Util::setResponse('Sikeres rendelés!');
