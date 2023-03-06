<?php

// Require file
require_once('../../../common/php/Database.php');

//$_GET['data'] = '{"email":"odry.attila@keri.mako.hu","password":"1234Aa"}';

//Regisztrációs oldal feldolgozása
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];
  $email = $_POST['email'];

  // Jelszó hash-elése
  $password_hash = password_hash($password, PASSWORD_DEFAULT);

  // Felhasználó hozzáadása az adatbázishoz
  $stmt = $pdo->prepare("INSERT INTO users (username, password, email, permission_level) VALUES (?, ?, ?, ?)");
  $stmt->execute([$username, $password_hash, $email, 1]); // permission_level alapértelmezetten 1

  // Sikeres regisztráció
  header('Location: login.php');
  exit();
}
//Bejelentkezési oldal feldolgozása
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Felhasználó keresése az adatbázisban
  $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
  $stmt->execute([$username]);
  $user = $stmt->fetch();

  // Jelszó ellenőrzése
  if ($user && password_verify($password, $user['password'])) {
    // Sikeres bejelentkezés
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['permission_level'] = $user['permission_level'];
    header('Location: index.php');
    exit();
  } else {
    // Sikertelen bejelentkezés
    $error = 'Hibás felhasználónév vagy jelszó.';
  }
}
session_start();
if (!isset($_SESSION['user_id'])) {
  header('Location: login.php');
  exit();
}
