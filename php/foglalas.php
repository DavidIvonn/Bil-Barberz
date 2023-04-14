<?php
// Import environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Set arguments
$args['felhasznaloid'] = $result[0]['felhasznaloid'];
$args['telszam'] = $data['telszam'];
$args['idopont'] = $selectedDateTimeString;
$args['megjegyzes'] = $data['megjegyzes'];

// Connect to database
$db = new Database();

// Set query
$query = "INSERT INTO idopontok (felhasznaloid, telszam, idopont, megjegyzes) VALUES (:felhasznaloid, :telszam, :idopont, :megjegyzes);";

// Execute query
$result = $db->execute($query, $args);

// Disconnect
$db = null;

// Set response
Util::setResponse($result);
