<?php
/**
 * Admin Login
 * Anas Abdiwahid Portfolio Backend
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/functions.php';

// If already logged in, go to dashboard
if (is_logged_in()) {
    redirect('index.php');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['csrf_token'] ?? '';
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!verify_csrf($token)) {
        $error = 'Security session expired. Please refresh and try again.';
    } elseif (empty($username) || empty($password)) {
        $error = 'Please enter both your username and password.';
    } else {
        try {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username OR email = :email LIMIT 1");
            $stmt->execute([':username' => $username, ':email' => $username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                // Login Success
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $user['id'];
                $_SESSION['admin_username'] = $user['username'];
                $_SESSION['admin_name'] = $user['full_name'];
                $_SESSION['admin_email'] = $user['email'];
                $_SESSION['admin_role'] = $user['role'];

                set_flash('success', "Welcome back, {$user['full_name']}!");
                redirect('index.php');
            } else {
                $error = 'Invalid username or password.';
            }
        } catch (PDOException $e) {
            $error = 'Database error: ' . $e->getMessage();
        }
    }
}

$flash = get_flash();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login - Anas Abdiwahid Portfolio</title>
  <link rel="icon" type="image/png" href="../Sawir Logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body class="login-body">

  <div class="login-card">
    <div class="login-header">
      <img src="../Sawir Logo.png" alt="Anas Logo">
      <h2>Welcome Back</h2>
      <p>Log in to manage your portfolio & messages</p>
    </div>

    <?php if ($flash): ?>
      <div class="alert alert-<?php echo e($flash['type']); ?>">
        <i class="fas fa-info-circle"></i>
        <span><?php echo e($flash['message']); ?></span>
      </div>
    <?php endif; ?>

    <?php if ($error): ?>
      <div class="alert alert-error">
        <i class="fas fa-exclamation-circle"></i>
        <span><?php echo e($error); ?></span>
      </div>
    <?php endif; ?>

    <form action="login.php" method="POST">
      <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

      <div class="form-group">
        <label for="username">Username or Email</label>
        <input type="text" id="username" name="username" class="form-control" placeholder="admin or email" value="<?php echo isset($username) ? e($username) : ''; ?>" required autofocus>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" class="form-control" placeholder="••••••••" required>
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
        <i class="fas fa-sign-in-alt"></i> Sign In to Dashboard
      </button>
    </form>

    <div style="margin-top: 24px; text-align: center; font-size: 0.82rem; color: var(--text-muted);">
      <p>Default credentials: <strong>admin</strong> / <strong>admin123</strong></p>
      <p style="margin-top: 10px;"><a href="../index.php"><i class="fas fa-arrow-left"></i> Back to Website</a></p>
    </div>
  </div>

  <script src="assets/js/admin.js"></script>
</body>
</html>
