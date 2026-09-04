<?php
/**
 * Manage Portfolio Projects
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'Portfolio Projects';
$pageSubtitle = 'Manage showcase items displayed on your portfolio website';

require_once __DIR__ . '/includes/admin_header.php';

$projects = [];
try {
    $stmt = $pdo->query("SELECT * FROM projects ORDER BY sort_order ASC, id DESC");
    $projects = $stmt->fetchAll();
} catch (Exception $e) {
    $projects = [];
}
?>

<div class="admin-card">
  <div class="card-header">
    <h2><i class="fas fa-folder-open"></i> All Projects (<?php echo count($projects); ?>)</h2>
    <a href="project_add.php" class="btn btn-primary">
      <i class="fas fa-plus"></i> Add New Project
    </a>
  </div>

  <div class="table-responsive">
    <table class="admin-table">
      <thead>
        <tr>
          <th>Media</th>
          <th>Title</th>
          <th>Category</th>
          <th>Order</th>
          <th>Featured</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if (empty($projects)): ?>
          <tr>
            <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px;">
              <i class="fas fa-folder-plus" style="font-size: 2.5rem; margin-bottom: 12px; display: block; opacity: 0.4;"></i>
              No projects added yet. Click <strong>Add New Project</strong> to create your first portfolio item!
            </td>
          </tr>
        <?php else: ?>
          <?php foreach ($projects as $proj): ?>
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
              <td>
                <strong><?php echo e($proj['title']); ?></strong>
                <?php if (!empty($proj['description'])): ?>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
                    <?php echo e(mb_strimwidth($proj['description'], 0, 50, '...')); ?>
                  </div>
                <?php endif; ?>
              </td>
              <td><span class="badge badge-category"><?php echo ucfirst(e($proj['category'])); ?></span></td>
              <td><?php echo (int)$proj['sort_order']; ?></td>
              <td>
                <?php if ($proj['is_featured']): ?>
                  <span class="badge badge-featured"><i class="fas fa-star"></i> Featured</span>
                <?php else: ?>
                  <span style="color: var(--text-muted); font-size: 0.85rem;">Standard</span>
                <?php endif; ?>
              </td>
              <td><span style="font-size: 0.82rem; color: var(--text-muted);"><?php echo date('M j, Y', strtotime($proj['created_at'])); ?></span></td>
              <td>
                <div class="btn-group">
                  <a href="project_edit.php?id=<?php echo $proj['id']; ?>" class="btn btn-sm btn-secondary" title="Edit Project">
                    <i class="fas fa-edit"></i> Edit
                  </a>
                  <a href="project_delete.php?id=<?php echo $proj['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-sm btn-danger" data-confirm="Are you sure you want to delete this project?" title="Delete Project">
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
