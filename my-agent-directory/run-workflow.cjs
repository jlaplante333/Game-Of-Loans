#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const WORKFLOW_DIR = path.join(__dirname, 'src/game-of-loans');

function runWorkflow(type = 'dynamic') {
  console.log('🎯 Game of Loans - Agent Workflow Runner');
  console.log('=' .repeat(50));
  
  try {
    let command;
    let description;
    
    switch (type) {
      case 'real':
      case 'inkeep':
        command = 'node real-inkeep-agent-workflow.cjs';
        description = 'Real Inkeep Agent Workflow (requires agents to be deployed)';
        break;
      case 'dynamic':
      case 'simulation':
      default:
        command = 'node dynamic-agent-workflow.cjs';
        description = 'Dynamic Agent Simulation (recommended fallback)';
        break;
    }
    
    console.log(`📋 Running: ${description}`);
    console.log(`🚀 Command: ${command}`);
    console.log('');
    
    execSync(command, { 
      cwd: WORKFLOW_DIR, 
      stdio: 'inherit' 
    });
    
  } catch (error) {
    console.error('❌ Workflow execution failed:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const workflowType = args[0] || 'dynamic';

// Show usage if help requested
if (workflowType === '--help' || workflowType === '-h') {
  console.log('🎯 Game of Loans - Agent Workflow Runner');
  console.log('');
  console.log('Usage: node run-workflow.js [type]');
  console.log('');
  console.log('Types:');
  console.log('  dynamic    - Dynamic Agent Simulation (default, recommended)');
  console.log('  simulation - Same as dynamic');
  console.log('  real       - Real Inkeep Agent Workflow (requires deployment)');
  console.log('  inkeep     - Same as real');
  console.log('');
  console.log('Examples:');
  console.log('  node run-workflow.js');
  console.log('  node run-workflow.js dynamic');
  console.log('  node run-workflow.js real');
  process.exit(0);
}

runWorkflow(workflowType);
