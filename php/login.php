<?php
  function connectPDO() {
    $dbHandle = null;
    try {

      $config 	= parse_ini_file("../db/config.ini", true);
  
      $dbHandle = new PDO("mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8", 
                          $config['user'], $config['pass'],
        array(
          PDO::MYSQL_ATTR_INIT_COMMAND        => "SET NAMES utf8",
          PDO::MYSQL_ATTR_USE_BUFFERED_QUERY	=> false,
          PDO::ATTR_ERRMODE 						      => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_DEFAULT_FETCH_MODE        => PDO::FETCH_ASSOC,
          PDO::ATTR_ORACLE_NULLS				      => PDO::NULL_EMPTY_STRING,
          PDO::ATTR_EMULATE_PREPARES		      => false,
          PDO::ATTR_STRINGIFY_FETCHES         => false
        )
      );
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
    return $dbHandle;
  }
$args = file_get_contents("php://input", true);

$args = json_decode($args, true);

$query = "SELECT * FROM user WHERE email = :email AND password = :password;";

$dbHandle = connectPDO();

$stmt = $dbHandle->prepare($query);

$stmt->execute($args);

$result = $stmt->fetchAll();

$dbHandle = null;

$args = json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

echo $args;





?>