<?php
/**
 * Admin Header & Navigation
 * Anas Abdiwahid Portfolio Backend
 */

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../includes/functions.php';

require_login();

$currentUser = current_user();
$currentPage = basename($_SERVER['PHP_SELF']);

// Count unread messages
$unreadCount = 0;
if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT COUNT(*) FROM messages WHERE is_read = 0");
        $unreadCount = (int)$stmt->fetchColumn();
    } catch (Exception $e) {
        $unreadCount = 0;
    }
}

$flash = get_flash();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? e($pageTitle) . ' - ' : ''; ?>Admin Dashboard</title>
  <link rel="icon" type="image/png" href="../Sawir Logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body>

  <!-- Admin Sidebar -->
  <aside class="admin-sidebar" id="adminSidebar">
    <div class="sidebar-header">
      <img src="../Sawir Logo.png" alt="Anas Logo" class="sidebar-logo">
      <div class="sidebar-brand">
        <h2>Anas Portfolio</h2>
        <span>Control Panel</span>
      </div>
    </div>

    <ul class="sidebar-menu">
      <li class="sidebar-heading">Main Navigation</li>
      <li>
        <a href="index.php" class="sidebar-link <?php echo $currentPage === 'index.php' ? 'active' : ''; ?>">
          <i class="fas fa-th-large"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <li>
        <a href="messages.php" class="sidebar-link <?php echo in_array($currentPage, ['messages.php', 'message_view.php']) ? 'active' : ''; ?>">
          <i class="fas fa-envelope"></i>
          <span>Messages</span>
          <?php if ($unreadCount > 0): ?>
            <span class="badge-counter"><?php echo $unreadCount; ?></span>
          <?php endif; ?>
        </a>
      </li>

      <li class="sidebar-heading">Content Management</li>
      <li>
        <a href="projects.php" class="sidebar-link <?php echo in_array($currentPage, ['projects.php', 'project_add.php', 'project_edit.php']) ? 'active' : ''; ?>">
          <i class="fas fa-folder-open"></i>
          <span>Portfolio Projects</span>
        </a>
      </li>
      <li>
        <a href="services.php" class="sidebar-link <?php echo $currentPage === 'services.php' ? 'active' : ''; ?>">
          <i class="fas fa-layer-group"></i>
          <span>Services & Skills</span>
        </a>
      </li>

      <li class="sidebar-heading">Administration</li>
      <li>
        <a href="settings.php" class="sidebar-link <?php echo $currentPage === 'settings.php' ? 'active' : ''; ?>">
          <i class="fas fa-sliders-h"></i>
          <span>Site Settings & CV</span>
        </a>
      </li>
      <li>
        <a href="profile.php" class="sidebar-link <?php echo $currentPage === 'profile.php' ? 'active' : ''; ?>">
          <i class="fas fa-user-shield"></i>
          <span>My Profile & Password</span>
        </a>
      </li>
      <li>
        <a href="logout.php" class="sidebar-link" data-confirm="Are you sure you want to logout?">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>

    <div class="sidebar-footer">
      <div class="user-mini">
        <div class="user-avatar"><?php echo strtoupper(substr($currentUser['full_name'], 0, 1)); ?></div>
        <div class="user-info-text">
          <div class="name"><?php echo e($currentUser['full_name']); ?></div>
          <div class="role"><?php echo ucfirst(e($currentUser['role'])); ?></div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main Content Wrapper -->
  <div class="admin-main">
    <!-- Topbar -->
    <header class="admin-topbar">
      <div class="topbar-left">
        <button class="menu-toggle-btn" id="menuToggle" aria-label="Toggle Navigation">
          <i class="fas fa-bars"></i>
        </button>
        <div class="page-title-wrap">
          <h1><?php echo isset($pageTitle) ? e($pageTitle) : 'Dashboard'; ?></h1>
          <p><?php echo isset($pageSubtitle) ? e($pageSubtitle) : 'Welcome to Anas Portfolio Administration'; ?></p>
        </div>
      </div>

      <div class="topbar-right">
        <button class="theme-toggle-btn" id="themeToggle" title="Toggle Dark/Light Mode">
          <i class="fas fa-moon"></i>
        </button>
        <a href="../index.php" target="_blank" class="btn-view-site">
          <i class="fas fa-external-link-alt"></i>
          <span>View Website</span>
        </a>
      </div>
    </header>

    <!-- Main Body Container -->
    <main class="admin-body">
      <?php if ($flash): ?>
        <div class="alert alert-<?php echo e($flash['type']); ?>">
          <i class="fas fa-<?php echo $flash['type'] === 'success' ? 'check-circle' : ($flash['type'] === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'); ?>"></i>
          <span><?php echo e($flash['message']); ?></span>
        </div>
      <?php endif; ?>
