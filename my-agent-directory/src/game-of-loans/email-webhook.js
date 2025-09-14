// Real email webhook using nodemailer with Ethereal (test email service)
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = 3004;

app.use(express.json());

// Create test account and transporter
let transporter = null;

async function createTransporter() {
  try {
    // Create a test account with Ethereal Email
    const testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
    console.log('✅ Email transporter created with test account:', testAccount.user);
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
  }
}

// Initialize transporter
createTransporter();

// Real email endpoint
app.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  
  console.log('=== SENDING REAL EMAIL ===');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log('==========================');
  
  try {
    // Send actual email
    const info = await transporter.sendMail({
      from: '"Game of Loans Agents" <gameofloansagents@gmail.com>',
      to: to,
      subject: subject,
      text: body,
      html: `<pre>${body}</pre>`
    });
    
    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Message ID:', info.messageId);
    
    res.json({ 
      success: true, 
      message: `Real email sent to ${to}`,
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ EMAIL FAILED:', error.message);
    
    // Fallback to console logging if email fails
    console.log('=== EMAIL NOTIFICATION (FALLBACK) ===');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    console.log('====================================');
    
    res.json({ 
      success: false, 
      message: `Email failed, logged to console: ${error.message}`,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(port, () => {
  console.log(`Real email webhook server running on http://localhost:${port}`);
});

export default app;
