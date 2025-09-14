import { defineConfig } from '@inkeep/agents-cli/config';

const config = defineConfig({
  tenantId: "default",
  projectId: "game-of-loans",
  agentsManageApiUrl: `http://localhost:${process.env.MANAGE_API_PORT || '3002'}`,
  agentsRunApiUrl: `http://localhost:${process.env.RUN_API_PORT || '3003'}`,
  modelSettings: {
  "base": {
    "model": "anthropic/claude-sonnet-4-20250514"
  },
  "structuredOutput": {
    "model": "openai/gpt-4.1-mini-2025-04-14"
  },
  "summarizer": {
    "model": "openai/gpt-4.1-nano-2025-04-14"
  }
},
});
    
export default config;
