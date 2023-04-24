<?php

// Inport environment
require_once('../../common/php/environment.php');

// Connect to database
$db = new Database();

// Set query
$query = "SELECT * FROM `termekek`";

// Execute query
$result = $db->execute($query);

// Disconnect
$db = null;

Util::setResponse($result);