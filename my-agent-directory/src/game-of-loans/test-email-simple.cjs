#!/usr/bin/env node

const { sendEmail } = require('./email-utils.js');

async function testEmailFunctionality() {
  console.log('🔄 Testing email functionality...');
  
  const result = await sendEmail(
    'jonathan.laplante@gmail.com',
    'Email Test - Game of Loans System Working',
    `Email test completed successfully!
    
Timestamp: ${new Date().toISOString()}
Status: Email system operational ✅

This confirms that the email functionality is working and ready for agent integration.`
  );
  
  if (result.success) {
    console.log('\n🎉 EMAIL FUNCTIONALITY CONFIRMED WORKING!');
    console.log('Ready to integrate with agents for background checks and credit checks.');
  } else {
    console.log('\n💥 Email test failed:', result.error);
  }
  
  return result.success;
}

testEmailFunctionality().then(success => {
  process.exit(success ? 0 : 1);
});
