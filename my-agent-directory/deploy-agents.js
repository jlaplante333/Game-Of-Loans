#!/usr/bin/env node

import { mortgageNegotiatorGraph } from './src/game-of-loans/agents.ts';

const MANAGEMENT_API_URL = 'http://localhost:3002';
const PROJECT_ID = 'game-of-loans';
const TENANT_ID = 'default';

async function deployAgents() {
  console.log('🚀 Deploying agents to Management API...');
  
  try {
    // Deploy the agent graph
    const response = await fetch(`${MANAGEMENT_API_URL}/api/graphs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': TENANT_ID,
        'x-project-id': PROJECT_ID,
      },
      body: JSON.stringify({
        graph: mortgageNegotiatorGraph,
        projectId: PROJECT_ID,
        tenantId: TENANT_ID,
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Agents deployed successfully!');
      console.log('📋 Graph ID:', result.id);
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
