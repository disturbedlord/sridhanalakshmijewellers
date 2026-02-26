<?php
$url = $_ENV["DATABASE_URL"] ?? getenv("DATABASE_URL");
$db = parse_url($url);
$port = $db['port'] ?? 5432;
$pdo = new PDO(
    "pgsql:host={$db['host']};port={$port};dbname=" . ltrim($db["path"], "/"),
    $db["user"],
    $db["pass"],
    [PDO::ATTR_ERRMODE =>
PDO::ERRMODE_EXCEPTION] );
