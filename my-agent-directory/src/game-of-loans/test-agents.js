#!/usr/bin/env node

/**
 * End-to-End Test Script for Game of Loans Agents
 * Tests the complete mortgage negotiation workflow
 */

import fetch from 'node-fetch';

const MANAGE_API_URL = 'http://localhost:3002';
const RUN_API_URL = 'http://localhost:3003';
const TENANT_ID = 'default';
const PROJECT_ID = 'game-of-loans';
const GRAPH_ID = 'mortgage-negotiator-graph';

// Test scenarios
const testScenarios = [
  {
    name: 'High Credit Score Applicant',
    input: `I'm John Smith, age 35, annual income $85,000, looking for a $300,000 mortgage. 
            I have a credit score of 720, employed for 3 years at Tech Corp, and have $60,000 saved for down payment. 
            Please run me through the complete mortgage negotiation process.`,
    expectedAgents: ['bg_check', 'credit_eval', 'offer_gen', 'negotiator', 'advisor']
  },
  {
    name: 'Lower Credit Score Applicant',
    input: `I'm Sarah Johnson, age 28, annual income $55,000, looking for a $200,000 mortgage. 
            I have a credit score of 620, employed for 1 year at StartupCo, and have $25,000 saved for down payment. 
            Please evaluate my mortgage application.`,
    expectedAgents: ['bg_check', 'credit_eval', 'offer_gen', 'negotiator', 'advisor']
  },
  {
    name: 'Dispute Resolution Test',
    input: `I have a dispute with my mortgage lender regarding hidden fees in my loan offer. 
            The lender added $5,000 in unexpected closing costs that weren't disclosed initially. 
            Please help me resolve this dispute.`,
    expectedAgents: ['dispute_resolver', 'advisor']
  }
];

async function testAgentWorkflow(scenario) {
  console.log(`\n🧪 Testing: ${scenario.name}`);
  console.log('=' .repeat(50));
  
  try {
    // Start a conversation with the graph
    const response = await fetch(`${RUN_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-inkeep-tenant-id': TENANT_ID,
        'x-inkeep-project-id': PROJECT_ID,
        'x-inkeep-graph-id': GRAPH_ID,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: scenario.input
          }
        ],
        conversationId: `test-${Date.now()}`
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('✅ Agent Response:');
    console.log(result.message || result.response || 'No response received');
    
    // Check if email notification was triggered
    if (result.message && result.message.includes('EMAIL NOTIFICATION')) {
      console.log('📧 Email notification triggered successfully');
    }
    
    console.log('\n📊 Test Results:');
    console.log(`- Status: ${response.ok ? 'PASSED' : 'FAILED'}`);
    console.log(`- Response received: ${!!result.message}`);
    console.log(`- Email notification: ${result.message?.includes('EMAIL NOTIFICATION') ? 'YES' : 'NO'}`);
    
    return {
      scenario: scenario.name,
      passed: response.ok && !!result.message,
      emailTriggered: result.message?.includes('EMAIL NOTIFICATION') || false,
      response: result.message || result.response
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return {
      scenario: scenario.name,
      passed: false,
      error: error.message
    };
  }
}

async function testEmailWebhook() {
  console.log('\n📧 Testing Email Webhook Integration');
  console.log('=' .repeat(50));
  
  try {
    // Test the email webhook endpoint
    const testEmail = {
      to: 'jonathan.laplante@gmail.com',
      subject: 'Test Email from Game of Loans Agents',
      body: 'This is a test email to verify the webhook integration is working properly.'
    };
    
    const response = await fetch('http://localhost:3004/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEmail)
    });
    
    if (response.ok) {
      console.log('✅ Email webhook is accessible and responding');
      return { webhookWorking: true };
    } else {
      console.log('⚠️  Email webhook returned non-200 status:', response.status);
      return { webhookWorking: false, status: response.status };
    }
    
  } catch (error) {
    console.log('⚠️  Email webhook not accessible:', error.message);
    return { webhookWorking: false, error: error.message };
  }
}

async function checkServiceHealth() {
  console.log('\n🏥 Checking Service Health');
  console.log('=' .repeat(50));
  
  const services = [
    { name: 'Management API', url: `${MANAGE_API_URL}/health` },
    { name: 'Run API', url: `${RUN_API_URL}/health` }
  ];
  
  const results = {};
  
  for (const service of services) {
    try {
      const response = await fetch(service.url);
      results[service.name] = {
        status: response.ok ? 'HEALTHY' : 'UNHEALTHY',
        statusCode: response.status
      };
      console.log(`${response.ok ? '✅' : '❌'} ${service.name}: ${results[service.name].status}`);
    } catch (error) {
      results[service.name] = {
        status: 'UNREACHABLE',
        error: error.message
      };
      console.log(`❌ ${service.name}: UNREACHABLE (${error.message})`);
    }
  }
  
  return results;
}

async function runAllTests() {
  console.log('🚀 Starting Game of Loans Agents End-to-End Tests');
  console.log('=' .repeat(60));
  
  // Check service health first
  const healthResults = await checkServiceHealth();
  
  // Test email webhook
  const emailResults = await testEmailWebhook();
  
  // Run agent workflow tests
  const testResults = [];
  for (const scenario of testScenarios) {
    const result = await testAgentWorkflow(scenario);
    testResults.push(result);
    
    // Wait between tests to avoid overwhelming the system
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Summary
  console.log('\n📋 TEST SUMMARY');
  console.log('=' .repeat(60));
  
  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = testResults.length;
  
  console.log(`\n🧪 Agent Workflow Tests: ${passedTests}/${totalTests} passed`);
  testResults.forEach(result => {
    const status = result.passed ? '✅' : '❌';
    const email = result.emailTriggered ? '📧' : '  ';
    console.log(`  ${status} ${email} ${result.scenario}`);
    if (result.error) {
      console.log(`      Error: ${result.error}`);
    }
  });
  
  console.log(`\n🏥 Service Health:`);
  Object.entries(healthResults).forEach(([service, result]) => {
    const status = result.status === 'HEALTHY' ? '✅' : '❌';
    console.log(`  ${status} ${service}: ${result.status}`);
  });
  
  console.log(`\n📧 Email Webhook: ${emailResults.webhookWorking ? '✅ Working' : '❌ Not Working'}`);
  
  console.log('\n🎯 Overall Status:');
  const overallSuccess = passedTests === totalTests && 
                        Object.values(healthResults).every(r => r.status === 'HEALTHY');
  console.log(`  ${overallSuccess ? '✅ ALL SYSTEMS OPERATIONAL' : '⚠️  SOME ISSUES DETECTED'}`);
  
  return {
    agentTests: testResults,
    serviceHealth: healthResults,
    emailWebhook: emailResults,
    overallSuccess
  };
}

// Run the tests
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests()
    .then(results => {
      process.exit(results.overallSuccess ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Test suite failed:', error);
      process.exit(1);
    });
}

export { runAllTests, testAgentWorkflow, checkServiceHealth, testEmailWebhook };
