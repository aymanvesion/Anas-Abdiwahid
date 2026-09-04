<?php
/**
 * Manage Services & Skills
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'Services & Skills';
$pageSubtitle = 'Manage the services you offer and the progress percentages of your skills';

require_once __DIR__ . '/includes/admin_header.php';

// 1. Handle Skill Updates / Actions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action_type'])) {
    if (!verify_csrf($_POST['csrf_token'] ?? '')) {
        set_flash('error', 'Invalid security token.');
        redirect('services.php');
    }

    if ($_POST['action_type'] === 'update_skills') {
        $skillsData = $_POST['skills'] ?? [];
        foreach ($skillsData as $skillId => $data) {
            $name = sanitize($data['name'] ?? '');
            $pct  = (int)($data['percentage'] ?? 0);
            $pct  = max(0, min(100, $pct));
            
            $stmt = $pdo->prepare("UPDATE skills SET skill_name = :name, percentage = :pct WHERE id = :id");
            $stmt->execute([':name' => $name, ':pct' => $pct, ':id' => (int)$skillId]);
        }
        set_flash('success', 'Skills percentages updated successfully!');
        redirect('services.php');
    }

    if ($_POST['action_type'] === 'add_skill') {
        $name = sanitize($_POST['skill_name'] ?? '');
        $pct  = (int)($_POST['percentage'] ?? 80);
        $pct  = max(0, min(100, $pct));

        if (!empty($name)) {
            $stmt = $pdo->prepare("INSERT INTO skills (skill_name, percentage, sort_order) VALUES (:name, :pct, 99)");
            $stmt->execute([':name' => $name, ':pct' => $pct]);
            set_flash('success', 'New skill added successfully!');
        }
        redirect('services.php');
    }

    if ($_POST['action_type'] === 'add_service') {
        $title = sanitize($_POST['title'] ?? '');
        $desc  = sanitize($_POST['description'] ?? '');
        $icon  = sanitize($_POST['icon_class'] ?? 'fas fa-code');
        $feat  = isset($_POST['is_featured']) ? 1 : 0;

        if (!empty($title) && !empty($desc)) {
            $stmt = $pdo->prepare("INSERT INTO services (title, description, icon_class, is_featured) VALUES (:title, :desc, :icon, :feat)");
            $stmt->execute([':title' => $title, ':desc' => $desc, ':icon' => $icon, ':feat' => $feat]);
            set_flash('success', 'New service added successfully!');
        }
        redirect('services.php');
    }
}

// Handle Service Delete via GET
if (isset($_GET['delete_service'])) {
    $serviceId = (int)$_GET['delete_service'];
    if (verify_csrf($_GET['csrf_token'] ?? '')) {
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = :id");
        $stmt->execute([':id' => $serviceId]);
        set_flash('success', 'Service removed successfully.');
    }
    redirect('services.php');
}

// Handle Skill Delete via GET
if (isset($_GET['delete_skill'])) {
    $skillId = (int)$_GET['delete_skill'];
    if (verify_csrf($_GET['csrf_token'] ?? '')) {
        $stmt = $pdo->prepare("DELETE FROM skills WHERE id = :id");
        $stmt->execute([':id' => $skillId]);
        set_flash('success', 'Skill removed successfully.');
    }
    redirect('services.php');
}

// Fetch all skills
$skills = $pdo->query("SELECT * FROM skills ORDER BY sort_order ASC, id ASC")->fetchAll();

// Fetch all services
$services = $pdo->query("SELECT * FROM services ORDER BY sort_order ASC, id ASC")->fetchAll();
?>

<!-- Skills Management Section -->
<div class="admin-card">
  <div class="card-header">
    <h2><i class="fas fa-chart-line"></i> About Section - Skills & Proficiency Bars</h2>
  </div>

  <form action="services.php" method="POST">
    <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
    <input type="hidden" name="action_type" value="update_skills">

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
      <?php foreach ($skills as $sk): ?>
        <div style="background: var(--bg); padding: 18px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <strong style="font-size: 0.95rem;"><?php echo e($sk['skill_name']); ?></strong>
            <a href="services.php?delete_skill=<?php echo $sk['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-sm btn-danger" style="padding: 3px 8px; font-size: 0.75rem;" data-confirm="Delete this skill?">
              <i class="fas fa-trash"></i>
            </a>
          </div>

          <div class="form-group" style="margin-bottom: 10px;">
            <label style="font-size: 0.8rem;">Skill Name</label>
            <input type="text" name="skills[<?php echo $sk['id']; ?>][name]" class="form-control" value="<?php echo e($sk['skill_name']); ?>" required>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label style="font-size: 0.8rem;">Proficiency: <strong id="val_<?php echo $sk['id']; ?>"><?php echo (int)$sk['percentage']; ?>%</strong></label>
            <input type="range" name="skills[<?php echo $sk['id']; ?>][percentage]" min="0" max="100" class="form-control" value="<?php echo (int)$sk['percentage']; ?>" oninput="document.getElementById('val_<?php echo $sk['id']; ?>').innerText = this.value + '%'" style="padding: 4px; cursor: pointer;">
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <button type="submit" class="btn btn-primary">
      <i class="fas fa-save"></i> Save Skills Changes
    </button>
  </form>

  <!-- Add New Skill Form -->
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed var(--border);">
    <h3 style="font-size: 0.95rem; margin-bottom: 14px;"><i class="fas fa-plus-circle"></i> Add New Skill Bar</h3>
    <form action="services.php" method="POST" style="display: flex; gap: 12px; flex-wrap: wrap;">
      <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
      <input type="hidden" name="action_type" value="add_skill">

      <input type="text" name="skill_name" class="form-control" placeholder="Skill Name (e.g. Python & AI)" style="max-width: 250px;" required>
      <input type="number" name="percentage" class="form-control" placeholder="Percentage (e.g. 90)" min="0" max="100" value="85" style="max-width: 130px;" required>
      <button type="submit" class="btn btn-secondary">Add Skill</button>
    </form>
  </div>
</div>

<!-- Services Management Section -->
<div class="admin-card">
  <div class="card-header">
    <h2><i class="fas fa-concierge-bell"></i> Services Offered (<?php echo count($services); ?>)</h2>
  </div>

  <div class="table-responsive" style="margin-bottom: 24px;">
    <table class="admin-table">
      <thead>
        <tr>
          <th>Icon</th>
          <th>Service Title</th>
          <th>Description</th>
          <th>Featured</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($services as $srv): ?>
          <tr>
            <td>
              <div style="width: 40px; height: 40px; border-radius: 10px; background: <?php echo e($srv['icon_bg'] ?? '#eef2ff'); ?>; color: <?php echo e($srv['icon_color'] ?? '#4361ee'); ?>; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                <i class="<?php echo e($srv['icon_class']); ?>"></i>
              </div>
            </td>
            <td><strong><?php echo e($srv['title']); ?></strong></td>
            <td><?php echo e(mb_strimwidth($srv['description'], 0, 80, '...')); ?></td>
            <td>
              <?php if ($srv['is_featured']): ?>
                <span class="badge badge-featured"><i class="fas fa-star"></i> Featured</span>
              <?php else: ?>
                <span style="color: var(--text-muted); font-size: 0.8rem;">Standard</span>
              <?php endif; ?>
            </td>
            <td>
              <a href="services.php?delete_service=<?php echo $srv['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-sm btn-danger" data-confirm="Are you sure you want to delete this service?">
                <i class="fas fa-trash"></i>
              </a>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>

  <!-- Add New Service -->
  <div style="padding-top: 20px; border-top: 1px dashed var(--border);">
    <h3 style="font-size: 0.95rem; margin-bottom: 14px;"><i class="fas fa-plus-circle"></i> Add New Service</h3>
    <form action="services.php" method="POST">
      <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
      <input type="hidden" name="action_type" value="add_service">

      <div class="form-grid">
        <div class="form-group">
          <label>Service Title *</label>
          <input type="text" name="title" class="form-control" placeholder="e.g. Mobile App Development" required>
        </div>

        <div class="form-group">
          <label>FontAwesome Icon Class *</label>
          <input type="text" name="icon_class" class="form-control" placeholder="e.g. fas fa-mobile-alt" value="fas fa-code" required>
          <small style="color: var(--text-muted);">Example: <code>fas fa-code</code>, <code>fas fa-palette</code>, <code>fas fa-video</code></small>
        </div>
      </div>

      <div class="form-group">
        <label>Service Description *</label>
        <textarea name="description" class="form-control" rows="3" placeholder="Explain what this service provides..." required></textarea>
      </div>

      <div class="form-group">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" name="is_featured" value="1" style="width: 18px; height: 18px;">
          <span>Highlight as Featured Service</span>
        </label>
      </div>

      <button type="submit" class="btn btn-primary">
        <i class="fas fa-plus"></i> Add Service
      </button>
    </form>
  </div>
</div>

<?php require_once __DIR__ . '/includes/admin_footer.php'; ?>
