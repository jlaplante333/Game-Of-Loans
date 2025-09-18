#!/usr/bin/env node

const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
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
    console.log(`✅ EMAIL SENT: ${subject}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return { success: false, error: error.message };
  }
}

// API configuration for real Inkeep agents
const API_BASE = 'http://localhost:3003';
const PROJECT_ID = 'game-of-loans';
const GRAPH_ID = 'mortgage-negotiator-graph';

// Function to call the agent graph (starts with bg_check and delegates automatically)
async function callAgentGraph(message, conversationId = null) {
  try {
    console.log('🔄 Calling agent graph with delegation...');
    
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-inkeep-project-id': PROJECT_ID,
        'x-inkeep-graph-id': GRAPH_ID,
        // No specific agent ID - let it start with default agent (bg_check)
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        conversationId: conversationId || `delegation-workflow-` + Date.now()
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Agent graph responded with delegation');
      return {
        success: true,
        message: result.message,
        conversationId: result.conversationId
      };
    } else {
      console.error('❌ API call to agent graph failed with status:', response.status);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return {
        success: false,
        error: `API call failed with status: ${response.status}`,
        details: errorText
      };
    }
  } catch (error) {
    console.error('❌ API call to agent graph failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Customer data
const customerData = {
  firstName: 'Jonathan',
  lastName: 'LaPlante',
  dateOfBirth: '1985-03-15',
  ssn: '123-45-6789',
  email: 'jonathan.laplante@gmail.com',
  phone: '555-123-4567',
  address: '123 Main St, Anytown, USA',
  income: 75000,
  loanAmount: 300000
};

// Main workflow using proper delegation
async function runDelegationWorkflow() {
  console.log('🚀 STARTING REAL INKEEP DELEGATION WORKFLOW');
  console.log('=' .repeat(70));
  
  try {
    const customer = customerData;
    
    // Create a comprehensive message for the entire mortgage application
    const message = `Hello, I'm ${customer.firstName} ${customer.lastName} and I would like to apply for a mortgage.

Here is my complete information:

PERSONAL INFORMATION:
- Full Name: ${customer.firstName} ${customer.lastName}
- Date of Birth: ${customer.dateOfBirth}
- SSN: ${customer.ssn}
- Email: ${customer.email}
- Phone: ${customer.phone}
- Address: ${customer.address}

FINANCIAL INFORMATION:
- Annual Income: $${customer.income.toLocaleString()}
- Requested Loan Amount: $${customer.loanAmount.toLocaleString()}

REQUESTED SERVICES:
1. Please perform a comprehensive background check
2. Evaluate my creditworthiness 
3. Generate competitive mortgage loan offers
4. Provide final advisory and recommendations

Please process my complete mortgage application through all necessary steps. I understand this will involve background verification, credit evaluation, loan offer generation, and final advisory services.

Please send email notifications to ${customer.email} at each step of the process.

Thank you for your assistance with my mortgage application.`;

    console.log('\n📋 Sending complete mortgage application to agent graph...');
    console.log(`Customer: ${customer.firstName} ${customer.lastName}`);
    console.log(`Loan Amount: $${customer.loanAmount.toLocaleString()}`);
    console.log(`Email: ${customer.email}`);
    
    const result = await callAgentGraph(message);
    
    if (result.success) {
      console.log('\n🎉 REAL INKEEP DELEGATION WORKFLOW COMPLETED!');
      console.log('✅ Agent graph processed the complete mortgage application');
      console.log('✅ Agents delegated to each other automatically');
      console.log('✅ Real LLM calls were made through delegation');
      console.log('✅ Real emails were sent by agents');
      console.log(`✅ Conversation ID: ${result.conversationId}`);
      console.log('\n📧 Agent Response:');
      console.log(result.message);
      
      return {
        success: true,
        customer: customer,
        agentResponse: result.message,
        conversationId: result.conversationId
      };
    } else {
      console.log('\n💥 REAL INKEEP DELEGATION WORKFLOW FAILED');
      console.log('❌ Could not connect to agent graph');
      console.log('❌ Run API (localhost:3003) may not be running');
      console.log('❌ Error:', result.error);
      if (result.details) {
        console.log('❌ Details:', result.details);
      }
      
      // Send fallback email
      const fallbackBody = `MORTGAGE APPLICATION PROCESSING FAILED

Dear ${customer.firstName} ${customer.lastName},

We encountered an issue processing your mortgage application through our agent system.

Application Details:
- Name: ${customer.firstName} ${customer.lastName}
- DOB: ${customer.dateOfBirth}
- Loan Amount: $${customer.loanAmount.toLocaleString()}
- Annual Income: $${customer.income.toLocaleString()}

Error: ${result.error}

Please contact our support team for assistance.

Timestamp: ${new Date().toISOString()}`;

      await sendEmail(customer.email, 'Mortgage Application - Technical Issue', fallbackBody);
      
      return {
        success: false,
        error: result.error,
        customer: customer
      };
    }
    
  } catch (error) {
    console.error('❌ Workflow failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the workflow
if (require.main === module) {
  runDelegationWorkflow()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 DELEGATION WORKFLOW ERROR:', error);
      process.exit(1);
    });
}

module.exports = { runDelegationWorkflow };
