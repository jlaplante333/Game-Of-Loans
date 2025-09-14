/**
 * Realistic Agent Simulation for Game of Loans
 * This simulates how the actual Inkeep agents would respond based on their prompts
 * and the real MCP server data we collected.
 */

// Real data from our MCP server tests
const realTestData = {
  backgroundCheck: {
    name: "Michael Chen",
    status: "CLEAR",
    riskLevel: "LOW",
    employmentVerification: "PASSED"
  },
  creditEvaluation: {
    ficoScore: 726,
    creditRating: "Good",
    creditUtilization: "6%",
    paymentHistory: "Excellent",
    riskAssessment: "LOW RISK"
  },
  mortgageRate: {
    marketRate: 7.196,
    creditMarkup: 0.2,
    finalAPR: 7.396,
    loanAmount: 400000,
    downPayment: 80000,
    principal: 320000,
    monthlyPayment: 2214.72,
    totalInterest: 477299
  },
  customerLoyaltyScore: 5 // Hardcoded as per agent prompts
};

// Simulate each agent's response based on their actual prompts
class AgentSimulator {
  
  // Background Check Agent Response
  backgroundCheckAgent() {
    console.log("🔍 BACKGROUND CHECK AGENT ACTIVATED");
    console.log("=====================================");
    
    const response = `
I am a thorough background check specialist. I have analyzed the provided user information for ${realTestData.backgroundCheck.name}:

1. ✅ Credit history and payment patterns: Reviewed and documented
2. ✅ Employment status and income stability: Verified as stable
3. ✅ Risk factors assessment: ${realTestData.backgroundCheck.riskLevel} risk identified
4. ✅ Comprehensive background report compiled
5. ✅ Findings ready for credit evaluation team

BACKGROUND CHECK SUMMARY:
- Status: ${realTestData.backgroundCheck.status}
- Risk Level: ${realTestData.backgroundCheck.riskLevel}
- Employment Verification: ${realTestData.backgroundCheck.employmentVerification}
- Criminal History: No records found
- SSN Verification: Valid

I am now passing these findings to the credit evaluation team for the next step.

EMAIL NOTIFICATION: Sending completion email to jonathan.laplante@gmail.com with subject 'Background Check Completed' and summary of findings. Include link: Return to mortgage rate discussion with your Game of Loans lender agent.
`;
    
    console.log(response);
    return response;
  }

  // Credit Evaluation Agent Response
  creditEvaluationAgent() {
    console.log("\n📊 CREDIT EVALUATION AGENT ACTIVATED");
    console.log("=====================================");
    
    const response = `
I am a credit evaluation specialist. Based on the background check results, I have completed my analysis:

1. ✅ Credit scores and payment history analyzed
   - FICO Score: ${realTestData.creditEvaluation.ficoScore}
   - Credit Rating: ${realTestData.creditEvaluation.creditRating}
   - Payment History: ${realTestData.creditEvaluation.paymentHistory}

2. ✅ Debt-to-income ratios calculated
   - Credit Utilization: ${realTestData.creditEvaluation.creditUtilization}
   - Assessment: Excellent financial management

3. ✅ Risk levels and loan eligibility assessed
   - Risk Assessment: ${realTestData.creditEvaluation.riskAssessment}
   - Eligibility: APPROVED for loan offers

4. ✅ Loan terms and limits determined
   - Qualified for prime lending rates
   - Standard loan terms applicable

CREDIT EVALUATION DECISION: 
Since credit rating is "${realTestData.creditEvaluation.creditRating}" (not "VERY POOR"), the application PROCEEDS to offer generation.

EMAIL NOTIFICATION: Sending completion email to jonathan.laplante@gmail.com with subject 'Credit Evaluation Completed' and creditworthiness assessment details. Include link: Return to mortgage rate discussion with your Game of Loans lender agent.
`;
    
    console.log(response);
    return response;
  }

  // Offer Generation Agent Response
  offerGenerationAgent() {
    console.log("\n💰 OFFER GENERATION AGENT ACTIVATED");
    console.log("====================================");
    
    const response = `
I am a loan offer specialist. Based on the credit evaluation results, I have generated personalized offers:

1. ✅ Competitive loan offers generated
   - Market Rate: ${realTestData.mortgageRate.marketRate}%
   - Credit Markup: +${realTestData.mortgageRate.creditMarkup}% (${realTestData.creditEvaluation.creditRating} credit)
   - Final APR: ${realTestData.mortgageRate.finalAPR}%

2. ✅ Fees and closing costs calculated
   - Loan Amount: $${realTestData.mortgageRate.loanAmount.toLocaleString()}
   - Down Payment: $${realTestData.mortgageRate.downPayment.toLocaleString()}
   - Principal: $${realTestData.mortgageRate.principal.toLocaleString()}

3. ✅ Payment breakdown provided
   - Monthly Payment: $${realTestData.mortgageRate.monthlyPayment.toLocaleString()}
   - Total Interest: $${realTestData.mortgageRate.totalInterest.toLocaleString()}
   - Loan Term: 30 years

4. ✅ Insurance add-ons suggested
   - PMI: Not required (20% down payment)
   - Life insurance: Optional coverage available
   - Homeowner's insurance: Required

LOAN OFFER SUMMARY:
Your ${realTestData.creditEvaluation.creditRating} credit rating has earned you competitive terms with only a ${realTestData.mortgageRate.creditMarkup}% markup above market rate.

EMAIL NOTIFICATION: Sending completion email to jonathan.laplante@gmail.com with subject 'Loan Offers Generated' and all offer details. Include link: Return to mortgage rate discussion with your Game of Loans lender agent.
`;
    
    console.log(response);
    return response;
  }

  // Customer Empathy Agent Response (when customer disputes rate)
  customerEmpathyAgent(customerComplaint) {
    console.log("\n❤️ CUSTOMER EMPATHY AGENT ACTIVATED");
    console.log("===================================");
    
    const response = `
I am a compassionate customer advocate. I understand your concern about the ${realTestData.mortgageRate.finalAPR}% rate. Let me negotiate with the Bank Negotiation Agent on your behalf.

Customer Concern: "${customerComplaint}"

My advocacy position:
1. 🎯 You have excellent credit (${realTestData.creditEvaluation.ficoScore}) with ${realTestData.creditEvaluation.creditUtilization} utilization
2. 🎯 Your ${realTestData.creditEvaluation.paymentHistory} payment history shows reliability
3. 🎯 You deserve better terms for your strong financial profile

NEGOTIATION REQUEST TO BANK AGENT:
"This customer has exceptional financial management with only ${realTestData.creditEvaluation.creditUtilization} credit utilization and ${realTestData.creditEvaluation.paymentHistory} payment history. I'm requesting:
- Rate reduction to 6.8% (from ${realTestData.mortgageRate.finalAPR}%)
- $15,000 lump-sum cashback to help with closing costs
- Waived origination fees

This customer represents low risk and deserves competitive terms."

EMAIL NOTIFICATION: Sending completion email to jonathan.laplante@gmail.com with subject 'Customer Advocacy Round 1 Summary' including complete conversation history between Customer Empathy Agent, Bank Agent, and Arbitrator for full transparency. Include link: Return to mortgage rate discussion with your Game of Loans lender agent.
`;
    
    console.log(response);
    return response;
  }

  // Bank Negotiation Agent Response
  bankNegotiationAgent(empathyRequest) {
    console.log("\n🏛️ BANK NEGOTIATION AGENT ACTIVATED");
    console.log("===================================");
    
    const response = `
I am a bank negotiation specialist representing the bank's interests. I have received the Customer Empathy Agent's request and must evaluate it against our policies.

CUSTOMER LOYALTY SCORE CHECK:
// TODO: Integrate with Convex backend to get real customer loyalty score
// For now, hardcode loyalty score = ${realTestData.customerLoyaltyScore} for demonstration

Customer loyalty score: ${realTestData.customerLoyaltyScore}

POLICY EVALUATION:
❌ Loyalty Score Assessment: ${realTestData.customerLoyaltyScore} (NOT > 5)
❌ Concession Eligibility: NO CONCESSIONS available beyond standard rates

BANK RESPONSE TO EMPATHY AGENT:
"I understand the customer's strong financial profile with a ${realTestData.creditEvaluation.ficoScore} credit score and ${realTestData.creditEvaluation.creditUtilization} utilization. However, our customer loyalty score check shows a score of ${realTestData.customerLoyaltyScore}, which does not exceed our threshold of 5 for concession eligibility.

Per bank policy:
- Rate reduction to 6.8%: DENIED (loyalty score ≤ 5)
- $15,000 cashback: DENIED (loyalty score ≤ 5)
- Waived origination fees: DENIED (loyalty score ≤ 5)

FINAL BANK POSITION: ${realTestData.mortgageRate.finalAPR}% rate with no additional concessions. The customer may accept these terms or explore other options."

EMAIL NOTIFICATION: Sending completion email to jonathan.laplante@gmail.com with subject 'Multi-Agent Negotiation Summary - Round 1' including complete conversation history between Bank Agent, Customer Empathy Agent, and Arbitrator for full transparency. Include customer loyalty score check results. Include link: Return to mortgage rate discussion with your Game of Loans lender agent.
`;
    
    console.log(response);
    return response;
  }

  // Arbitrator Agent Response (if deadlock occurs)
  arbitratorAgent(negotiationHistory) {
    console.log("\n⚖️ ARBITRATOR AGENT ACTIVATED");
    console.log("=============================");
    
    const response = `
I am an impartial arbitrator resolving the negotiation deadlock between the Customer Empathy Agent and Bank Negotiation Agent.

ARBITRATION ANALYSIS:
1. ✅ Complete conversation history reviewed
2. ✅ Customer loyalty score considered: ${realTestData.customerLoyaltyScore} (≤ 5)
3. ✅ Original mortgage rate: ${realTestData.mortgageRate.finalAPR}%
4. ✅ Customer request: 6.8% + $15,000 cashback
5. ✅ Bank position: No concessions due to loyalty score

LOYALTY SCORE IMPACT:
Since customer loyalty score is ${realTestData.customerLoyaltyScore} (≤ 5), significant concessions are limited per bank policy.

BINDING ARBITRATION DECISION:
- Mortgage Rate: ${realTestData.mortgageRate.finalAPR}% (maintained)
- Lump-sum Cashback: $0 (loyalty score limitation)
- Compromise Concession: Waived application fee ($500 value)
- Additional Benefit: Free credit monitoring for 1 year ($120 value)

RATIONALE:
While the customer has excellent credit, the loyalty score of ${realTestData.customerLoyaltyScore} limits major concessions. The compromise provides some customer value while respecting bank policies.

THIS DECISION IS FINAL AND BINDING.

EMAIL NOTIFICATION: Sending completion email to jonathan.laplante@gmail.com with subject 'FINAL Arbitration Decision with Complete Negotiation History' including the entire conversation history between all three agents (Bank Agent, Customer Empathy Agent, and Arbitrator) showing how the final binding decision was reached, including customer loyalty score analysis. Include link: Return to mortgage rate discussion with your Game of Loans lender agent.
`;
    
    console.log(response);
    return response;
  }

  // Financial Advisor Agent Response (Final Report)
  financialAdvisorAgent(finalTerms) {
    console.log("\n👨‍💼 FINANCIAL ADVISOR AGENT ACTIVATED");
    console.log("======================================");
    
    const response = `
I am your friendly financial advisor. Let me explain your final mortgage terms in plain English:

FINAL LOAN TERMS EXPLANATION:
🏠 Your Home Purchase Summary:
- Loan Amount: $${realTestData.mortgageRate.loanAmount.toLocaleString()}
- Down Payment: $${realTestData.mortgageRate.downPayment.toLocaleString()} (20%)
- Principal Borrowed: $${realTestData.mortgageRate.principal.toLocaleString()}

💰 Interest Rate Breakdown:
- Market Rate: ${realTestData.mortgageRate.marketRate}%
- Your Credit Markup: +${realTestData.mortgageRate.creditMarkup}% (${realTestData.creditEvaluation.creditRating} credit)
- Final APR: ${realTestData.mortgageRate.finalAPR}%

📅 Monthly Payment Details:
- Monthly Payment: $${realTestData.mortgageRate.monthlyPayment.toLocaleString()}
- Total Interest Over 30 Years: $${realTestData.mortgageRate.totalInterest.toLocaleString()}
- Total Amount Paid: $${(realTestData.mortgageRate.principal + realTestData.mortgageRate.totalInterest).toLocaleString()}

🎁 Negotiation Results:
- Application Fee: WAIVED ($500 savings)
- Credit Monitoring: FREE for 1 year ($120 value)
- Total Additional Value: $620

💡 Why These Terms:
Your ${realTestData.creditEvaluation.creditRating} credit (${realTestData.creditEvaluation.ficoScore}) earned you a competitive rate with only ${realTestData.mortgageRate.creditMarkup}% markup. Your ${realTestData.creditEvaluation.creditUtilization} credit utilization shows excellent financial management.

📈 Loyalty Program Opportunity:
Your current loyalty score is ${realTestData.customerLoyaltyScore}. To unlock better negotiation terms in the future, consider:
- Opening a checking account with us
- Setting up direct deposit
- Using our credit cards for daily purchases

🎯 Next Steps:
1. Review and sign loan documents
2. Schedule home inspection
3. Finalize homeowner's insurance
4. Prepare for closing in 30-45 days

Congratulations on your home purchase! You've secured competitive terms for your credit profile.

EMAIL NOTIFICATION: Sending completion email to jonathan.laplante@gmail.com with subject 'Final Advisory Completed' and complete recommendations. Include link: Return to mortgage rate discussion with your Game of Loans lender agent.
`;
    
    console.log(response);
    return response;
  }

  // Run complete simulation
  runCompleteSimulation() {
    console.log("🎭 STARTING REALISTIC AGENT SIMULATION");
    console.log("=====================================");
    console.log("Using REAL data from MCP server tests:");
    console.log("- Background Check: Checkr API");
    console.log("- Credit Evaluation: Equifax API");
    console.log("- Mortgage Rates: Mortgage Rates API");
    console.log("- Email Notifications: Gmail API");
    console.log("\n");

    // Step 1: Background Check
    this.backgroundCheckAgent();

    // Step 2: Credit Evaluation
    this.creditEvaluationAgent();

    // Step 3: Offer Generation
    this.offerGenerationAgent();

    // Step 4: Customer disputes rate
    console.log("\n🗣️ CUSTOMER COMPLAINT:");
    console.log("\"7.396% seems high for my excellent credit. Can we do better?\"");
    
    this.customerEmpathyAgent("7.396% seems high for my excellent credit. Can we do better?");

    // Step 5: Bank responds
    this.bankNegotiationAgent("Customer requesting 6.8% + $15K cashback");

    // Step 6: Arbitration (simulating deadlock)
    this.arbitratorAgent("5 rounds of negotiation completed");

    // Step 7: Final Advisory
    this.financialAdvisorAgent("Final terms with arbitration decision");

    console.log("\n🎯 SIMULATION COMPLETE");
    console.log("======================");
    console.log("This demonstrates how the actual Inkeep agents would respond");
    console.log("based on their prompts and real MCP server data.");
  }
}

// Run the simulation
const simulator = new AgentSimulator();
simulator.runCompleteSimulation();
