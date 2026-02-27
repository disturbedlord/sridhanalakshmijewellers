<?php

$conn = new mysqli("db", "myuser", "mypassword", "mydb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

