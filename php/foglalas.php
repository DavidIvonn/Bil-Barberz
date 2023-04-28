<?php
// Import environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Set arguments
$args['felhasznaloid'] = $args['felhasznaloid'];
$args['telszam'] = $args['telszam'];
$args['idopont'] = $args['idopont'];
$args['megjegyzes'] = $args['megjegyzes'];

// Connect to database
$db = new Database();

// Set query
$query = "INSERT INTO idopontfoglalas (felhasznaloid, telszam, idopont, megjegyzes) VALUES (:felhasznaloid, :telszam, :idopont, :megjegyzes);";

// Execute query
$result = $db->execute($query, $args);

// Disconnect
$db = null;



// Set response
Util::setResponse($result);
