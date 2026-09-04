<?php
/**
 * Delete Portfolio Project
 * Anas Abdiwahid Portfolio Backend
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/functions.php';

require_login();

$projectId = (int)($_GET['id'] ?? 0);
$token     = $_GET['csrf_token'] ?? '';

if (!verify_csrf($token) || $projectId <= 0) {
    set_flash('error', 'Invalid security token or project ID.');
    redirect('projects.php');
}

try {
    $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = :id");
    $stmt->execute([':id' => $projectId]);
    $project = $stmt->fetch();

    if ($project) {
        // Delete uploaded file if it resides in uploads/projects/
        if (!empty($project['image_url']) && strpos($project['image_url'], 'uploads/projects/') === 0) {
            $filePath = __DIR__ . '/../' . $project['image_url'];
            if (file_exists($filePath)) {
                @unlink($filePath);
            }
        }

        if (!empty($project['video_url']) && strpos($project['video_url'], 'uploads/projects/') === 0) {
            $filePath = __DIR__ . '/../' . $project['video_url'];
            if (file_exists($filePath)) {
                @unlink($filePath);
            }
        }

        // Delete from DB
        $deleteStmt = $pdo->prepare("DELETE FROM projects WHERE id = :id");
        $deleteStmt->execute([':id' => $projectId]);

        set_flash('success', 'Project deleted successfully.');
    } else {
        set_flash('error', 'Project not found.');
    }
} catch (PDOException $e) {
    set_flash('error', 'Database error: ' . $e->getMessage());
}

redirect('projects.php');
