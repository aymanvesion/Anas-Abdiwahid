<?php
/**
 * Messages Inbox
 * Anas Abdiwahid Portfolio Backend
 */

$pageTitle = 'Messages Inbox';
$pageSubtitle = 'View and respond to client inquiries sent via your website contact form';

require_once __DIR__ . '/includes/admin_header.php';

// Handle Actions (Delete / Mark Read)
if (isset($_GET['action']) && isset($_GET['id'])) {
    $action = $_GET['action'];
    $msgId = (int)$_GET['id'];
    $token = $_GET['csrf_token'] ?? '';

    if (verify_csrf($token)) {
        if ($action === 'delete') {
            $stmt = $pdo->prepare("DELETE FROM messages WHERE id = :id");
            $stmt->execute([':id' => $msgId]);
            set_flash('success', 'Message deleted successfully.');
        } elseif ($action === 'mark_read') {
            $stmt = $pdo->prepare("UPDATE messages SET is_read = 1 WHERE id = :id");
            $stmt->execute([':id' => $msgId]);
            set_flash('success', 'Message marked as read.');
        } elseif ($action === 'mark_unread') {
            $stmt = $pdo->prepare("UPDATE messages SET is_read = 0 WHERE id = :id");
            $stmt->execute([':id' => $msgId]);
            set_flash('info', 'Message marked as unread.');
        }
    } else {
        set_flash('error', 'Invalid security token.');
    }
    redirect('messages.php');
}

// Filter
$filter = $_GET['filter'] ?? 'all';
$query = "SELECT * FROM messages";
if ($filter === 'unread') {
    $query .= " WHERE is_read = 0";
} elseif ($filter === 'read') {
    $query .= " WHERE is_read = 1";
}
$query .= " ORDER BY created_at DESC";

$messages = [];
try {
    $stmt = $pdo->query($query);
    $messages = $stmt->fetchAll();
} catch (Exception $e) {
    $messages = [];
}
?>

<div class="admin-card">
  <div class="card-header" style="flex-wrap: wrap; gap: 12px;">
    <div style="display: flex; gap: 8px;">
      <a href="messages.php?filter=all" class="btn btn-sm <?php echo $filter === 'all' ? 'btn-primary' : 'btn-secondary'; ?>">
        All Messages
      </a>
      <a href="messages.php?filter=unread" class="btn btn-sm <?php echo $filter === 'unread' ? 'btn-primary' : 'btn-secondary'; ?>">
        Unread <?php if ($unreadCount > 0): ?>(<?php echo $unreadCount; ?>)<?php endif; ?>
      </a>
      <a href="messages.php?filter=read" class="btn btn-sm <?php echo $filter === 'read' ? 'btn-primary' : 'btn-secondary'; ?>">
        Read
      </a>
    </div>

    <span style="font-size: 0.85rem; color: var(--text-muted);">
      Total: <strong><?php echo count($messages); ?></strong> messages
    </span>
  </div>

  <div class="table-responsive">
    <table class="admin-table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Sender Name</th>
          <th>Email Address</th>
          <th>Subject</th>
          <th>Received</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if (empty($messages)): ?>
          <tr>
            <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 40px;">
              <i class="fas fa-inbox" style="font-size: 2.5rem; margin-bottom: 12px; display: block; opacity: 0.4;"></i>
              No messages found for this filter.
            </td>
          </tr>
        <?php else: ?>
          <?php foreach ($messages as $msg): ?>
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
              <td><?php echo e(mb_strimwidth($msg['subject'] ?? 'No Subject', 0, 35, '...')); ?></td>
              <td><span title="<?php echo e($msg['created_at']); ?>"><?php echo time_ago($msg['created_at']); ?></span></td>
              <td>
                <div class="btn-group">
                  <a href="message_view.php?id=<?php echo $msg['id']; ?>" class="btn btn-sm btn-primary" title="View Full Message">
                    <i class="fas fa-eye"></i> View
                  </a>
                  <?php if ($msg['is_read']): ?>
                    <a href="messages.php?action=mark_unread&id=<?php echo $msg['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-sm btn-secondary" title="Mark as Unread">
                      <i class="fas fa-envelope"></i>
                    </a>
                  <?php else: ?>
                    <a href="messages.php?action=mark_read&id=<?php echo $msg['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-sm btn-secondary" title="Mark as Read">
                      <i class="fas fa-envelope-open"></i>
                    </a>
                  <?php endif; ?>
                  <a href="messages.php?action=delete&id=<?php echo $msg['id']; ?>&csrf_token=<?php echo csrf_token(); ?>" class="btn btn-sm btn-danger" data-confirm="Are you sure you want to permanently delete this message?" title="Delete Message">
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
