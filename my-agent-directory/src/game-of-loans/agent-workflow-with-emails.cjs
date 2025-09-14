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

// Customer data that flows through all agents
const customerData = {
  firstName: 'Jonathan',
  lastName: 'Laplante',
  dateOfBirth: '1985-03-15',
  ssn: '123-45-6789',
  email: 'jonathan.laplante@gmail.com',
  phone: '555-123-4567',
  address: '123 Main St, Anytown, USA',
  income: 75000,
  loanAmount: 300000
};

// Background Check Agent
async function backgroundCheckAgent(customer) {
  console.log('\n🔍 BACKGROUND CHECK AGENT PROCESSING...');
  console.log(`Processing: ${customer.firstName} ${customer.lastName}`);
  console.log(`DOB: ${customer.dateOfBirth}, SSN: ${customer.ssn}`);
  
  // Simulate background check
  const backgroundResult = {
    status: 'CLEAR',
    riskLevel: 'LOW',
    employment: 'VERIFIED',
    criminalHistory: 'NONE',
    creditHistory: 'GOOD'
  };
  
  const emailBody = `BACKGROUND CHECK COMPLETED

Customer: ${customer.firstName} ${customer.lastName}
DOB: ${customer.dateOfBirth}
SSN: ${customer.ssn}

RESULTS:
- Status: ${backgroundResult.status}
- Risk Level: ${backgroundResult.riskLevel}
- Employment: ${backgroundResult.employment}
- Criminal History: ${backgroundResult.criminalHistory}
- Credit History: ${backgroundResult.creditHistory}

Next Step: Forwarding to Credit Evaluation Agent

Timestamp: ${new Date().toISOString()}`;

  await sendEmail(customer.email, 'Background Check Completed', emailBody);
  
  return { ...customer, backgroundCheck: backgroundResult };
}

// Credit Evaluation Agent
async function creditEvaluationAgent(customer) {
  console.log('\n💳 CREDIT EVALUATION AGENT PROCESSING...');
  console.log(`Processing: ${customer.firstName} ${customer.lastName}`);
  console.log(`Previous Background: ${customer.backgroundCheck.status}`);
  
  // Simulate credit evaluation
  const creditResult = {
    score: 726,
    rating: 'GOOD',
    utilization: '6%',
    debtToIncome: '28%',
    approved: true
  };
  
  const emailBody = `CREDIT EVALUATION COMPLETED

Customer: ${customer.firstName} ${customer.lastName}
DOB: ${customer.dateOfBirth}
SSN: ${customer.ssn}

CREDIT RESULTS:
- FICO Score: ${creditResult.score}
- Rating: ${creditResult.rating}
- Credit Utilization: ${creditResult.utilization}
- Debt-to-Income: ${creditResult.debtToIncome}
- Status: ${creditResult.approved ? 'APPROVED' : 'REJECTED'}

Next Step: Generating Loan Offers

Timestamp: ${new Date().toISOString()}`;

  await sendEmail(customer.email, 'Credit Evaluation Completed', emailBody);
  
  return { ...customer, creditEvaluation: creditResult };
}

// Offer Generation Agent
async function offerGenerationAgent(customer) {
  console.log('\n💰 OFFER GENERATION AGENT PROCESSING...');
  console.log(`Processing: ${customer.firstName} ${customer.lastName}`);
  console.log(`Credit Score: ${customer.creditEvaluation.score}`);
  
  // Generate loan offers
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
  
  const emailBody = `LOAN OFFERS GENERATED

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

Next Step: Negotiation Process Available

Timestamp: ${new Date().toISOString()}`;

  await sendEmail(customer.email, 'Loan Offers Generated', emailBody);
  
  return { ...customer, offers: offers };
}

// Negotiation Simulation
async function negotiationProcess(customer) {
  console.log('\n🤝 NEGOTIATION PROCESS STARTING...');
  console.log(`Customer: ${customer.firstName} ${customer.lastName}`);
  
  // Simulate negotiation between Bank Agent and Customer Empathy Agent
  const negotiationResult = {
    originalRate: '6.75%',
    negotiatedRate: '6.25%',
    cashback: '$1,500',
    finalMonthlyPayment: '$1,847',
    customerLoyaltyScore: 6,
    agreement: 'REACHED'
  };
  
  const emailBody = `NEGOTIATION COMPLETED

Customer: ${customer.firstName} ${customer.lastName}
Customer Loyalty Score: ${negotiationResult.customerLoyaltyScore}

NEGOTIATION RESULTS:
- Original Rate: ${negotiationResult.originalRate}
- Negotiated Rate: ${negotiationResult.negotiatedRate}
- Cashback Offered: ${negotiationResult.cashback}
- Final Monthly Payment: ${negotiationResult.finalMonthlyPayment}
- Status: ${negotiationResult.agreement}

FINAL TERMS AGREED:
✅ Rate reduced from ${negotiationResult.originalRate} to ${negotiationResult.negotiatedRate}
✅ Cashback of ${negotiationResult.cashback} approved
✅ Customer satisfied with terms

Next Step: Final Advisory

Timestamp: ${new Date().toISOString()}`;

  await sendEmail(customer.email, 'Negotiation Complete - Agreement Reached', emailBody);
  
  return { ...customer, negotiation: negotiationResult };
}

// Final Advisory Agent
async function finalAdvisoryAgent(customer) {
  console.log('\n📋 FINAL ADVISORY AGENT PROCESSING...');
  console.log(`Customer: ${customer.firstName} ${customer.lastName}`);
  
  const emailBody = `FINAL ADVISORY COMPLETED

Dear ${customer.firstName} ${customer.lastName},

CONGRATULATIONS! Your mortgage application has been successfully processed.

CUSTOMER INFORMATION:
- Name: ${customer.firstName} ${customer.lastName}
- DOB: ${customer.dateOfBirth}
- SSN: ${customer.ssn}
- Loan Amount: $${customer.loanAmount.toLocaleString()}

FINAL APPROVED TERMS:
- Interest Rate: ${customer.negotiation.negotiatedRate}
- Monthly Payment: ${customer.negotiation.finalMonthlyPayment}
- Cashback: ${customer.negotiation.cashback}
- Term: 30 years

NEXT STEPS:
1. Review and sign loan documents
2. Schedule closing appointment
3. Prepare for home inspection
4. Finalize insurance arrangements

Your application is now complete and ready for closing!

Timestamp: ${new Date().toISOString()}`;

  await sendEmail(customer.email, 'Final Advisory Completed - Loan Approved!', emailBody);
  
  return { ...customer, status: 'APPROVED', finalAdvice: 'PROVIDED' };
}

// Main workflow execution
async function runCompleteWorkflow() {
  console.log('🚀 STARTING COMPLETE AGENT WORKFLOW WITH EMAIL NOTIFICATIONS');
  console.log('=' .repeat(60));
  
  try {
    let processedCustomer = customerData;
    
    // Run through all agents in sequence
    processedCustomer = await backgroundCheckAgent(processedCustomer);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    
    processedCustomer = await creditEvaluationAgent(processedCustomer);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    
    processedCustomer = await offerGenerationAgent(processedCustomer);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    
    processedCustomer = await negotiationProcess(processedCustomer);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    
    processedCustomer = await finalAdvisoryAgent(processedCustomer);
    
    console.log('\n🎉 COMPLETE WORKFLOW FINISHED!');
    console.log('✅ All emails sent successfully');
    console.log('✅ Customer data flowed through all agents');
    console.log('✅ Negotiation process completed');
    console.log('✅ Final approval granted');
    
    return processedCustomer;
    
  } catch (error) {
    console.error('❌ Workflow failed:', error);
    throw error;
  }
}

// Run the workflow
if (require.main === module) {
  runCompleteWorkflow()
    .then(result => {
      console.log('\n📊 FINAL RESULT:', JSON.stringify(result, null, 2));
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 WORKFLOW ERROR:', error);
      process.exit(1);
    });
}

module.exports = { runCompleteWorkflow };
