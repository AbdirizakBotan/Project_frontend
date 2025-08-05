# Email Setup Guide for Business Application System

This guide will help you set up the email functionality for sending approval and rejection notifications.

## Prerequisites

1. A Gmail account for sending emails
2. Gmail App Password (not your regular Gmail password)

## Step 1: Enable Gmail App Passwords

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to "Security" → "2-Step Verification" (enable if not already enabled)
3. Go to "Security" → "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password (this will be your SMTP_PASS)

## Step 2: Configure Environment Variables

1. Open the `.env` file in the root directory
2. Update the following variables with your Gmail credentials:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
FROM_EMAIL=your-email@gmail.com
```

Replace:
- `your-email@gmail.com` with your actual Gmail address
- `your-16-character-app-password` with the app password you generated

## Step 3: Start the Email Server

The email functionality requires a separate Node.js server to handle email sending.

### Option 1: Run locally
```bash
npm run email-server
```

### Option 2: Deploy the email server
You can deploy the `server/emailServer.js` file to any Node.js hosting service like:
- Heroku
- Vercel
- Railway
- DigitalOcean

## Step 4: Update Frontend Configuration

If you're running the email server on a different port or domain, update the email endpoint in `/src/pages/Pending.jsx`:

```javascript
// Change this line:
const emailResponse = await axios.post('https://project-backend-last.onrender.com/send-email', {

// To your email server URL:
const emailResponse = await axios.post('http://localhost:5000/send-email', {
```

## How It Works

1. **Approve Action**: 
   - Updates business status to "approved" in the database
   - Sends a congratulatory email with business certificate attachment
   - Shows success/warning toast message

2. **Reject Action**:
   - Updates business status to "rejected" in the database  
   - Sends a polite rejection email
   - Shows success/warning toast message

## Email Templates

### Approval Email Features:
- Professional HTML template with gradient header
- Business details summary
- Certificate attachment (PDF format)
- Congratulatory message
- Contact information for support

### Rejection Email Features:
- Professional HTML template
- Polite rejection message
- Business details for reference
- Encouragement to reapply
- Support contact information

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**:
   - Make sure you're using the App Password, not your regular Gmail password
   - Verify 2-Step Verification is enabled on your Google account

2. **"Connection refused" error**:
   - Check if the email server is running
   - Verify the correct port (default: 5000)

3. **CORS errors**:
   - The email server includes CORS middleware
   - Make sure you're making requests to the correct URL

4. **Email not received**:
   - Check spam/junk folder
   - Verify the recipient email exists in the business data
   - Check server logs for error messages

## Testing

1. Start the email server: `npm run email-server`
2. Start the main application: `npm run dev`
3. Go to the Pending page
4. Try approving or rejecting a business application
5. Check the recipient's email inbox

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for all sensitive data
- Consider using more secure email services for production
- Implement rate limiting for the email endpoint in production

## Production Deployment

For production deployment:

1. Deploy the email server separately from the React app
2. Use environment variables on your hosting platform
3. Update the email endpoint URL in the frontend
4. Consider using professional email services like SendGrid or AWS SES
5. Implement proper error handling and logging