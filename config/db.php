<?php
/**
 * Database Connection & Auto-Migration
 * Anas Abdiwahid Portfolio Backend
 */

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'anas_portfolio';
$db_port = 3306;

try {
    // 1. Initial connection attempt with database name
    $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    } catch (PDOException $e) {
        // If database doesn't exist (Error code 1049) or table not found, try creating it automatically
        if ($e->getCode() == 1049 || strpos($e->getMessage(), 'Unknown database') !== false) {
            $rootDsn = "mysql:host={$db_host};port={$db_port};charset=utf8mb4";
            $rootPdo = new PDO($rootDsn, $db_user, $db_pass, $options);
            $rootPdo->exec("CREATE DATABASE IF NOT EXISTS `{$db_name}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            
            // Reconnect now that DB exists
            $pdo = new PDO($dsn, $db_user, $db_pass, $options);
            
            // Run schema if database.sql exists
            $sqlFile = __DIR__ . '/../database/database.sql';
            if (file_exists($sqlFile)) {
                $sql = file_get_contents($sqlFile);
                $pdo->exec($sql);
            }
        } else {
            throw $e;
        }
    }

    // Check if tables exist, if not run SQL file
    $tables = $pdo->query("SHOW TABLES LIKE 'users'")->fetchAll();
    if (empty($tables)) {
        $sqlFile = __DIR__ . '/../database/database.sql';
        if (file_exists($sqlFile)) {
            $sql = file_get_contents($sqlFile);
            $pdo->exec($sql);
        }
    }

} catch (PDOException $e) {
    // If accessed via AJAX API, return JSON error
    if (!empty($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'error' => 'Database connection failed. Please ensure MySQL is running in your XAMPP Control Panel.'
        ]);
        exit;
    }
    
    // Otherwise show helpful notice
    $db_connection_error = $e->getMessage();
}
