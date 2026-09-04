<?php
/**
 * Core Helper Functions
 * Anas Abdiwahid Portfolio Backend
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Escape HTML output to prevent XSS attacks
 */
function e($string) {
    return htmlspecialchars((string)$string, ENT_QUOTES, 'UTF-8');
}

/**
 * Sanitize input data
 */
function sanitize($data) {
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return trim(strip_tags((string)$data));
}

/**
 * Generate or get CSRF token
 */
function csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verify_csrf($token) {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Check if admin is currently logged in
 */
function is_logged_in() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true && !empty($_SESSION['admin_id']);
}

/**
 * Protect admin routes - redirect if not logged in
 */
function require_login() {
    if (!is_logged_in()) {
        set_flash('error', 'Please login to access the dashboard.');
        redirect('login.php');
    }
}

/**
 * Get current logged in user details
 */
function current_user() {
    if (!is_logged_in()) {
        return null;
    }
    return [
        'id' => $_SESSION['admin_id'] ?? null,
        'username' => $_SESSION['admin_username'] ?? '',
        'full_name' => $_SESSION['admin_name'] ?? 'Admin',
        'email' => $_SESSION['admin_email'] ?? '',
        'role' => $_SESSION['admin_role'] ?? 'admin'
    ];
}

/**
 * Set flash message
 */
function set_flash($type, $message) {
    $_SESSION['flash'] = [
        'type' => $type, // 'success', 'error', 'warning', 'info'
        'message' => $message
    ];
}

/**
 * Get and clear flash message
 */
function get_flash() {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

/**
 * Redirect to URL
 */
function redirect($url) {
    header("Location: $url");
    exit;
}

/**
 * Fetch all site settings into an associative key => value array
 */
function get_all_settings($pdo) {
    static $settings = null;
    if ($settings !== null) {
        return $settings;
    }
    
    $settings = [];
    try {
        $stmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
        while ($row = $stmt->fetch()) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
    } catch (Exception $e) {
        // Return empty or defaults if table not ready
    }
    return $settings;
}

/**
 * Get a specific site setting with fallback
 */
function get_setting($pdo, $key, $default = '') {
    $settings = get_all_settings($pdo);
    return $settings[$key] ?? $default;
}

/**
 * Secure file upload helper
 */
function upload_file($file, $targetDir, $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'], $maxSize = 20971520) {
    if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'error' => 'No file uploaded or upload error occurred.'];
    }

    if ($file['size'] > $maxSize) {
        $maxMb = round($maxSize / 1048576, 1);
        return ['success' => false, 'error' => "File size exceeds limit of {$maxMb}MB."];
    }

    $filename = basename($file['name']);
    $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

    if (!in_array($extension, $allowedExtensions)) {
        return ['success' => false, 'error' => 'File extension .' . $extension . ' is not permitted.'];
    }

    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    // Generate clean safe filename
    $cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($filename, PATHINFO_FILENAME));
    $newFilename = time() . '_' . uniqid() . '_' . substr($cleanName, 0, 30) . '.' . $extension;
    $targetPath = rtrim($targetDir, '/\\') . DIRECTORY_SEPARATOR . $newFilename;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return ['success' => true, 'filename' => $newFilename, 'path' => $targetPath];
    }

    return ['success' => false, 'error' => 'Failed to save uploaded file to destination directory.'];
}

/**
 * Human readable time ago helper
 */
function time_ago($datetime) {
    $timestamp = strtotime($datetime);
    $difference = time() - $timestamp;

    if ($difference < 60) {
        return 'Just now';
    } elseif ($difference < 3600) {
        $mins = round($difference / 60);
        return $mins . ' min' . ($mins > 1 ? 's' : '') . ' ago';
    } elseif ($difference < 86400) {
        $hours = round($difference / 3600);
        return $hours . ' hr' . ($hours > 1 ? 's' : '') . ' ago';
    } elseif ($difference < 604800) {
        $days = round($difference / 86400);
        return $days . ' day' . ($days > 1 ? 's' : '') . ' ago';
    } else {
        return date('M j, Y', $timestamp);
    }
}
