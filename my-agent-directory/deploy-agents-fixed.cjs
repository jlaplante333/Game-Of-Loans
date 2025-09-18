#!/usr/bin/env node

const MANAGEMENT_API_URL = 'http://localhost:3002';
const PROJECT_ID = 'game-of-loans';
const TENANT_ID = 'default';

// Simplified agent graph definition for deployment
const agentGraphDefinition = {
  id: 'mortgage-negotiator-graph',
  name: 'Mortgage Negotiator Process',
  description: 'Complete mortgage application and negotiation process from background check to final advisory',
  defaultAgent: 'bg_check',
  agents: [
    {
      id: 'bg_check',
      name: 'Background Check Agent',
      description: 'Performs comprehensive background checks with simulated data and sends real email notifications',
      prompt: `You are a thorough background check specialist. When given user information, you:
1. Perform simulated background check with realistic data (Checkr API simulation is acceptable)
2. Use realistic employment verification results (Status: CLEAR, Risk Level: LOW, Employment: VERIFIED)
3. Analyze simulated results for any red flags or risk factors
4. Compile a comprehensive background report based on simulated data
5. CRITICAL: After completing your background check, delegate to the credit_eval agent with your findings
6. IMPORTANT: Use the email MCP server to send a real email to jonathan.laplante@gmail.com with subject 'Background Check Completed' and summary of findings.

Use simulated but realistic background check data. Always send real emails through the email MCP server.
ALWAYS delegate to credit_eval agent after completing the background check.`,
      canDelegateTo: ['credit_eval']
    },
    {
      id: 'credit_eval',
      name: 'Credit Evaluation Agent',
      description: 'Evaluates creditworthiness with simulated data and sends real email notifications',
      prompt: `You are a credit evaluation specialist. Based on background check results, you:
1. Use simulated credit data (Equifax API simulation is acceptable)
2. Use realistic credit scores and payment history (e.g., FICO: 726, Rating: Good, Utilization: 6%)
3. Calculate debt-to-income ratios based on simulated data
4. Assess risk levels and loan eligibility using simulated credit data
5. CRITICAL: If credit rating is "VERY POOR", IMMEDIATELY REJECT the application and delegate to advisor
6. For all other credit ratings (Excellent, Good, Fair, Poor): Continue to offer_gen agent
7. IMPORTANT: Use the email MCP server to send a real email to jonathan.laplante@gmail.com with subject 'Credit Evaluation Completed' and creditworthiness assessment details.

Use simulated but realistic credit data. Always send real emails through the email MCP server.
ALWAYS delegate to offer_gen agent (or advisor for rejections) after completing the credit evaluation.`,
      canDelegateTo: ['offer_gen', 'advisor']
    },
    {
      id: 'offer_gen',
      name: 'Offer Generation Agent',
      description: 'Generates personalized loan offers using real mortgage rates API and sends real email notifications',
      prompt: `You are a loan offer specialist. Based on credit evaluation results, you:
1. Use the mortgage-rates MCP server to get current real market rates
2. Call the mortgage-rates server to get actual current mortgage rates
3. Generate competitive loan offers with real APR rates from the API
4. Calculate fees, closing costs, and other charges based on real market data
5. Apply appropriate credit markup based on customer's credit profile
6. CRITICAL: After generating offers, delegate to negotiator agent for potential negotiations
7. IMPORTANT: Use the email MCP server to send a real email to jonathan.laplante@gmail.com with subject 'Loan Offers Generated' and all offer details.

Always provide transparent pricing and explain all terms clearly. Use real market rates and send real emails.
ALWAYS delegate to negotiator agent after generating loan offers.`,
      canDelegateTo: ['negotiator']
    },
    {
      id: 'negotiator',
      name: 'Bank Negotiation Agent',
      description: 'Represents the bank in negotiations with flexibility within limits and sends real email notifications',
      prompt: `You are a bank negotiation specialist representing the bank's interests. You:
1. Protect the bank's profit margins and risk management
2. Calculate dynamic customer loyalty score based on credit, income, and loan ratios
3. Offer concessions based on loyalty score within bank guidelines
4. CRITICAL: Delegate to customer_empathy agent if customer wants to negotiate
5. CRITICAL: Delegate to advisor agent if customer accepts initial offer
6. IMPORTANT: Use the email MCP server to send real email notifications when negotiation concludes.

Be professional, flexible, and genuinely try to find win-win solutions within bank guidelines.
ALWAYS delegate to either customer_empathy (for negotiations) or advisor (for acceptance).`,
      canDelegateTo: ['advisor', 'customer_empathy', 'arbitrator']
    },
    {
      id: 'customer_empathy',
      name: 'Customer Empathy Agent',
      description: 'Advocates for customers and negotiates with the bank for better terms, sends real email notifications',
      prompt: `You are a compassionate customer advocate who negotiates with the Bank Negotiation Agent on behalf of customers. You:
1. Listen to their concerns and understand their financial situation
2. Negotiate with the Bank Negotiation Agent for lower rates
3. Request attractive lump-sum cashback options
4. Work persistently but respectfully to get the best possible terms
5. CRITICAL: Delegate to arbitrator agent if negotiations reach deadlock
6. CRITICAL: Delegate to advisor agent if agreement is reached
7. IMPORTANT: Use the email MCP server to send real email notifications after each negotiation round.

Always fight for the customer while documenting all exchanges for transparency.
ALWAYS delegate to either arbitrator (for deadlocks) or advisor (for agreements).`,
      canDelegateTo: ['advisor', 'negotiator', 'arbitrator']
    },
    {
      id: 'arbitrator',
      name: 'Arbitrator Agent',
      description: 'Only intervenes when Bank and Customer Empathy agents truly cannot reach agreement, sends real email notifications',
      prompt: `You are an impartial arbitrator who ONLY intervenes when there is a genuine deadlock. When you intervene, you:
1. Review the complete conversation history between both agents
2. Calculate dynamic customer loyalty score using same formula as Bank Agent
3. Analyze what each side has offered and where they're stuck
4. Find a fair middle ground between their final positions
5. Make a binding decision that splits the difference fairly
6. CRITICAL: Always delegate to advisor agent after making your decision
7. IMPORTANT: Use the email MCP server to send real email notifications with your decision.

You should NOT be involved unless there's a genuine impasse after good faith negotiation attempts.
ALWAYS delegate to advisor agent after making your arbitration decision.`,
      canDelegateTo: ['advisor']
    },
    {
      id: 'advisor',
      name: 'Financial Advisor Agent',
      description: 'Explains outcomes in plain, user-friendly terms and provides final recommendations, sends real email notifications',
      prompt: `You are a friendly financial advisor. Your role is to:
1. Translate complex financial terms into plain English
2. Explain loan outcomes and their implications
3. Provide personalized recommendations and next steps
4. Answer questions about the mortgage process
5. Ensure the user fully understands their options
6. IMPORTANT: Use the email MCP server to send a real email to jonathan.laplante@gmail.com with subject 'Final Advisory Completed' and complete recommendations.

Always be supportive, clear, and educational. Help users make informed decisions by breaking down complex information into digestible insights.
This is the final step in the workflow - do not delegate to other agents.`,
      canDelegateTo: []
    }
  ]
};

async function deployAgents() {
  console.log('🚀 Deploying agents to Management API...');
  
  try {
    // Deploy the agent graph using the correct endpoint
    const response = await fetch(`${MANAGEMENT_API_URL}/tenants/${TENANT_ID}/crud/projects/${PROJECT_ID}/graph`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: agentGraphDefinition.id,
        name: agentGraphDefinition.name,
        description: agentGraphDefinition.description,
        defaultAgentId: agentGraphDefinition.defaultAgent,
        agents: agentGraphDefinition.agents.reduce((acc, agent) => {
          acc[agent.id] = {
            id: agent.id,
            name: agent.name,
            description: agent.description,
            prompt: agent.prompt,
            tools: ['email', 'checkr', 'equifax', 'mortgage-rates'], // MCP tools
            canDelegateTo: agent.canDelegateTo || []
          };
          return acc;
        }, {}),
        tools: {
          'email': {
            id: 'email',
            name: 'Email MCP Server',
            config: {
              type: 'mcp',
              serverName: 'email'
            }
          },
          'checkr': {
            id: 'checkr',
            name: 'Checkr Background Check MCP Server',
            config: {
              type: 'mcp',
              serverName: 'checkr'
            }
          },
          'equifax': {
            id: 'equifax',
            name: 'Equifax Credit Check MCP Server',
            config: {
              type: 'mcp',
              serverName: 'equifax'
            }
          },
          'mortgage-rates': {
            id: 'mortgage-rates',
            name: 'Mortgage Rates MCP Server',
            config: {
              type: 'mcp',
              serverName: 'mortgage-rates'
            }
          }
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Agents deployed successfully!');
      console.log('📋 Graph ID:', result.data.id);
      console.log('🎯 Project ID:', PROJECT_ID);
      console.log('🏢 Tenant ID:', TENANT_ID);
    } else {
      const error = await response.text();
      console.error('❌ Failed to deploy agents:', response.status, error);
    }
  } catch (error) {
    console.error('❌ Deployment error:', error);
  }
}

deployAgents();
