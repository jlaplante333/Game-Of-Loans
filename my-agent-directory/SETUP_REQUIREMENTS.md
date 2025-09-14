# Game of Loans - Complete Setup Requirements

## 🎯 Overview
This is a complete Game of Loans mortgage processing system with 7 AI agents, real API integrations, and multi-agent negotiation capabilities.

## 📋 Prerequisites

### Required Software
1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **pnpm** (Package Manager)
   - Install: `npm install -g pnpm`
   - Verify: `pnpm --version`

3. **Git**
   - Download from: https://git-scm.com/
   - Verify: `git --version`

4. **VSCode** (Recommended IDE)
   - Download from: https://code.visualstudio.com/
   - Install Cline extension for AI assistance

## 🚀 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/jlaplante333/Game-Of-Loans.git
cd Game-Of-Loans/my-agent-directory
```

### 2. Install Dependencies
```bash
# Install all dependencies
pnpm install

# Build all MCP servers
pnpm run build:all
```

### 3. Environment Configuration

#### Main Project Environment
Create `.env` file in `my-agent-directory/`:
```env
# Database Configuration
DATABASE_URL="your-database-url-here"

# API Keys (Optional - for production)
CHECKR_API_KEY="your-checkr-api-key"
EQUIFAX_API_KEY="your-equifax-api-key"
MORTGAGE_RATES_API_KEY="your-mortgage-rates-api-key"

# Email Configuration
GMAIL_USER="your-gmail-address@gmail.com"
GMAIL_APP_PASSWORD="your-gmail-app-password"
```

#### Game of Loans Specific Environment
Create `.env` file in `my-agent-directory/src/game-of-loans/`:
```env
# Email Configuration for Agents
GMAIL_USER="your-gmail-address@gmail.com"
GMAIL_APP_PASSWORD="your-gmail-app-password"

# MCP Server Configuration
CHECKR_API_KEY="demo-mode"
EQUIFAX_API_KEY="demo-mode"
MORTGAGE_RATES_API_KEY="demo-mode"
```

#### API App Environments
Create `.env` files in both:
- `my-agent-directory/apps/manage-api/.env`
- `my-agent-directory/apps/run-api/.env`

```env
DATABASE_URL="your-database-url-here"
PORT=3000
```

### 4. Gmail App Password Setup (Required for Email Notifications)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in your `.env` files

### 5. MCP Server Configuration

The system includes 4 MCP servers that need to be configured in your Cline settings:

#### Add to Cline MCP Settings:
```json
{
  "mcpServers": {
    "email": {
      "command": "node",
      "args": ["/path/to/Game-Of-Loans/my-agent-directory/../Documents/Cline/MCP/email-server/build/index.js"]
    },
    "checkr": {
      "command": "node", 
      "args": ["/path/to/Game-Of-Loans/my-agent-directory/../Documents/Cline/MCP/checkr-server/build/index.js"]
    },
    "equifax": {
      "command": "node",
      "args": ["/path/to/Game-Of-Loans/my-agent-directory/../Documents/Cline/MCP/equifax-server/build/index.js"]
    },
    "mortgage-rates": {
      "command": "node",
      "args": ["/path/to/Game-Of-Loans/my-agent-directory/../Documents/Cline/MCP/mortgage-rates-server/build/index.js"]
    }
  }
}
```

## 🏗️ Project Structure

```
my-agent-directory/
├── src/game-of-loans/
│   ├── agents.ts                    # 7 AI Agents Definition
│   ├── inkeep.config.ts            # Inkeep Configuration
│   ├── realistic-agent-simulation.js # Agent Testing Script
│   └── .env                        # Game of Loans Environment
├── apps/
│   ├── manage-api/                 # Management API
│   ├── run-api/                    # Runtime API
│   └── shared/                     # Shared Utilities
├── scripts/
│   ├── setup.js                    # Setup Script
│   └── dev-setup.js               # Development Setup
├── package.json                    # Main Dependencies
├── pnpm-workspace.yaml            # Workspace Configuration
└── .env                           # Main Environment
```

## 🤖 AI Agents Overview

The system includes 7 specialized agents:

1. **Background Check Agent** - Checkr API integration
2. **Credit Evaluation Agent** - Equifax API integration  
3. **Offer Generation Agent** - Mortgage rate calculations
4. **Bank Negotiation Agent** - Represents bank interests
5. **Customer Empathy Agent** - Advocates for customers
6. **Arbitrator Agent** - Resolves negotiation deadlocks
7. **Financial Advisor Agent** - Final recommendations

## 🔧 MCP Servers

### 1. Email Server
- **Purpose**: Real Gmail email notifications
- **Features**: SMTP integration, professional templates
- **Location**: `../Documents/Cline/MCP/email-server/`

### 2. Checkr Server  
- **Purpose**: Background check simulations
- **Features**: Criminal history, employment verification
- **Location**: `../Documents/Cline/MCP/checkr-server/`

### 3. Equifax Server
- **Purpose**: Credit score evaluations
- **Features**: FICO scoring, credit rating analysis
- **Location**: `../Documents/Cline/MCP/equifax-server/`

### 4. Mortgage Rates Server
- **Purpose**: Real-time rate calculations
- **Features**: Market rates, credit-based markup
- **Location**: `../Documents/Cline/MCP/mortgage-rates-server/`

## 🧪 Testing the System

### 1. Test Agent Simulation
```bash
cd src/game-of-loans
node realistic-agent-simulation.js
```

### 2. Test MCP Servers
Use Cline to test each MCP server:
- `use_mcp_tool` with server name and tool name
- Verify email delivery
- Check rate calculations

### 3. End-to-End Testing
Run complete mortgage application workflow:
1. Background check
2. Credit evaluation  
3. Rate calculation
4. Multi-agent negotiation
5. Final advisory

## 🚀 Running the System

### Development Mode
```bash
# Start all services
pnpm run dev

# Start specific services
pnpm run dev:manage-api
pnpm run dev:run-api
```

### Production Mode
```bash
# Build everything
pnpm run build

# Start production servers
pnpm run start
```

## 🔑 Key Features

### Business Logic
- **Very Poor Credit**: Automatic rejection (FICO < 600)
- **Customer Loyalty Scoring**: Affects negotiation limits
- **Credit-Based Rate Markup**: Dynamic pricing
- **Multi-Agent Negotiation**: Up to 5 rounds before arbitration

### Negotiation Limits
- **Loyalty Score ≤ 5**: Up to 5% rate reduction, 2% cashback
- **Loyalty Score > 5**: Up to 10% rate reduction, 5% cashback

### Email Transparency
- Complete conversation history
- Real-time notifications
- Professional formatting
- Return-to-discussion links

## 🐛 Troubleshooting

### Common Issues

1. **MCP Server Not Found**
   - Check file paths in Cline settings
   - Ensure servers are built: `pnpm run build:all`

2. **Email Not Sending**
   - Verify Gmail app password
   - Check 2FA is enabled
   - Confirm `.env` configuration

3. **Agent Not Responding**
   - Check Inkeep configuration
   - Verify agent definitions in `agents.ts`

4. **Rate Calculation Errors**
   - Ensure mortgage-rates server is running
   - Check API parameters

### Support
- Check GitHub issues: https://github.com/jlaplante333/Game-Of-Loans/issues
- Review agent logs in console
- Test individual MCP servers

## 📚 Additional Resources

- **Inkeep Documentation**: https://docs.inkeep.com/
- **MCP Protocol**: https://modelcontextprotocol.io/
- **Cline Documentation**: https://docs.cline.bot/

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ All MCP servers respond to test calls
- ✅ Emails are delivered to your Gmail inbox
- ✅ Agent simulation runs without errors
- ✅ Rate calculations return realistic values
- ✅ Multi-agent negotiation produces reasonable outcomes

## 📞 Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review console logs for error messages
3. Test individual components separately
4. Verify all environment variables are set correctly

Happy coding! 🚀
