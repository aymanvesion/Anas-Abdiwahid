<?php
/**
 * Add New Portfolio Project
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'Add Project';
$pageSubtitle = 'Upload a new project or showcase piece';

require_once __DIR__ . '/includes/admin_header.php';

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_csrf($_POST['csrf_token'] ?? '')) {
        $errors[] = 'Invalid security token. Please try again.';
    } else {
        $title       = sanitize($_POST['title'] ?? '');
        $category    = sanitize($_POST['category'] ?? 'design');
        $badgeText   = sanitize($_POST['badge_text'] ?? ucfirst($category));
        $description = sanitize($_POST['description'] ?? '');
        $projectUrl  = trim($_POST['project_url'] ?? '#');
        $sortOrder   = (int)($_POST['sort_order'] ?? 0);
        $isFeatured  = isset($_POST['is_featured']) ? 1 : 0;
        
        $imageUrl = null;
        $videoUrl = null;

        if (empty($title)) {
            $errors[] = 'Project title is required.';
        }

        // Handle Image Upload
        if (!empty($_FILES['image']['name'])) {
            $uploadDir = __DIR__ . '/../uploads/projects/';
            $uploadResult = upload_file($_FILES['image'], $uploadDir, ['jpg', 'jpeg', 'png', 'webp', 'gif']);
            if ($uploadResult['success']) {
                $imageUrl = 'uploads/projects/' . $uploadResult['filename'];
            } else {
                $errors[] = $uploadResult['error'];
            }
        }

        // Handle Video Upload if provided
        if (!empty($_FILES['video']['name'])) {
            $uploadDir = __DIR__ . '/../uploads/projects/';
            $uploadResult = upload_file($_FILES['video'], $uploadDir, ['mp4', 'webm', 'mov'], 52428800); // 50MB max
            if ($uploadResult['success']) {
                $videoUrl = 'uploads/projects/' . $uploadResult['filename'];
            } else {
                $errors[] = $uploadResult['error'];
            }
        }

        // Or direct video url input
        if (empty($videoUrl) && !empty($_POST['video_url'])) {
            $videoUrl = trim($_POST['video_url']);
        }

        if (empty($errors)) {
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO projects (title, category, description, image_url, video_url, project_url, badge_text, is_featured, sort_order)
                    VALUES (:title, :category, :description, :image_url, :video_url, :project_url, :badge_text, :is_featured, :sort_order)
                ");
                $stmt->execute([
                    ':title'       => $title,
                    ':category'    => $category,
                    ':description' => $description,
                    ':image_url'   => $imageUrl,
                    ':video_url'   => $videoUrl,
                    ':project_url' => $projectUrl,
                    ':badge_text'  => $badgeText,
                    ':is_featured' => $isFeatured,
                    ':sort_order'  => $sortOrder
                ]);

                set_flash('success', 'Project added successfully!');
                redirect('projects.php');
            } catch (PDOException $e) {
                $errors[] = 'Database error: ' . $e->getMessage();
            }
        }
    }
}
?>

<div style="margin-bottom: 20px;">
  <a href="projects.php" class="btn btn-secondary btn-sm">
    <i class="fas fa-arrow-left"></i> Back to Projects
  </a>
</div>

<div class="admin-card">
  <div class="card-header">
    <h2><i class="fas fa-plus-circle"></i> Add New Portfolio Item</h2>
  </div>

  <?php if (!empty($errors)): ?>
    <div class="alert alert-error">
      <i class="fas fa-exclamation-circle"></i>
      <div>
        <?php foreach ($errors as $err): ?>
          <p><?php echo e($err); ?></p>
        <?php endforeach; ?>
      </div>
    </div>
  <?php endif; ?>

  <form action="project_add.php" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

    <div class="form-grid">
      <div class="form-group">
        <label for="title">Project Title *</label>
        <input type="text" id="title" name="title" class="form-control" placeholder="e.g. Burger Social Media Graphic" value="<?php echo isset($_POST['title']) ? e($_POST['title']) : ''; ?>" required>
      </div>

      <div class="form-group">
        <label for="category">Category *</label>
        <select id="category" name="category" class="form-control" required>
          <option value="design" <?php echo (isset($_POST['category']) && $_POST['category'] === 'design') ? 'selected' : ''; ?>>Design</option>
          <option value="branding" <?php echo (isset($_POST['category']) && $_POST['category'] === 'branding') ? 'selected' : ''; ?>>Branding</option>
          <option value="multimedia" <?php echo (isset($_POST['category']) && $_POST['category'] === 'multimedia') ? 'selected' : ''; ?>>Multimedia</option>
          <option value="web" <?php echo (isset($_POST['category']) && $_POST['category'] === 'web') ? 'selected' : ''; ?>>Web Development</option>
          <option value="oit" <?php echo (isset($_POST['category']) && $_POST['category'] === 'oit') ? 'selected' : ''; ?>>IT / OIT</option>
        </select>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="badge_text">Badge Label</label>
        <input type="text" id="badge_text" name="badge_text" class="form-control" placeholder="e.g. Design, Video, Web" value="<?php echo isset($_POST['badge_text']) ? e($_POST['badge_text']) : ''; ?>">
      </div>

      <div class="form-group">
        <label for="project_url">Project Link / URL</label>
        <input type="text" id="project_url" name="project_url" class="form-control" placeholder="https://... or #" value="<?php echo isset($_POST['project_url']) ? e($_POST['project_url']) : '#'; ?>">
      </div>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" name="description" class="form-control" placeholder="Brief details about the project..."><?php echo isset($_POST['description']) ? e($_POST['description']) : ''; ?></textarea>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="image">Project Image (JPG, PNG, WEBP)</label>
        <input type="file" id="image" name="image" class="form-control" accept="image/*" data-preview="imgPreview">
        <div style="margin-top: 10px;">
          <img id="imgPreview" src="" alt="Preview" style="max-height: 140px; border-radius: 8px; display: none; border: 1px solid var(--border);">
        </div>
      </div>

      <div class="form-group">
        <label for="video">Or Video File (MP4, WEBM)</label>
        <input type="file" id="video" name="video" class="form-control" accept="video/mp4,video/webm">
        <small style="color: var(--text-muted); display: block; margin-top: 4px;">Max file size: 50MB</small>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="sort_order">Display Order (0, 1, 2...)</label>
        <input type="number" id="sort_order" name="sort_order" class="form-control" value="<?php echo isset($_POST['sort_order']) ? (int)$_POST['sort_order'] : 0; ?>">
      </div>

      <div class="form-group" style="display: flex; align-items: center; padding-top: 28px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" name="is_featured" value="1" <?php echo !empty($_POST['is_featured']) ? 'checked' : ''; ?> style="width: 18px; height: 18px;">
          <span>Show as Featured Project</span>
        </label>
      </div>
    </div>

    <div style="margin-top: 20px; display: flex; gap: 12px;">
      <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i> Save Project
      </button>
      <a href="projects.php" class="btn btn-secondary">Cancel</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/includes/admin_footer.php'; ?>
