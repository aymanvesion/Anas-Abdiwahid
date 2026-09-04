<?php
/**
 * Admin Profile & Password Change
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'My Profile & Security';
$pageSubtitle = 'Update admin profile information and login password';

require_once __DIR__ . '/includes/admin_header.php';

$userId = (int)($_SESSION['admin_id'] ?? 0);
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$stmt->execute([':id' => $userId]);
$user = $stmt->fetch();

$profileErrors = [];
$passwordErrors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_csrf($_POST['csrf_token'] ?? '')) {
        set_flash('error', 'Invalid security token.');
        redirect('profile.php');
    }

    $action = $_POST['action'] ?? '';

    // 1. Update Profile Info
    if ($action === 'update_profile') {
        $fullName = sanitize($_POST['full_name'] ?? '');
        $username = sanitize($_POST['username'] ?? '');
        $email    = trim($_POST['email'] ?? '');

        if (empty($fullName)) $profileErrors[] = 'Full name is required.';
        if (empty($username)) $profileErrors[] = 'Username is required.';
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $profileErrors[] = 'Valid email is required.';

        if (empty($profileErrors)) {
            try {
                $stmt = $pdo->prepare("
                    UPDATE users SET full_name = :full_name, username = :username, email = :email WHERE id = :id
                ");
                $stmt->execute([
                    ':full_name' => $fullName,
                    ':username'  => $username,
                    ':email'     => $email,
                    ':id'        => $userId
                ]);

                $_SESSION['admin_name'] = $fullName;
                $_SESSION['admin_username'] = $username;
                $_SESSION['admin_email'] = $email;

                set_flash('success', 'Profile updated successfully!');
                redirect('profile.php');
            } catch (PDOException $e) {
                $profileErrors[] = 'Username or email may already be in use.';
            }
        }
    }

    // 2. Change Password
    if ($action === 'change_password') {
        $currentPass = $_POST['current_password'] ?? '';
        $newPass     = $_POST['new_password'] ?? '';
        $confirmPass = $_POST['confirm_password'] ?? '';

        if (empty($currentPass) || !password_verify($currentPass, $user['password_hash'])) {
            $passwordErrors[] = 'Current password is incorrect.';
        }

        if (strlen($newPass) < 6) {
            $passwordErrors[] = 'New password must be at least 6 characters.';
        }

        if ($newPass !== $confirmPass) {
            $passwordErrors[] = 'New password and confirmation do not match.';
        }

        if (empty($passwordErrors)) {
            $newHash = password_hash($newPass, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("UPDATE users SET password_hash = :hash WHERE id = :id");
            $stmt->execute([':hash' => $newHash, ':id' => $userId]);

            set_flash('success', 'Password changed successfully!');
            redirect('profile.php');
        }
    }
}
?>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
  
  <!-- Profile Info Card -->
  <div class="admin-card">
    <div class="card-header">
      <h2><i class="fas fa-user-edit"></i> Admin Information</h2>
    </div>

    <?php if (!empty($profileErrors)): ?>
      <div class="alert alert-error">
        <i class="fas fa-exclamation-circle"></i>
        <div>
          <?php foreach ($profileErrors as $err): ?>
            <p><?php echo e($err); ?></p>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endif; ?>

    <form action="profile.php" method="POST">
      <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
      <input type="hidden" name="action" value="update_profile">

      <div class="form-group">
        <label for="full_name">Full Name</label>
        <input type="text" id="full_name" name="full_name" class="form-control" value="<?php echo e($user['full_name']); ?>" required>
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" class="form-control" value="<?php echo e($user['username']); ?>" required>
      </div>

      <div class="form-group">
        <label for="email">Admin Email</label>
        <input type="email" id="email" name="email" class="form-control" value="<?php echo e($user['email']); ?>" required>
      </div>

      <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i> Update Profile
      </button>
    </form>
  </div>

  <!-- Password Change Card -->
  <div class="admin-card">
    <div class="card-header">
      <h2><i class="fas fa-key"></i> Change Password</h2>
    </div>

    <?php if (!empty($passwordErrors)): ?>
      <div class="alert alert-error">
        <i class="fas fa-exclamation-circle"></i>
        <div>
          <?php foreach ($passwordErrors as $err): ?>
            <p><?php echo e($err); ?></p>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endif; ?>

    <form action="profile.php" method="POST">
      <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
      <input type="hidden" name="action" value="change_password">

      <div class="form-group">
        <label for="current_password">Current Password</label>
        <input type="password" id="current_password" name="current_password" class="form-control" placeholder="••••••••" required>
      </div>

      <div class="form-group">
        <label for="new_password">New Password (min 6 characters)</label>
        <input type="password" id="new_password" name="new_password" class="form-control" placeholder="••••••••" required>
      </div>

      <div class="form-group">
        <label for="confirm_password">Confirm New Password</label>
        <input type="password" id="confirm_password" name="confirm_password" class="form-control" placeholder="••••••••" required>
      </div>

      <button type="submit" class="btn btn-primary">
        <i class="fas fa-lock"></i> Update Password
      </button>
    </form>
  </div>

</div>

<?php require_once __DIR__ . '/includes/admin_footer.php'; ?>
