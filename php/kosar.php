<?php
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Generate a single rendelesid for the entire order
$rendelesid = generateRendelesId();

// Connect to database
$db = new Database();

// Set query
$query = "INSERT INTO `rendeles` (`rendelesid`, `termekid`, `dbszam`, `fizetesmod`, `felhaszid`, `vegosszeg`, `datum`) 
          VALUES (:rendelesid, :termekid, :dbszam, :fizetesmod, :felhaszid, :vegosszeg, :datum);";

// Loop over the array of products and insert them with the same rendelesid
foreach ($args['products'] as $product) {
  // Execute query with the same rendelesid for all items
  $result = $db->execute($query, array(
    'rendelesid' => $rendelesid,
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

// Function to generate a unique rendelesid
function generateRendelesId() {
  // Generate a unique ID using a timestamp and a random number
  $timestamp = time();
  $rand = rand(1000, 9999);
  $rendelesid = "{$timestamp}-{$rand}";
  return $rendelesid;
}
