<?php
/**
 * Edit Portfolio Project
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'Edit Project';
$pageSubtitle = 'Update project information and media';

require_once __DIR__ . '/includes/admin_header.php';

$projectId = (int)($_GET['id'] ?? 0);
if ($projectId <= 0) {
    set_flash('error', 'Invalid project ID.');
    redirect('projects.php');
}

$stmt = $pdo->prepare("SELECT * FROM projects WHERE id = :id");
$stmt->execute([':id' => $projectId]);
$project = $stmt->fetch();

if (!$project) {
    set_flash('error', 'Project not found.');
    redirect('projects.php');
}

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
        
        $imageUrl = $project['image_url'];
        $videoUrl = $project['video_url'];

        if (empty($title)) {
            $errors[] = 'Project title is required.';
        }

        // Handle Image Upload if changed
        if (!empty($_FILES['image']['name'])) {
            $uploadDir = __DIR__ . '/../uploads/projects/';
            $uploadResult = upload_file($_FILES['image'], $uploadDir, ['jpg', 'jpeg', 'png', 'webp', 'gif']);
            if ($uploadResult['success']) {
                $imageUrl = 'uploads/projects/' . $uploadResult['filename'];
            } else {
                $errors[] = $uploadResult['error'];
            }
        }

        // Handle Video Upload if changed
        if (!empty($_FILES['video']['name'])) {
            $uploadDir = __DIR__ . '/../uploads/projects/';
            $uploadResult = upload_file($_FILES['video'], $uploadDir, ['mp4', 'webm', 'mov'], 52428800);
            if ($uploadResult['success']) {
                $videoUrl = 'uploads/projects/' . $uploadResult['filename'];
            } else {
                $errors[] = $uploadResult['error'];
            }
        }

        if (empty($errors)) {
            try {
                $stmt = $pdo->prepare("
                    UPDATE projects SET
                        title = :title,
                        category = :category,
                        description = :description,
                        image_url = :image_url,
                        video_url = :video_url,
                        project_url = :project_url,
                        badge_text = :badge_text,
                        is_featured = :is_featured,
                        sort_order = :sort_order
                    WHERE id = :id
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
                    ':sort_order'  => $sortOrder,
                    ':id'          => $projectId
                ]);

                set_flash('success', 'Project updated successfully!');
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
    <h2><i class="fas fa-edit"></i> Edit Portfolio Project: <?php echo e($project['title']); ?></h2>
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

  <form action="project_edit.php?id=<?php echo $projectId; ?>" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

    <div class="form-grid">
      <div class="form-group">
        <label for="title">Project Title *</label>
        <input type="text" id="title" name="title" class="form-control" value="<?php echo e($project['title']); ?>" required>
      </div>

      <div class="form-group">
        <label for="category">Category *</label>
        <select id="category" name="category" class="form-control" required>
          <option value="design" <?php echo $project['category'] === 'design' ? 'selected' : ''; ?>>Design</option>
          <option value="branding" <?php echo $project['category'] === 'branding' ? 'selected' : ''; ?>>Branding</option>
          <option value="multimedia" <?php echo $project['category'] === 'multimedia' ? 'selected' : ''; ?>>Multimedia</option>
          <option value="web" <?php echo $project['category'] === 'web' ? 'selected' : ''; ?>>Web Development</option>
          <option value="oit" <?php echo $project['category'] === 'oit' ? 'selected' : ''; ?>>IT / OIT</option>
        </select>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="badge_text">Badge Label</label>
        <input type="text" id="badge_text" name="badge_text" class="form-control" value="<?php echo e($project['badge_text'] ?? ''); ?>">
      </div>

      <div class="form-group">
        <label for="project_url">Project Link / URL</label>
        <input type="text" id="project_url" name="project_url" class="form-control" value="<?php echo e($project['project_url'] ?? '#'); ?>">
      </div>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" name="description" class="form-control"><?php echo e($project['description'] ?? ''); ?></textarea>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="image">Project Image (Upload to replace current)</label>
        <input type="file" id="image" name="image" class="form-control" accept="image/*" data-preview="imgPreview">
        
        <div style="margin-top: 12px;">
          <?php 
            $currentImg = $project['image_url'];
            if ($currentImg && !file_exists(__DIR__ . '/../' . $currentImg) && file_exists(__DIR__ . '/../uploads/projects/' . $currentImg)) {
                $currentImg = 'uploads/projects/' . $currentImg;
            }
          ?>
          <?php if (!empty($project['image_url'])): ?>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Current Image:</p>
            <img id="imgPreview" src="../<?php echo e($currentImg); ?>" alt="Preview" style="max-height: 140px; border-radius: 8px; border: 1px solid var(--border);">
          <?php else: ?>
            <img id="imgPreview" src="" alt="Preview" style="max-height: 140px; border-radius: 8px; display: none; border: 1px solid var(--border);">
          <?php endif; ?>
        </div>
      </div>

      <div class="form-group">
        <label for="video">Video File (Upload to replace current)</label>
        <input type="file" id="video" name="video" class="form-control" accept="video/mp4,video/webm">
        <?php if (!empty($project['video_url'])): ?>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px;">
            Current Video: <code><?php echo e($project['video_url']); ?></code>
          </p>
        <?php endif; ?>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="sort_order">Display Order</label>
        <input type="number" id="sort_order" name="sort_order" class="form-control" value="<?php echo (int)$project['sort_order']; ?>">
      </div>

      <div class="form-group" style="display: flex; align-items: center; padding-top: 28px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" name="is_featured" value="1" <?php echo $project['is_featured'] ? 'checked' : ''; ?> style="width: 18px; height: 18px;">
          <span>Show as Featured Project</span>
        </label>
      </div>
    </div>

    <div style="margin-top: 20px; display: flex; gap: 12px;">
      <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i> Update Project
      </button>
      <a href="projects.php" class="btn btn-secondary">Cancel</a>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/includes/admin_footer.php'; ?>
