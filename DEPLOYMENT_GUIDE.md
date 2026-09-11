# Sia Consulting Contact Form Backend - Deployment Guide

## Overview
This guide walks you through deploying the contact form backend to your cPanel hosting.

## Files Included
- `api/contact.php` - Main contact form handler
- `api/.htaccess` - Security configuration for Apache

## Pre-Deployment Checklist

### 1. **Configuration Updates**
Edit `api/contact.php` and update these lines (around lines 33-40):

```php
$allowed_origin = 'https://www.siaconsulting.co.tz'; // Your domain
$config = [
    'recipient_email' => 'info@siaconsulting.co.tz', // Your email
    'sender_email' => 'noreply@siaconsulting.co.tz', // Update to your domain
    'sender_name' => 'Sia Consulting',
    // ... other settings
];
```

**Important:** Ensure `sender_email` uses your domain (e.g., `noreply@siaconsulting.co.tz`) to avoid emails being marked as spam.

### 2. **cPanel Deployment Steps**

#### Step 1: Upload Files
1. Log in to your cPanel
2. Open File Manager
3. Navigate to your public_html directory (or subdirectory where your site is hosted)
4. Create a folder named `api` if it doesn't exist
5. Upload both files:
   - `contact.php`
   - `.htaccess`

#### Step 2: Set Permissions
1. Right-click `contact.php` → Change Permissions
2. Set to **644** (read/write for owner, read for others)
3. Ensure the `api` folder has **755** permissions

#### Step 3: Create Logs Directory
1. In cPanel File Manager, create a folder named `logs` in your public_html parent directory (or any location outside public_html)
2. Set permissions to **755**
3. Update the `log_file` path in `contact.php` if you change the location:
   ```php
   'log_file' => __DIR__ . '/../logs/contact_form.log'
   ```

#### Step 4: Verify Email Configuration
1. In cPanel, go to **Email Accounts**
2. Ensure you have an email account or forwarder for `noreply@siaconsulting.co.tz`
3. Test by sending a test message through your contact form

### 3. **Frontend Integration**

The React Contact component has been updated to send data to `/api/contact.php`. The form will:
- Show a loading state while sending
- Display success message for 5 seconds
- Show error messages if submission fails
- Include client-side validation

## Security Features Implemented

✅ **Input Validation**
- Email format validation
- Length limits (name: 100 chars, message: 2000 chars)
- Required field validation

✅ **Sanitization**
- HTML entity encoding to prevent XSS
- Input trimming and escaping
- htmlspecialchars() for all user inputs

✅ **Rate Limiting**
- Maximum 5 submissions per IP per hour
- Prevents form spam/abuse

✅ **Email Security**
- Reply-To header set to user's email
- Proper From header with domain
- HTML and plain text versions
- Safe header injection prevention

✅ **HTTP Security**
- CORS validation against allowed origin
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- 405 Method Not Allowed for non-POST requests
- Proper HTTP status codes

✅ **Server Security**
- .htaccess protections
- Directory listing disabled
- Sensitive files protected

## Troubleshooting

### Emails Not Sending
1. Check sender email is from your domain
2. Go to cPanel → Email Accounts → Forwarders
3. Create forwarder: `noreply@siaconsulting.co.tz` → `info@siaconsulting.co.tz`
4. Check spam folder
5. Enable cPanel mail logs if available

### Form Returns 500 Error
1. Check PHP error logs in cPanel
2. Verify `logs` folder exists and has write permissions (755)
3. Ensure PHP version supports the code (PHP 7.4+)

### CORS Errors in Browser Console
1. Verify `$allowed_origin` in contact.php matches your domain exactly
2. Include protocol: `https://` not just domain name
3. Check for trailing slashes

### Rate Limiting Not Working
1. Ensure sessions are enabled on your server
2. Check server time is correct
3. Users may need to clear cookies to reset

## Testing

1. **Local Testing**: Run your development server and test the form
2. **Staging Test**: Deploy to cPanel and test with real email
3. **Browser Console**: Check for any JavaScript errors
4. **Email Headers**: Verify emails appear legitimate in inbox

## Monitoring

Check your logs regularly:
1. FTP into your server
2. Navigate to `/logs/contact_form.log`
3. Review entries for errors or suspicious activity

Log entries include:
- Timestamp
- IP address
- Status (success, validation_failed, rate_limit_exceeded, etc.)
- Submitter name/email
- Error message if applicable

## Production Checklist

- [ ] Updated `$allowed_origin` to your domain
- [ ] Updated sender email address
- [ ] Created `logs` folder with proper permissions
- [ ] Tested form submission with real email
- [ ] Verified emails arrive in inbox
- [ ] Checked for emails in spam folder
- [ ] Tested rate limiting by submitting multiple times
- [ ] Verified error handling with invalid inputs
- [ ] Confirmed CORS headers work correctly
- [ ] Set up email account/forwarder for sender

## Support Notes

- **PHP Version**: Requires PHP 7.4 or higher
- **Email**: Uses `mail()` function (enabled by default on cPanel)
- **Sessions**: Uses `$_SESSION` for rate limiting
- **Database**: No database required - stateless design

## Advanced: Custom Email Template

To customize the email template, edit the `sendEmail()` function in `contact.php` around line 135.

## Security Best Practices

1. Never commit sensitive config to version control
2. Keep PHP updated
3. Monitor logs for unusual activity
4. Use HTTPS only
5. Consider adding a CAPTCHA for additional protection
6. Regularly review access logs

---

For issues or questions, refer to the inline code comments in `contact.php`.
