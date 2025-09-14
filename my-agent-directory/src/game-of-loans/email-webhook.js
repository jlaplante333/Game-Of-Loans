// Simple email webhook for testing email notifications
// This would normally connect to a real email service like SendGrid, Mailgun, etc.

const express = require('express');
const app = express();
const port = 3004;

app.use(express.json());

// Mock email endpoint for testing
app.post('/send-email', (req, res) => {
  const { to, subject, body } = req.body;
  
  console.log('=== EMAIL NOTIFICATION ===');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  console.log('========================');
  
  // In a real implementation, this would send actual emails
  // For now, we'll just log and return success
  res.json({ 
    success: true, 
    message: `Email sent to ${to}`,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Email webhook server running on http://localhost:${port}`);
});

module.exports = app;
