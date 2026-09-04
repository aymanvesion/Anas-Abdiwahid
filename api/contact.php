<?php
/**
 * Contact Form API Handler
 * Anas Abdiwahid Portfolio Backend
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../includes/mailer.php';

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed'
    ]);
    exit;
}

// Support both form-urlencoded/multipart and raw JSON requests
$inputData = $_POST;
if (empty($inputData)) {
    $raw = file_get_contents('php://input');
    if (!empty($raw)) {
        $json = json_decode($raw, true);
        if (is_array($json)) {
            $inputData = $json;
        }
    }
}

// Extract and sanitize inputs
$name    = isset($inputData['name']) ? sanitize($inputData['name']) : '';
$email   = isset($inputData['email']) ? trim($inputData['email']) : '';
$phone   = isset($inputData['phone']) ? sanitize($inputData['phone']) : '';
$subject = isset($inputData['subject']) ? sanitize($inputData['subject']) : 'Portfolio Inquiry';
$message = isset($inputData['message']) ? sanitize($inputData['message']) : '';

// Validation
$errors = [];

if (empty($name) || mb_strlen($name) < 2) {
    $errors[] = 'Please enter your full name (at least 2 characters).';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if (empty($phone) || mb_strlen($phone) < 6) {
    $errors[] = 'Please enter a valid phone number.';
}

if (empty($message) || mb_strlen($message) < 5) {
    $errors[] = 'Please enter your message (at least 5 characters).';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors)
    ]);
    exit;
}

// Client IP
$ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
}

// 1. Save to Database (if available)
$dbSaved = false;
if (isset($pdo)) {
    try {
        $savedMessage = (!empty($phone) ? "[Phone: {$phone}]\n\n" : "") . $message;
        $stmt = $pdo->prepare("
            INSERT INTO `messages` (`name`, `email`, `subject`, `message`, `ip_address`, `is_read`, `created_at`)
            VALUES (:name, :email, :subject, :message, :ip, 0, NOW())
        ");

        $stmt->execute([
            ':name'    => $name,
            ':email'   => $email,
            ':subject' => $subject,
            ':message' => $savedMessage,
            ':ip'      => $ip
        ]);
        $dbSaved = true;
    } catch (Exception $e) {
        error_log("Database message save error: " . $e->getMessage());
    }
}

// 2. Dispatch Email via Gmail SMTP
$mailResult = send_contact_notification([
    'name'    => $name,
    'email'   => $email,
    'phone'   => $phone,
    'subject' => $subject,
    'message' => $message,
    'ip'      => $ip
]);

if ($mailResult['success'] || $dbSaved) {
    echo json_encode([
        'success'      => true,
        'message'      => 'Message sent successfully! Thank you for reaching out.',
        'email_status' => $mailResult['success'] ? 'sent' : 'fallback_queued'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send message at this moment. Error: ' . ($mailResult['error'] ?? 'Unknown error')
    ]);
}
