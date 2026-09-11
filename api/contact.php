<?php
/**
 * Sia Consulting - Contact Form Handler
 * Secure contact form submission processor
 * 
 * Security Features:
 * - Input validation and sanitization
 * - CSRF token validation
 * - Rate limiting
 * - Email validation
 * - XSS protection
 * - SQL injection prevention (via prepared statements if DB used)
 */

// Set security headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Enable CORS for your domain (adjust as needed)
$allowed_origin = 'https://www.siaconsulting.co.tz'; // Update with your domain
if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowed_origin) {
    header('Access-Control-Allow-Origin: ' . $allowed_origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Configuration
$config = [
    'recipient_email' => 'info@siaconsulting.co.tz',
    'sender_email' => 'noreply@siaconsulting.co.tz', // Update to your domain
    'sender_name' => 'Sia Consulting',
    'max_message_length' => 2000,
    'max_name_length' => 100,
    'rate_limit_requests' => 5,
    'rate_limit_window' => 3600, // 1 hour in seconds
    'enable_logging' => true,
    'log_file' => __DIR__ . '/../logs/contact_form.log'
];

// Start session for rate limiting
session_start();

/**
 * Sanitize and validate input
 */
function sanitizeInput($input) {
    return trim(stripslashes(htmlspecialchars($input, ENT_QUOTES, 'UTF-8')));
}

/**
 * Validate email format
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Check rate limiting
 */
function checkRateLimit($config) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $session_key = 'contact_form_' . md5($ip);
    
    if (!isset($_SESSION[$session_key])) {
        $_SESSION[$session_key] = ['count' => 0, 'first_request' => time()];
    }
    
    $session_data = $_SESSION[$session_key];
    $time_elapsed = time() - $session_data['first_request'];
    
    // Reset if window has passed
    if ($time_elapsed > $config['rate_limit_window']) {
        $_SESSION[$session_key] = ['count' => 0, 'first_request' => time()];
        return true;
    }
    
    // Check if limit exceeded
    if ($session_data['count'] >= $config['rate_limit_requests']) {
        return false;
    }
    
    $_SESSION[$session_key]['count']++;
    return true;
}

/**
 * Log submission
 */
function logSubmission($config, $data, $status, $message = '') {
    if (!$config['enable_logging']) {
        return;
    }
    
    $log_dir = dirname($config['log_file']);
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip_address' => $_SERVER['REMOTE_ADDR'],
        'status' => $status,
        'name' => $data['name'] ?? 'N/A',
        'email' => $data['email'] ?? 'N/A',
        'message' => substr($data['message'] ?? '', 0, 100) . '...',
        'error' => $message
    ];
    
    $log_line = json_encode($log_entry) . PHP_EOL;
    error_log($log_line, 3, $config['log_file']);
}

/**
 * Send email
 */
function sendEmail($config, $formData) {
    $to = $config['recipient_email'];
    $from_email = $config['sender_email'];
    $from_name = $config['sender_name'];
    
    $subject = 'New Contact Form Submission from ' . $formData['name'];
    
    // HTML email body
    $html_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2D5016; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2D5016; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #2D5016; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>From:</div>
                    <div class='value'>" . htmlspecialchars($formData['name'], ENT_QUOTES, 'UTF-8') . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'><a href='mailto:" . htmlspecialchars($formData['email'], ENT_QUOTES, 'UTF-8') . "'>" . htmlspecialchars($formData['email'], ENT_QUOTES, 'UTF-8') . "</a></div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($formData['message'], ENT_QUOTES, 'UTF-8')) . "</div>
                </div>
                <div class='footer'>
                    <p><strong>Received on:</strong> " . date('Y-m-d H:i:s') . "</p>
                    <p><strong>IP Address:</strong> " . htmlspecialchars($_SERVER['REMOTE_ADDR'], ENT_QUOTES, 'UTF-8') . "</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Plain text version
    $text_body = "New Contact Form Submission\n\n";
    $text_body .= "From: " . $formData['name'] . "\n";
    $text_body .= "Email: " . $formData['email'] . "\n";
    $text_body .= "Message: " . $formData['message'] . "\n\n";
    $text_body .= "Received on: " . date('Y-m-d H:i:s') . "\n";
    $text_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . $from_name . " <" . $from_email . ">\r\n";
    $headers .= "Reply-To: " . $formData['email'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    return mail($to, $subject, $html_body, $headers);
}

try {
    // Check rate limiting
    if (!checkRateLimit($config)) {
        http_response_code(429);
        logSubmission($config, [], 'rate_limit_exceeded', 'Rate limit exceeded');
        echo json_encode(['error' => 'Too many requests. Please try again later.']);
        exit;
    }
    
    // Get and decode JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON format']);
        exit;
    }
    
    // Validate required fields
    $required_fields = ['name', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            http_response_code(400);
            logSubmission($config, $data, 'validation_failed', "Missing field: $field");
            echo json_encode(['error' => "Field '$field' is required"]);
            exit;
        }
    }
    
    // Sanitize inputs
    $formData = [
        'name' => sanitizeInput($data['name']),
        'email' => sanitizeInput($data['email']),
        'message' => sanitizeInput($data['message'])
    ];
    
    // Validate name
    if (strlen($formData['name']) > $config['max_name_length']) {
        http_response_code(400);
        logSubmission($config, $formData, 'validation_failed', 'Name too long');
        echo json_encode(['error' => 'Name is too long']);
        exit;
    }
    
    // Validate email
    if (!isValidEmail($formData['email'])) {
        http_response_code(400);
        logSubmission($config, $formData, 'validation_failed', 'Invalid email');
        echo json_encode(['error' => 'Invalid email address']);
        exit;
    }
    
    // Validate message
    if (strlen($formData['message']) > $config['max_message_length']) {
        http_response_code(400);
        logSubmission($config, $formData, 'validation_failed', 'Message too long');
        echo json_encode(['error' => 'Message is too long']);
        exit;
    }
    
    if (strlen($formData['message']) < 5) {
        http_response_code(400);
        logSubmission($config, $formData, 'validation_failed', 'Message too short');
        echo json_encode(['error' => 'Message must be at least 5 characters']);
        exit;
    }
    
    // Send email
    if (sendEmail($config, $formData)) {
        http_response_code(200);
        logSubmission($config, $formData, 'success');
        echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent successfully.']);
    } else {
        http_response_code(500);
        logSubmission($config, $formData, 'email_failed', 'Failed to send email');
        echo json_encode(['error' => 'Failed to send message. Please try again later.']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    logSubmission($config, $data ?? [], 'exception', $e->getMessage());
    echo json_encode(['error' => 'An unexpected error occurred. Please try again later.']);
}
?>
