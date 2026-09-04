<?php
/**
 * SMTP Mailer Helper
 * Sends contact messages via Gmail SMTP
 */

function send_contact_notification($data) {
    $configFile = __DIR__ . '/../config/smtp.php';
    if (!file_exists($configFile)) {
        return ['success' => false, 'error' => 'SMTP configuration not found.'];
    }

    $config = require $configFile;

    $smtpHost    = $config['smtp_host'] ?? 'smtp.gmail.com';
    $smtpPort    = $config['smtp_port'] ?? 465;
    $smtpUser    = $config['smtp_user'] ?? 'anasrk85@gmail.com';
    $smtpPass    = $config['smtp_pass'] ?? '';
    $senderName  = $config['sender_name'] ?? 'Anas Portfolio';
    $targetEmail = $config['receiver_email'] ?? 'anasabdiwahidhussein@gmail.com';

    $clientName    = htmlspecialchars($data['name'] ?? 'Visitor', ENT_QUOTES, 'UTF-8');
    $clientEmail   = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $clientPhone   = htmlspecialchars($data['phone'] ?? 'N/A', ENT_QUOTES, 'UTF-8');
    $clientSubject = htmlspecialchars($data['subject'] ?? 'New Portfolio Inquiry', ENT_QUOTES, 'UTF-8');
    $clientMessage = nl2br(htmlspecialchars($data['message'] ?? '', ENT_QUOTES, 'UTF-8'));
    $clientIp      = htmlspecialchars($data['ip'] ?? 'Unknown', ENT_QUOTES, 'UTF-8');
    $submitTime    = date('d M Y, h:i A (T)');

    // Clean phone for whatsapp
    $cleanPhone = preg_replace('/[^0-9]/', '', $clientPhone);
    $waLink = !empty($cleanPhone) ? "https://wa.me/{$cleanPhone}" : "";

    // Build Modern HTML Email Template
    $phoneRow = '';
    if (!empty($clientPhone) && $clientPhone !== 'N/A') {
        $waButton = !empty($waLink) ? " <a href=\"{$waLink}\" style=\"display: inline-block; margin-left: 8px; background: #25D366; color: #ffffff; padding: 2px 8px; border-radius: 4px; text-decoration: none; font-size: 11px; font-weight: bold;\">WhatsApp 💬</a>" : "";
        $phoneRow = "<tr>
            <td style=\"padding: 6px 0; color: #38bdf8; font-weight: bold;\">📱 Phone:</td>
            <td style=\"padding: 6px 0; color: #ffffff;\"><a href=\"tel:{$clientPhone}\" style=\"color: #38bdf8; text-decoration: underline;\">{$clientPhone}</a>{$waButton}</td>
          </tr>";
    }

    $htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0b1329; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e2e8f0; }
    .email-container { max-width: 600px; margin: 30px auto; background: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 35px rgba(0,0,0,0.5); }
    .email-header { background: linear-gradient(135deg, #0070f3, #00dfd8); padding: 26px 24px; text-align: center; }
    .email-header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
    .email-header p { margin: 6px 0 0; color: rgba(255,255,255,0.9); font-size: 13px; }
    .email-body { padding: 28px 24px; }
    .info-card { background: #081126; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 12px; padding: 18px; margin-bottom: 22px; }
    .message-box { background: #081126; border-left: 4px solid #00dfd8; border-radius: 4px 12px 12px 4px; padding: 18px; margin-top: 15px; }
    .message-box h3 { margin: 0 0 10px; color: #38bdf8; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
    .message-content { color: #f1f5f9; font-size: 15px; line-height: 1.6; }
    .email-action { text-align: center; margin: 28px 0 10px; }
    .reply-btn { display: inline-block; background: linear-gradient(135deg, #0070f3, #00dfd8); color: #ffffff !important; padding: 12px 30px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(0, 112, 243, 0.4); }
    .email-footer { background: #081126; border-top: 1px solid #1e293b; padding: 16px 20px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>💬 New Portfolio Contact Inquiry</h1>
      <p>A new visitor has submitted a message via your personal portfolio website.</p>
    </div>
    <div class="email-body">
      <div class="info-card">
        <table style="width:100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #38bdf8; font-weight: bold; width: 100px;">👤 Name:</td>
            <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">{$clientName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #38bdf8; font-weight: bold;">📧 Email:</td>
            <td style="padding: 6px 0; color: #ffffff;"><a href="mailto:{$clientEmail}" style="color: #38bdf8; text-decoration: underline;">{$clientEmail}</a></td>
          </tr>
          {$phoneRow}
          <tr>
            <td style="padding: 6px 0; color: #38bdf8; font-weight: bold;">📌 Subject:</td>
            <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">{$clientSubject}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #38bdf8; font-weight: bold;">🕒 Date:</td>
            <td style="padding: 6px 0; color: #94a3b8;">{$submitTime}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #38bdf8; font-weight: bold;">🌐 IP:</td>
            <td style="padding: 6px 0; color: #94a3b8;">{$clientIp}</td>
          </tr>
        </table>
      </div>

      <div class="message-box">
        <h3>📝 Client Message:</h3>
        <div class="message-content">{$clientMessage}</div>
      </div>

      <div class="email-action">
        <a href="mailto:{$clientEmail}?subject=Re:%20{$clientSubject}" class="reply-btn">Direct Reply to {$clientName}</a>
      </div>
    </div>
    <div class="email-footer">
      This notification was automatically sent from Anas Abdiwahid Portfolio (<a href="https://anasabdiwahid.com" style="color: #64748b; text-decoration: none;">anasabdiwahid.com</a>).
    </div>
  </div>
</body>
</html>
HTML;

    // Connect via SSL Socket to Gmail SMTP
    $timeout = 25;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $socket = @stream_socket_client("ssl://{$smtpHost}:{$smtpPort}", $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        return ['success' => false, 'error' => "SMTP connection error: $errstr ($errno)"];
    }

    $read = function() use ($socket) {
        $data = '';
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === ' ') break;
        }
        return $data;
    };

    $write = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $read(); // greeting
    $write("EHLO " . gethostname());
    
    $write("AUTH LOGIN");
    $write(base64_encode($smtpUser));
    $authRes = $write(base64_encode($smtpPass));

    if (strpos($authRes, '235') === false) {
        fclose($socket);
        return ['success' => false, 'error' => "SMTP Authentication failed: $authRes"];
    }

    $write("MAIL FROM:<{$smtpUser}>");
    $rcptRes = $write("RCPT TO:<{$targetEmail}>");

    if (strpos($rcptRes, '250') === false) {
        fclose($socket);
        return ['success' => false, 'error' => "Recipient rejected: $rcptRes"];
    }

    $write("DATA");

    $subjectHeader = "New Message from Portfolio: " . $clientSubject;
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: =?UTF-8?B?" . base64_encode($senderName) . "?= <{$smtpUser}>\r\n";
    $headers .= "Reply-To: =?UTF-8?B?" . base64_encode($data['name'] ?? 'Client') . "?= <{$clientEmail}>\r\n";
    $headers .= "To: <{$targetEmail}>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subjectHeader) . "?=\r\n";
    $headers .= "Date: " . date('r') . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $sendData = $headers . "\r\n" . $htmlBody . "\r\n.";
    $finalRes = $write($sendData);

    $write("QUIT");
    fclose($socket);

    if (strpos($finalRes, '250') !== false) {
        return ['success' => true, 'response' => $finalRes];
    } else {
        return ['success' => false, 'error' => "Email send error: $finalRes"];
    }
}
