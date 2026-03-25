<?php
// Récupération des variables (marche sur Vercel après config)
$host = getenv('DB_HOST');
$db = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$port = getenv('DB_PORT');

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$db";
    $conbd = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
}
catch (Exception $e) {
    // En prod, évite d'afficher $e->getMessage() qui peut contenir des infos sensibles
    die('Erreur de connexion à la base de données.');
}
?>