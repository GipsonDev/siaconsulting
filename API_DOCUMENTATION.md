# Contact Form API Documentation

## Endpoint
```
POST /api/contact.php
```

## Request Format

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

## Response Format

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully."
}
```

### Validation Error (400 Bad Request)
```json
{
  "error": "Field 'name' is required"
}
```

### Rate Limited (429 Too Many Requests)
```json
{
  "error": "Too many requests. Please try again later."
}
```

### Server Error (500 Internal Server Error)
```json
{
  "error": "An unexpected error occurred. Please try again later."
}
```

## Validation Rules

| Field | Type | Min Length | Max Length | Required | Format |
|-------|------|-----------|-----------|----------|--------|
| name | string | 1 | 100 | Yes | Text |
| email | string | 5 | 254 | Yes | Valid email |
| message | string | 5 | 2000 | Yes | Text |

## Rate Limiting

- **Limit:** 5 submissions per IP address
- **Window:** 1 hour
- **Response Code:** 429 Too Many Requests

## Security Features

### Input Validation
- All fields are required
- Email format is validated
- Inputs are trimmed and sanitized
- XSS protection via HTML entity encoding

### CORS
- Only allows requests from configured origin
- Preflight requests (OPTIONS) are handled

### Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## Example Requests

### cURL
```bash
curl -X POST https://www.siaconsulting.co.tz/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I am interested in your services."
  }'
```

### JavaScript/Fetch
```javascript
const formData = {
  name: "John Doe",
  email: "john@example.com",
  message: "I am interested in your services."
};

fetch('/api/contact.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Message sent successfully');
  } else {
    console.error('Error:', data.error);
  }
})
.catch(error => console.error('Request failed:', error));
```

### Python Requests
```python
import requests
import json

url = "https://www.siaconsulting.co.tz/api/contact.php"
headers = {"Content-Type": "application/json"}
data = {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I am interested in your services."
}

response = requests.post(url, json=data, headers=headers)
result = response.json()

if response.status_code == 200:
    print("Message sent successfully")
else:
    print(f"Error: {result.get('error')}")
```

## Logging

All submissions are logged to `../logs/contact_form.log` with the following information:
- Timestamp
- IP Address
- Status (success, validation_failed, rate_limit_exceeded, email_failed, exception)
- Submitter name and email
- First 100 characters of message
- Error message if applicable

## Email Details

### Email Sent To
- Recipient: `info@siaconsulting.co.tz`
- From: `Sia Consulting <noreply@siaconsulting.co.tz>`
- Reply-To: User's email address

### Email Format
- HTML version with branded styling
- Plain text version for compatibility
- Includes submission timestamp and IP address

## Testing Checklist

- [ ] Send valid submission
- [ ] Verify email arrives
- [ ] Test with invalid email
- [ ] Test with empty fields
- [ ] Test with message > 2000 chars
- [ ] Test rate limiting (5+ submissions)
- [ ] Verify error messages display
- [ ] Check CORS headers (if using different domain)
- [ ] Verify logging works

## Troubleshooting

### No response from server
- Check PHP is enabled on server
- Verify file permissions (644 for PHP file)
- Check server error logs

### Email not arriving
- Verify sender email is from correct domain
- Check spam/junk folder
- Verify email account exists on server
- Check mail logs in cPanel

### CORS errors
- Ensure request is from allowed origin
- Check origin URL matches exactly (protocol, domain, port)
- Verify .htaccess is properly configured

### Rate limiting issues
- Check PHP sessions are enabled
- Clear browser cookies to reset IP tracking
- Verify server time is correct
