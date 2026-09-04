<?php
/**
 * Site Settings & CV Manager
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'Site Settings & CV';
$pageSubtitle = 'Update website content, contact info, social links, and CV document';

require_once __DIR__ . '/includes/admin_header.php';

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_csrf($_POST['csrf_token'] ?? '')) {
        $errors[] = 'Invalid security token. Please try again.';
    } else {
        $settingsToUpdate = [
            'owner_name'       => sanitize($_POST['owner_name'] ?? ''),
            'profession'       => sanitize($_POST['profession'] ?? ''),
            'hero_greeting'    => sanitize($_POST['hero_greeting'] ?? 'Hi I am'),
            'hero_badge'       => sanitize($_POST['hero_badge'] ?? '99+ Happy Clients'),
            'hero_p1'          => sanitize($_POST['hero_p1'] ?? ''),
            'hero_p2'          => sanitize($_POST['hero_p2'] ?? ''),
            'hero_p3'          => sanitize($_POST['hero_p3'] ?? ''),
            'about_intro'      => sanitize($_POST['about_intro'] ?? ''),
            'years_experience' => (int)($_POST['years_experience'] ?? 3),
            'projects_done'    => (int)($_POST['projects_done'] ?? 99),
            'happy_clients'    => (int)($_POST['happy_clients'] ?? 99),
            'email'            => sanitize($_POST['email'] ?? ''),
            'phone'            => sanitize($_POST['phone'] ?? ''),
            'whatsapp'         => sanitize($_POST['whatsapp'] ?? ''),
            'location'         => sanitize($_POST['location'] ?? 'Mogadishu, Somalia'),
            'university'       => sanitize($_POST['university'] ?? 'Hormuud University'),
            'facebook_url'     => trim($_POST['facebook_url'] ?? ''),
            'linkedin_url'     => trim($_POST['linkedin_url'] ?? ''),
            'github_url'       => trim($_POST['github_url'] ?? ''),
            'tiktok_url'       => trim($_POST['tiktok_url'] ?? ''),
            'youtube_url'      => trim($_POST['youtube_url'] ?? ''),
            'linktree_url'     => trim($_POST['linktree_url'] ?? '')
        ];

        // Handle CV PDF upload if present
        if (!empty($_FILES['cv_file']['name'])) {
            $uploadDir = __DIR__ . '/../uploads/cv/';
            $cvResult = upload_file($_FILES['cv_file'], $uploadDir, ['pdf', 'doc', 'docx'], 15728640);
            if ($cvResult['success']) {
                $settingsToUpdate['cv_file'] = 'uploads/cv/' . $cvResult['filename'];
            } else {
                $errors[] = 'CV Upload Error: ' . $cvResult['error'];
            }
        }

        if (empty($errors)) {
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO site_settings (setting_key, setting_value)
                    VALUES (:key, :value)
                    ON DUPLICATE KEY UPDATE setting_value = :value_update
                ");

                foreach ($settingsToUpdate as $key => $value) {
                    $stmt->execute([
                        ':key'          => $key,
                        ':value'        => (string)$value,
                        ':value_update' => (string)$value
                    ]);
                }

                set_flash('success', 'Site settings and information updated successfully!');
                redirect('settings.php');
            } catch (PDOException $e) {
                $errors[] = 'Database error: ' . $e->getMessage();
            }
        }
    }
}

// Fetch current settings
$settings = get_all_settings($pdo);
?>

<div class="admin-card">
  <div class="card-header">
    <h2><i class="fas fa-sliders-h"></i> Website Configuration</h2>
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

  <form action="settings.php" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

    <!-- 1. Personal & Hero Section -->
    <h3 style="font-size: 1.05rem; margin-bottom: 16px; color: var(--primary);"><i class="fas fa-user"></i> Personal & Hero Information</h3>
    <div class="form-grid">
      <div class="form-group">
        <label for="owner_name">Full Name</label>
        <input type="text" id="owner_name" name="owner_name" class="form-control" value="<?php echo e($settings['owner_name'] ?? 'Anas Abdiwahid Hussein Warsame'); ?>" required>
      </div>

      <div class="form-group">
        <label for="profession">Profession / Title</label>
        <input type="text" id="profession" name="profession" class="form-control" value="<?php echo e($settings['profession'] ?? 'Full Stack Developer & Multimedia Specialist'); ?>" required>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="hero_greeting">Greeting Text</label>
        <input type="text" id="hero_greeting" name="hero_greeting" class="form-control" value="<?php echo e($settings['hero_greeting'] ?? 'Hi I am'); ?>">
      </div>

      <div class="form-group">
        <label for="hero_badge">Hero Badge</label>
        <input type="text" id="hero_badge" name="hero_badge" class="form-control" value="<?php echo e($settings['hero_badge'] ?? '99+ Happy Clients'); ?>">
      </div>
    </div>

    <div class="form-group">
      <label for="hero_p1">Hero Bio Paragraph 1</label>
      <textarea id="hero_p1" name="hero_p1" class="form-control" rows="2"><?php echo e($settings['hero_p1'] ?? ''); ?></textarea>
    </div>

    <div class="form-group">
      <label for="about_intro">About Section Intro</label>
      <textarea id="about_intro" name="about_intro" class="form-control" rows="2"><?php echo e($settings['about_intro'] ?? ''); ?></textarea>
    </div>

    <!-- 2. Numerical Stats -->
    <h3 style="font-size: 1.05rem; margin: 28px 0 16px; color: var(--primary);"><i class="fas fa-chart-bar"></i> Counter Statistics</h3>
    <div class="form-grid">
      <div class="form-group">
        <label for="years_experience">Years Experience</label>
        <input type="number" id="years_experience" name="years_experience" class="form-control" value="<?php echo (int)($settings['years_experience'] ?? 4); ?>">
      </div>

      <div class="form-group">
        <label for="projects_done">Projects Done</label>
        <input type="number" id="projects_done" name="projects_done" class="form-control" value="<?php echo (int)($settings['projects_done'] ?? 99); ?>">
      </div>

      <div class="form-group">
        <label for="happy_clients">Happy Clients</label>
        <input type="number" id="happy_clients" name="happy_clients" class="form-control" value="<?php echo (int)($settings['happy_clients'] ?? 99); ?>">
      </div>
    </div>

    <!-- 3. Contact & Location -->
    <h3 style="font-size: 1.05rem; margin: 28px 0 16px; color: var(--primary);"><i class="fas fa-map-marker-alt"></i> Contact & Location</h3>
    <div class="form-grid">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" class="form-control" value="<?php echo e($settings['email'] ?? 'anasabdiwahidhussein@gmail.com'); ?>" required>
      </div>

      <div class="form-group">
        <label for="phone">Phone / WhatsApp Number</label>
        <input type="text" id="phone" name="phone" class="form-control" value="<?php echo e($settings['phone'] ?? '+252 616 256 534'); ?>" required>
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" id="location" name="location" class="form-control" value="<?php echo e($settings['location'] ?? 'Mogadishu, Somalia'); ?>">
      </div>

      <div class="form-group">
        <label for="university">University</label>
        <input type="text" id="university" name="university" class="form-control" value="<?php echo e($settings['university'] ?? 'Hormuud University'); ?>">
      </div>
    </div>

    <!-- 4. CV Upload -->
    <h3 style="font-size: 1.05rem; margin: 28px 0 16px; color: var(--primary);"><i class="fas fa-file-pdf"></i> Curriculum Vitae (CV) PDF</h3>
    <div class="form-group">
      <label for="cv_file">Upload New CV File (PDF, DOC)</label>
      <input type="file" id="cv_file" name="cv_file" class="form-control" accept=".pdf,.doc,.docx">
      <?php if (!empty($settings['cv_file'])): ?>
        <div style="margin-top: 8px; font-size: 0.85rem;">
          Current File: <a href="../<?php echo e($settings['cv_file']); ?>" target="_blank" style="font-weight: 600;"><i class="fas fa-file-download"></i> <?php echo e(basename($settings['cv_file'])); ?></a>
        </div>
      <?php endif; ?>
    </div>

    <!-- 5. Social Media Links -->
    <h3 style="font-size: 1.05rem; margin: 28px 0 16px; color: var(--primary);"><i class="fas fa-share-alt"></i> Social Media & Profiles</h3>
    <div class="form-grid">
      <div class="form-group">
        <label><i class="fab fa-facebook"></i> Facebook URL</label>
        <input type="url" name="facebook_url" class="form-control" value="<?php echo e($settings['facebook_url'] ?? ''); ?>">
      </div>

      <div class="form-group">
        <label><i class="fab fa-linkedin"></i> LinkedIn URL</label>
        <input type="url" name="linkedin_url" class="form-control" value="<?php echo e($settings['linkedin_url'] ?? ''); ?>">
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label><i class="fab fa-github"></i> GitHub URL</label>
        <input type="url" name="github_url" class="form-control" value="<?php echo e($settings['github_url'] ?? ''); ?>">
      </div>

      <div class="form-group">
        <label><i class="fab fa-tiktok"></i> TikTok URL</label>
        <input type="url" name="tiktok_url" class="form-control" value="<?php echo e($settings['tiktok_url'] ?? ''); ?>">
      </div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label><i class="fab fa-youtube"></i> YouTube URL</label>
        <input type="url" name="youtube_url" class="form-control" value="<?php echo e($settings['youtube_url'] ?? ''); ?>">
      </div>

      <div class="form-group">
        <label><i class="fas fa-link"></i> Linktree URL</label>
        <input type="url" name="linktree_url" class="form-control" value="<?php echo e($settings['linktree_url'] ?? ''); ?>">
      </div>
    </div>

    <div style="margin-top: 24px;">
      <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i> Save All Settings
      </button>
    </div>
  </form>
</div>

<?php require_once __DIR__ . '/includes/admin_footer.php'; ?>
