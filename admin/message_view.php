<?php
/**
 * View Single Message
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'View Message';
$pageSubtitle = 'Client inquiry details';

require_once __DIR__ . '/includes/admin_header.php';

$msgId = (int)($_GET['id'] ?? 0);
if ($msgId <= 0) {
    set_flash('error', 'Invalid message ID.');
    redirect('messages.php');
}

$stmt = $pdo->prepare("SELECT * FROM messages WHERE id = :id");
$stmt->execute([':id' => $msgId]);
$message = $stmt->fetch();

if (!$message) {
    set_flash('error', 'Message not found.');
    redirect('messages.php');
}

// Mark as read automatically when viewed
if (!$message['is_read']) {
    $updateStmt = $pdo->prepare("UPDATE messages SET is_read = 1 WHERE id = :id");
    $updateStmt->execute([':id' => $msgId]);
    $message['is_read'] = 1;
}
?>

<div style="margin-bottom: 20px;">
  <a href="messages.php" class="btn btn-secondary btn-sm">
    <i class="fas fa-arrow-left"></i> Back to Messages Inbox
  </a>
</div>

<div class="admin-card">
  <div class="card-header">
    <h2>
      <i class="fas fa-envelope-open"></i> 
      <span><?php echo e($message['subject'] ?: 'Inquiry from ' . $message['name']); ?></span>
    </h2>
    <div>
      <span class="badge badge-read"><i class="fas fa-check"></i> Read</span>
    </div>
  </div>

  <div style="background: var(--bg); padding: 20px; border-radius: var(--radius-sm); margin-bottom: 24px; border: 1px solid var(--border);">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
      <div>
        <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block;">From</span>
        <strong style="font-size: 1rem; color: var(--text-main);"><?php echo e($message['name']); ?></strong>
      </div>
      <div>
        <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block;">Email</span>
        <a href="mailto:<?php echo e($message['email']); ?>" style="font-size: 1rem; font-weight: 600;"><?php echo e($message['email']); ?></a>
      </div>
      <div>
        <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block;">Date Received</span>
        <span style="font-size: 0.95rem; color: var(--text-main);"><?php echo date('F j, Y, g:i a', strtotime($message['created_at'])); ?> (<?php echo time_ago($message['created_at']); ?>)</span>
      </div>
      <div>
        <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block;">Sender IP</span>
        <span style="font-size: 0.9rem; color: var(--text-muted);"><?php echo e($message['ip_address'] ?? 'N/A'); ?></span>
      </div>
    </div>
  </div>

  <div style="padding: 10px 0 24px;">
    <h3 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.5px;">Message Content</h3>
    <div style="font-size: 1rem; line-height: 1.7; color: var(--text-main); background: var(--card-bg); padding: 24px; border-radius: var(--radius-sm); border: 1px solid var(--border); white-space: pre-wrap; word-break: break-word;">
      <?php echo nl2br(e($message['message'])); ?>
    </div>
  </div>

  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding-top: 18px; border-top: 1px solid var(--border);">
    <a href="mailto:<?php echo e($message['email']); ?>?subject=Re: <?php echo urlencode($message['subject'] ?: 'Portfolio Inquiry'); ?>" class="btn btn-primary">
      <i class="fas fa-reply"></i> Reply via Email
    </a>
    <a href="messages.php?action=mark_unread&id=<?php echo $message['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-secondary">
      <i class="fas fa-envelope"></i> Mark as Unread
    </a>
    <a href="messages.php?action=delete&id=<?php echo $message['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-danger" data-confirm="Are you sure you want to permanently delete this message?">
      <i class="fas fa-trash"></i> Delete Message
    </a>
  </div>
</div>

<?php require_once __DIR__ . '/includes/admin_footer.php'; ?>
