<?php
$url = $_ENV["DATABASE_URL"] ?? getenv("DATABASE_URL");
$db = parse_url($url);

$pdo = new PDO(
    "pgsql:host={$db['host']};port={$db['port']};dbname=" . ltrim($db["path"], "/"),
    $db["user"],
    $db["pass"],
    [PDO::ATTR_ERRMODE =>
PDO::ERRMODE_EXCEPTION] );
