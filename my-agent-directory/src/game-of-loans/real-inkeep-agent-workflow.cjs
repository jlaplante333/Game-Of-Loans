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

// Function to call specific Inkeep agent
async function callSpecificInkeepAgent(agentId, message, conversationId = null) {
  try {
    console.log(`🔄 Calling real Inkeep agent: ${agentId}...`);
    
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-inkeep-project-id': PROJECT_ID,
        'x-inkeep-graph-id': GRAPH_ID,
        'x-inkeep-agent-id': agentId, // Specify which agent to invoke
      },
      body: JSON.stringify({
        message: message,
        conversationId: conversationId || `${agentId}-workflow-` + Date.now()
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Real Inkeep agent ${agentId} responded`);
      return {
        success: true,
        message: result.message,
        conversationId: result.conversationId,
        agentId: agentId
      };
    } else {
      console.error(`❌ API call to ${agentId} failed with status:`, response.status);
      return {
        success: false,
        error: `API call to ${agentId} failed with status: ${response.status}`,
        agentId: agentId
      };
    }
  } catch (error) {
    console.error(`❌ API call to ${agentId} failed:`, error);
    return {
      success: false,
      error: error.message,
      agentId: agentId
    };
  }
}

// Customer data that flows through all agents
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

// Individual agent functions that call real Inkeep agents
async function backgroundCheckAgent(customer) {
  console.log('\n🔍 CALLING REAL BACKGROUND CHECK AGENT...');
  console.log(`Processing: ${customer.firstName} ${customer.lastName}`);
  console.log(`DOB: ${customer.dateOfBirth}, SSN: ${customer.ssn}`);
  
  const message = `Please perform a background check for ${customer.firstName} ${customer.lastName}.

Customer Information:
- Name: ${customer.firstName} ${customer.lastName}
- Date of Birth: ${customer.dateOfBirth}
- SSN: ${customer.ssn}
- Email: ${customer.email}
- Phone: ${customer.phone}
- Address: ${customer.address}

Please conduct a comprehensive background check and send an email notification to ${customer.email} with the results.`;

  const result = await callSpecificInkeepAgent('bg_check', message);
  
  if (result.success) {
    console.log('✅ Real background check agent completed');
    return { ...customer, backgroundCheck: { status: 'COMPLETED', agentResponse: result.message } };
  } else {
    console.log('❌ Real background check agent failed, using fallback');
    // Fallback to simulated result
    const backgroundResult = {
      status: 'CLEAR',
      riskLevel: 'LOW',
      employment: 'VERIFIED',
      criminalHistory: 'NONE',
      creditHistory: 'GOOD'
    };
    
    const emailBody = `BACKGROUND CHECK COMPLETED (Fallback Mode)

Customer: ${customer.firstName} ${customer.lastName}
DOB: ${customer.dateOfBirth}
SSN: ${customer.ssn}

RESULTS:
- Status: ${backgroundResult.status}
- Risk Level: ${backgroundResult.riskLevel}
- Employment: ${backgroundResult.employment}
- Criminal History: ${backgroundResult.criminalHistory}
- Credit History: ${backgroundResult.creditHistory}

Note: Real Inkeep agent was unavailable, using fallback processing.

Next Step: Forwarding to Credit Evaluation Agent

Timestamp: ${new Date().toISOString()}`;

    await sendEmail(customer.email, 'Background Check Completed (Fallback)', emailBody);
    return { ...customer, backgroundCheck: backgroundResult };
  }
}

async function creditEvaluationAgent(customer) {
  console.log('\n💳 CALLING REAL CREDIT EVALUATION AGENT...');
  console.log(`Processing: ${customer.firstName} ${customer.lastName}`);
  console.log(`Previous Background: ${customer.backgroundCheck.status}`);
  
  const message = `Please perform a credit evaluation for ${customer.firstName} ${customer.lastName}.

Customer Information:
- Name: ${customer.firstName} ${customer.lastName}
- Date of Birth: ${customer.dateOfBirth}
- SSN: ${customer.ssn}
- Email: ${customer.email}
- Annual Income: $${customer.income.toLocaleString()}
- Requested Loan Amount: $${customer.loanAmount.toLocaleString()}

Background Check Results: ${JSON.stringify(customer.backgroundCheck)}

Please conduct a comprehensive credit evaluation and send an email notification to ${customer.email} with the results.`;

  const result = await callSpecificInkeepAgent('credit_eval', message);
  
  if (result.success) {
    console.log('✅ Real credit evaluation agent completed');
    return { ...customer, creditEvaluation: { status: 'COMPLETED', agentResponse: result.message } };
  } else {
    console.log('❌ Real credit evaluation agent failed, using fallback');
    // Fallback to simulated result
    const creditResult = {
      score: 726,
      rating: 'GOOD',
      utilization: '6%',
      debtToIncome: '28%',
      approved: true
    };
    
    const emailBody = `CREDIT EVALUATION COMPLETED (Fallback Mode)

Customer: ${customer.firstName} ${customer.lastName}
DOB: ${customer.dateOfBirth}
SSN: ${customer.ssn}

CREDIT RESULTS:
- FICO Score: ${creditResult.score}
- Rating: ${creditResult.rating}
- Credit Utilization: ${creditResult.utilization}
- Debt-to-Income: ${creditResult.debtToIncome}
- Status: ${creditResult.approved ? 'APPROVED' : 'REJECTED'}

Note: Real Inkeep agent was unavailable, using fallback processing.

Next Step: Generating Loan Offers

Timestamp: ${new Date().toISOString()}`;

    await sendEmail(customer.email, 'Credit Evaluation Completed (Fallback)', emailBody);
    return { ...customer, creditEvaluation: creditResult };
  }
}

async function offerGenerationAgent(customer) {
  console.log('\n💰 CALLING REAL OFFER GENERATION AGENT...');
  console.log(`Processing: ${customer.firstName} ${customer.lastName}`);
  console.log(`Credit Score: ${customer.creditEvaluation.score || 'N/A'}`);
  
  const message = `Please generate loan offers for ${customer.firstName} ${customer.lastName}.

Customer Information:
- Name: ${customer.firstName} ${customer.lastName}
- Date of Birth: ${customer.dateOfBirth}
- SSN: ${customer.ssn}
- Email: ${customer.email}
- Annual Income: $${customer.income.toLocaleString()}
- Requested Loan Amount: $${customer.loanAmount.toLocaleString()}

Background Check Results: ${JSON.stringify(customer.backgroundCheck)}
Credit Evaluation Results: ${JSON.stringify(customer.creditEvaluation)}

Please generate competitive loan offers and send an email notification to ${customer.email} with the offer details.`;

  const result = await callSpecificInkeepAgent('offer_gen', message);
  
  if (result.success) {
    console.log('✅ Real offer generation agent completed');
    return { ...customer, offers: { status: 'COMPLETED', agentResponse: result.message } };
  } else {
    console.log('❌ Real offer generation agent failed, using fallback');
    // Fallback to simulated result
    const offers = [
      {
        type: 'Standard',
        rate: '6.75%',
        term: '30 years',
        monthlyPayment: '$1,945',
        fees: '$2,500'
      },
      {
        type: 'Premium',
        rate: '6.25%',
        term: '30 years',
        monthlyPayment: '$1,847',
        fees: '$3,500'
      }
    ];
    
    const emailBody = `LOAN OFFERS GENERATED (Fallback Mode)

Customer: ${customer.firstName} ${customer.lastName}
Loan Amount: $${customer.loanAmount.toLocaleString()}

AVAILABLE OFFERS:

STANDARD OFFER:
- Rate: ${offers[0].rate}
- Term: ${offers[0].term}
- Monthly Payment: ${offers[0].monthlyPayment}
- Closing Fees: ${offers[0].fees}

PREMIUM OFFER:
- Rate: ${offers[1].rate}
- Term: ${offers[1].term}
- Monthly Payment: ${offers[1].monthlyPayment}
- Closing Fees: ${offers[1].fees}

Note: Real Inkeep agent was unavailable, using fallback processing.

Next Step: Negotiation Process Available

Timestamp: ${new Date().toISOString()}`;

    await sendEmail(customer.email, 'Loan Offers Generated (Fallback)', emailBody);
    return { ...customer, offers: offers };
  }
}

async function finalAdvisoryAgent(customer) {
  console.log('\n📋 CALLING REAL FINANCIAL ADVISOR AGENT...');
  console.log(`Customer: ${customer.firstName} ${customer.lastName}`);
  
  const message = `Please provide final advisory for ${customer.firstName} ${customer.lastName}.

Customer Information:
- Name: ${customer.firstName} ${customer.lastName}
- Date of Birth: ${customer.dateOfBirth}
- SSN: ${customer.ssn}
- Email: ${customer.email}
- Annual Income: $${customer.income.toLocaleString()}
- Requested Loan Amount: $${customer.loanAmount.toLocaleString()}

Processing Results:
- Background Check: ${JSON.stringify(customer.backgroundCheck)}
- Credit Evaluation: ${JSON.stringify(customer.creditEvaluation)}
- Loan Offers: ${JSON.stringify(customer.offers)}

Please provide final advisory and recommendations, and send an email notification to ${customer.email} with the complete summary.`;

  const result = await callSpecificInkeepAgent('advisor', message);
  
  if (result.success) {
    console.log('✅ Real financial advisor agent completed');
    return { ...customer, finalAdvice: { status: 'COMPLETED', agentResponse: result.message } };
  } else {
    console.log('❌ Real financial advisor agent failed, using fallback');
    // Fallback to simulated result
    const emailBody = `FINAL ADVISORY COMPLETED (Fallback Mode)

Dear ${customer.firstName} ${customer.lastName},

CONGRATULATIONS! Your mortgage application has been processed.

CUSTOMER INFORMATION:
- Name: ${customer.firstName} ${customer.lastName}
- DOB: ${customer.dateOfBirth}
- SSN: ${customer.ssn}
- Loan Amount: $${customer.loanAmount.toLocaleString()}

PROCESSING SUMMARY:
- Background Check: ${customer.backgroundCheck.status || 'COMPLETED'}
- Credit Evaluation: ${customer.creditEvaluation.approved ? 'APPROVED' : 'PENDING'}
- Loan Offers: Generated

Note: Real Inkeep agent was unavailable, using fallback processing.

NEXT STEPS:
1. Review and sign loan documents
2. Schedule closing appointment
3. Prepare for home inspection
4. Finalize insurance arrangements

Timestamp: ${new Date().toISOString()}`;

    await sendEmail(customer.email, 'Final Advisory Completed (Fallback)', emailBody);
    return { ...customer, status: 'APPROVED', finalAdvice: 'PROVIDED' };
  }
}

// Main workflow using individual REAL Inkeep agents
async function runRealInkeepWorkflow() {
  console.log('🚀 STARTING REAL INKEEP INDIVIDUAL AGENT WORKFLOW');
  console.log('=' .repeat(70));
  
  try {
    let processedCustomer = customerData;
    
    // Call each real Inkeep agent individually
    processedCustomer = await backgroundCheckAgent(processedCustomer);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    processedCustomer = await creditEvaluationAgent(processedCustomer);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    processedCustomer = await offerGenerationAgent(processedCustomer);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    processedCustomer = await finalAdvisoryAgent(processedCustomer);
    
    console.log('\n🎉 REAL INKEEP INDIVIDUAL AGENT WORKFLOW FINISHED!');
    console.log('✅ All individual agents called');
    console.log('✅ Customer data flowed through all agents');
    console.log('✅ Real LLM calls made (where agents were available)');
    console.log('✅ Fallback processing used when agents unavailable');
    
    return processedCustomer;
    
  } catch (error) {
    console.error('❌ Workflow failed:', error);
    throw error;
  }
}

// Run the workflow
if (require.main === module) {
  runRealInkeepWorkflow()
    .then(result => {
      if (result.success) {
        console.log('\n🎉 REAL INKEEP AGENT WORKFLOW COMPLETED SUCCESSFULLY!');
        console.log('✅ Real agents processed the mortgage application');
        console.log('✅ Real LLM calls were made');
        console.log('✅ Real emails were sent by agents');
        console.log('✅ Customer data flowed through real agent graph');
        console.log(`✅ Conversation ID: ${result.conversationId}`);
      } else {
        console.log('\n💥 REAL INKEEP AGENT WORKFLOW FAILED');
        console.log('❌ Could not connect to real agents');
        console.log('❌ Run API (localhost:3003) may not be running');
        console.log('❌ Use dynamic-agent-workflow.cjs for simulated version');
      }
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 REAL INKEEP WORKFLOW ERROR:', error);
      process.exit(1);
    });
}

module.exports = { runRealInkeepWorkflow };
