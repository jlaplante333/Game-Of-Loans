const nodemailer = require('nodemailer');

// Create a real email transporter using Gmail SMTP
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'jonathan.laplante@gmail.com',
    pass: 'rgylxwoifvgudant'
  }
});

async function sendEmail(to, subject, body) {
  try {
    const info = await transporter.sendMail({
      from: '"Game of Loans Agents" <jonathan.laplante@gmail.com>',
      to: to,
      subject: subject,
      text: body,
      html: `<pre>${body}</pre>`
    });

    console.log(`✅ EMAIL SENT to ${to}!`);
    console.log(`Subject: ${subject}`);
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    
    return {
      success: true,
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { sendEmail };
