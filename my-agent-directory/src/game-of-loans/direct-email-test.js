#!/usr/bin/env node

const nodemailer = require('nodemailer');

// Create a real email transporter using Gmail SMTP
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'jonathan.laplante@gmail.com',
    pass: 'rgylxwoifvgudant' // Your Gmail app password from MCP settings
  }
});

async function testEmail() {
  try {
    console.log('🔄 Testing direct email functionality...');
    
    // Send test email
    const info = await transporter.sendMail({
      from: '"Game of Loans Agents" <jonathan.laplante@gmail.com>',
      to: 'jonathan.laplante@gmail.com',
      subject: 'Direct Email Test - Game of Loans System',
      text: 'This is a direct email test to verify email functionality is working properly.',
      html: `
        <h2>Game of Loans Email Test</h2>
        <p>This is a direct email test to verify email functionality is working properly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Status:</strong> Email system operational ✅</p>
      `
    });

    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Message ID:', info.messageId);
    console.log('Timestamp:', new Date().toISOString());
    
    return true;
  } catch (error) {
    console.error('❌ EMAIL FAILED:', error.message);
    return false;
  }
}

// Run the test
testEmail().then(success => {
  if (success) {
    console.log('\n🎉 Email functionality is working! Ready for agent integration.');
  } else {
    console.log('\n💥 Email functionality failed. Check credentials and settings.');
  }
  process.exit(success ? 0 : 1);
});
