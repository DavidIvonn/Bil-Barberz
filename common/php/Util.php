<?php

/**
 * Utilityes
 * 
 * Check is array associative
 */

class Util {

  // Set result
  public static $result = array(
    "data"  => null,
    "error" => null
  );

  // Get arguments
  public static function getArgs($isRequired=true) {

    // Check parameters
    if (!is_bool($isRequired)) $isRequired = true;

    // Get arguments
    $args = isset( $_GET['data']) ?  $_GET['data']  :
           (isset($_POST['data']) ? $_POST['data']  : 
            file_get_contents("php://input", true));

    // Check arguments exist
    if ($args) {

      // Decode arguments
      $args = json_decode($args, true, 512, 0);

      // Check is error
      if (json_last_error() !== JSON_ERROR_NONE)
        self::setError("Unable to decode parameters!");

    // Check is required
    } elseif($isRequired)
      self::setError("Missing parameters!");

    // Return arguments
    return $args;
  }

  // Check is error
  public static function isError() {
    return !is_null(self::$result["error"]);
  }

  // Set error
  public static function setError($msg=null, $isEnd=true) {
    if (!is_string($msg)) $msg = "Unknow error!";
    if (!is_bool($isEnd)) $isEnd = true;
    self::$result["error"] = trim($msg);
    if ($isEnd) self::setResponse();
  }

  // Set response
  public static function setResponse($data=null) {
    self::$result["data"] = $data;
    $result = json_encode(self::$result, 
                JSON_UNESCAPED_UNICODE|
                JSON_UNESCAPED_SLASHES
              );
    echo $result;
    exit(self::isError() ? 1 : 0);
  }

  // Check is array associative
  public static function isAssocArray($arr) {
    return  is_array($arr) &&
            !empty($arr) && 
            array_keys($arr) !== range(0, count($arr) - 1);
  }

  // Merge two object/arrays
  public static function objMerge($target=null, $source=null, $existKeys=false) {

    // Check parameters
    if (!is_array($target))   $target     = array();
    if (!is_array($source))   $source     = array();
    if (!is_bool($existKeys)) $existKeys  = false;

    // Each source keys
    foreach($source as $key => $value) {

      // Check key exist in target
      if (array_key_exists($key, $target)) {

        // Check type is equal
        if (gettype($target[$key]) === gettype($value)) {
          
          // Check type is array
          if (is_array($value)) {

            // Merge two object/arrays recursive
            $target[$key] = self::objMerge($target[$key], $value, $existKeys);

          } else                          $target[$key] = $value;
        } elseif (is_null($target[$key])) $target[$key] = $value;
      } elseif (!$existKeys)              $target[$key] = $value;
    }

    // Return result
    return $target;
  }
}