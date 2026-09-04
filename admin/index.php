<?php
/**
 * Admin Dashboard Home
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'Dashboard Overview';
$pageSubtitle = 'Welcome to your portfolio management control center';

require_once __DIR__ . '/includes/admin_header.php';

// Fetch stats
$totalMessages = 0;
$unreadMessages = 0;
$totalProjects = 0;
$totalServices = 0;

try {
    $totalMessages = (int)$pdo->query("SELECT COUNT(*) FROM messages")->fetchColumn();
    $unreadMessages = (int)$pdo->query("SELECT COUNT(*) FROM messages WHERE is_read = 0")->fetchColumn();
    $totalProjects = (int)$pdo->query("SELECT COUNT(*) FROM projects")->fetchColumn();
    $totalServices = (int)$pdo->query("SELECT COUNT(*) FROM services")->fetchColumn();
} catch (Exception $e) {
    // defaults
}

// Fetch recent 5 messages
$recentMessages = [];
try {
    $stmt = $pdo->query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 5");
    $recentMessages = $stmt->fetchAll();
} catch (Exception $e) {
    $recentMessages = [];
}

// Fetch recent 4 projects
$recentProjects = [];
try {
    $stmt = $pdo->query("SELECT * FROM projects ORDER BY id DESC LIMIT 4");
    $recentProjects = $stmt->fetchAll();
} catch (Exception $e) {
    $recentProjects = [];
}
?>

<!-- Metric Stats Cards -->
<div class="stats-grid">
  <div class="stat-box">
    <div class="stat-box-info">
      <p>Total Messages</p>
      <h3><?php echo $totalMessages; ?></h3>
    </div>
    <div class="stat-box-icon blue">
      <i class="fas fa-inbox"></i>
    </div>
  </div>

  <div class="stat-box">
    <div class="stat-box-info">
      <p>Unread Messages</p>
      <h3><?php echo $unreadMessages; ?></h3>
    </div>
    <div class="stat-box-icon red">
      <i class="fas fa-envelope-open-text"></i>
    </div>
  </div>

  <div class="stat-box">
    <div class="stat-box-info">
      <p>Portfolio Projects</p>
      <h3><?php echo $totalProjects; ?></h3>
    </div>
    <div class="stat-box-icon green">
      <i class="fas fa-layer-group"></i>
    </div>
  </div>

  <div class="stat-box">
    <div class="stat-box-info">
      <p>Services Offered</p>
      <h3><?php echo $totalServices; ?></h3>
    </div>
    <div class="stat-box-icon purple">
      <i class="fas fa-briefcase"></i>
    </div>
  </div>
</div>

<!-- Quick Actions -->
<div class="admin-card">
  <div class="card-header">
    <h2><i class="fas fa-bolt"></i> Quick Actions</h2>
  </div>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <a href="project_add.php" class="btn btn-primary">
      <i class="fas fa-plus-circle"></i> Add New Project
    </a>
    <a href="messages.php" class="btn btn-secondary">
      <i class="fas fa-envelope"></i> Check Messages (<?php echo $unreadMessages; ?> Unread)
    </a>
    <a href="settings.php" class="btn btn-secondary">
      <i class="fas fa-sliders-h"></i> Site Settings & CV
    </a>
    <a href="services.php" class="btn btn-secondary">
      <i class="fas fa-tools"></i> Manage Skills & Services
    </a>
  </div>
</div>

<!-- Recent Messages -->
<div class="admin-card">
  <div class="card-header">
    <h2><i class="fas fa-envelope"></i> Recent Inquiries</h2>
    <a href="messages.php" class="btn btn-sm btn-secondary">View All Messages</a>
  </div>

  <div class="table-responsive">
    <table class="admin-table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Sender Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <?php if (empty($recentMessages)): ?>
          <tr>
            <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">
              <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
              No contact messages received yet.
            </td>
          </tr>
        <?php else: ?>
          <?php foreach ($recentMessages as $msg): ?>
            <tr class="<?php echo $msg['is_read'] ? '' : 'unread'; ?>">
              <td>
                <?php if ($msg['is_read']): ?>
                  <span class="badge badge-read"><i class="fas fa-check"></i> Read</span>
                <?php else: ?>
                  <span class="badge badge-unread"><i class="fas fa-circle" style="font-size: 0.5rem;"></i> New</span>
                <?php endif; ?>
              </td>
              <td><strong><?php echo e($msg['name']); ?></strong></td>
              <td><a href="mailto:<?php echo e($msg['email']); ?>"><?php echo e($msg['email']); ?></a></td>
              <td><?php echo e(mb_strimwidth($msg['subject'] ?? 'No Subject', 0, 30, '...')); ?></td>
              <td><span title="<?php echo e($msg['created_at']); ?>"><?php echo time_ago($msg['created_at']); ?></span></td>
              <td>
                <div class="btn-group">
                  <a href="message_view.php?id=<?php echo $msg['id']; ?>" class="btn btn-sm btn-primary">
                    <i class="fas fa-eye"></i> View
                  </a>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<!-- Recent Projects -->
<div class="admin-card">
  <div class="card-header">
    <h2><i class="fas fa-folder-open"></i> Portfolio Projects</h2>
    <a href="projects.php" class="btn btn-sm btn-secondary">Manage All Projects</a>
  </div>

  <div class="table-responsive">
    <table class="admin-table">
      <thead>
        <tr>
          <th>Media</th>
          <th>Title</th>
          <th>Category</th>
          <th>Featured</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if (empty($recentProjects)): ?>
          <tr>
            <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">
              No portfolio projects found. <a href="project_add.php">Add one now!</a>
            </td>
          </tr>
        <?php else: ?>
          <?php foreach ($recentProjects as $proj): ?>
            <tr>
              <td>
                <?php 
                  $imgPath = $proj['image_url'];
                  if ($imgPath && !file_exists(__DIR__ . '/../' . $imgPath) && file_exists(__DIR__ . '/../uploads/projects/' . $imgPath)) {
                      $imgPath = 'uploads/projects/' . $imgPath;
                  }
                ?>
                <?php if (!empty($proj['image_url'])): ?>
                  <img src="../<?php echo e($imgPath); ?>" alt="<?php echo e($proj['title']); ?>" class="table-img">
                <?php elseif (!empty($proj['video_url'])): ?>
                  <div class="table-img" style="background:#eef2ff; display:flex; align-items:center; justify-content:center; color:var(--primary)">
                    <i class="fas fa-video"></i>
                  </div>
                <?php else: ?>
                  <div class="table-img" style="background:#f1f5f9; display:flex; align-items:center; justify-content:center; color:#94a3b8">
                    <i class="fas fa-image"></i>
                  </div>
                <?php endif; ?>
              </td>
              <td><strong><?php echo e($proj['title']); ?></strong></td>
              <td><span class="badge badge-category"><?php echo ucfirst(e($proj['category'])); ?></span></td>
              <td>
                <?php if ($proj['is_featured']): ?>
                  <span class="badge badge-featured"><i class="fas fa-star"></i> Featured</span>
                <?php else: ?>
                  <span style="color: var(--text-muted); font-size: 0.85rem;">Standard</span>
                <?php endif; ?>
              </td>
              <td>
                <div class="btn-group">
                  <a href="project_edit.php?id=<?php echo $proj['id']; ?>" class="btn btn-sm btn-secondary">
                    <i class="fas fa-edit"></i> Edit
                  </a>
                  <a href="project_delete.php?id=<?php echo $proj['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-sm btn-danger" data-confirm="Are you sure you want to delete this project?">
                    <i class="fas fa-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<?php require_once __DIR__ . '/includes/admin_footer.php'; ?>
