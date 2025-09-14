# Game of Loans - Complete Dependencies Guide

## 🎯 Overview
This document lists all dependencies required for the Game of Loans system, including Node.js packages, Python packages, and system requirements.

## 📋 System Requirements

### Required Software
- **Node.js**: >=22.x (specified in package.json engines)
- **pnpm**: 10.10.0 (specified as packageManager)
- **Python**: >=3.8 (if using Python components)
- **Git**: Latest version
- **VSCode**: Recommended IDE with Cline extension

## 📦 Node.js Dependencies (Primary)

### Production Dependencies (package.json)
```json
{
  "@inkeep/agents-core": "^0.1.0",
  "@inkeep/agents-sdk": "^0.1.0", 
  "dotenv": "^16.0.0",
  "express": "^5.1.0",
  "nodemailer": "^7.0.6",
  "zod": "^4.1.5"
}
```

### Development Dependencies (package.json)
```json
{
  "@biomejs/biome": "^1.8.0",
  "@inkeep/agents-cli": "^0.1.1",
  "concurrently": "^8.2.0",
  "drizzle-kit": "^0.31.4",
  "tsx": "^4.19.0",
  "turbo": "^2.5.5",
  "wait-on": "^8.0.0"
}
```

### Installation Commands
```bash
# Install Node.js dependencies
pnpm install

# Install development dependencies (included above)
pnpm install --dev
```

## 🐍 Python Dependencies (Optional)

### Python Requirements (requirements.txt)
```txt
requests>=2.31.0
python-dotenv>=1.0.0
```

### Installation Commands
```bash
# Install Python dependencies (if needed)
pip install -r requirements.txt

# Or using virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 🔧 MCP Server Dependencies

### Email Server Dependencies
Located in: `../Documents/Cline/MCP/email-server/package.json`
- nodemailer
- dotenv
- TypeScript build tools

### Checkr Server Dependencies  
Located in: `../Documents/Cline/MCP/checkr-server/package.json`
- HTTP client libraries
- JSON processing
- TypeScript build tools

### Equifax Server Dependencies
Located in: `../Documents/Cline/MCP/equifax-server/package.json`
- Credit scoring simulation
- Data processing libraries
- TypeScript build tools

### Mortgage Rates Server Dependencies
Located in: `../Documents/Cline/MCP/mortgage-rates-server/package.json`
- Financial calculation libraries
- Rate processing
- TypeScript build tools

## 🏗️ Build Dependencies

### TypeScript Compilation
- **tsx**: ^4.19.0 - TypeScript execution
- **@biomejs/biome**: ^1.8.0 - Code formatting and linting

### Build Tools
- **turbo**: ^2.5.5 - Monorepo build system
- **drizzle-kit**: ^0.31.4 - Database toolkit
- **concurrently**: ^8.2.0 - Run multiple commands

### Development Tools
- **wait-on**: ^8.0.0 - Wait for services to be ready
- **@inkeep/agents-cli**: ^0.1.1 - Inkeep CLI tools

## 🌐 Runtime Dependencies

### Core Framework
- **@inkeep/agents-core**: ^0.1.0 - Core agent functionality
- **@inkeep/agents-sdk**: ^0.1.0 - Agent development SDK

### Web Server
- **express**: ^5.1.0 - Web application framework

### Email Integration
- **nodemailer**: ^7.0.6 - Email sending capabilities

### Configuration
- **dotenv**: ^16.0.0 - Environment variable loading

### Validation
- **zod**: ^4.1.5 - Schema validation

## 📋 Installation Checklist

### 1. System Prerequisites
- [ ] Install Node.js >=22.x
- [ ] Install pnpm 10.10.0
- [ ] Install Git
- [ ] Install VSCode with Cline extension
- [ ] Install Python >=3.8 (optional)

### 2. Project Dependencies
- [ ] Clone repository
- [ ] Run `pnpm install` in project root
- [ ] Build MCP servers: `pnpm run build:all`
- [ ] Install Python deps: `pip install -r requirements.txt` (optional)

### 3. Environment Setup
- [ ] Configure .env files
- [ ] Set up Gmail app passwords
- [ ] Configure MCP server paths in Cline
- [ ] Test MCP server connections

### 4. Verification
- [ ] Run `pnpm run dev` successfully
- [ ] Test agent simulation: `node realistic-agent-simulation.js`
- [ ] Verify email delivery
- [ ] Test rate calculations

## 🔍 Dependency Details

### Critical Dependencies
1. **@inkeep/agents-sdk** - Required for all agent functionality
2. **nodemailer** - Required for email notifications
3. **express** - Required for API endpoints
4. **dotenv** - Required for environment configuration

### Optional Dependencies
1. **requests** (Python) - For additional API integrations
2. **python-dotenv** (Python) - For Python environment handling

### Development Only
1. **@biomejs/biome** - Code formatting (not needed in production)
2. **turbo** - Build orchestration (not needed in production)
3. **tsx** - TypeScript execution (not needed in production)

## 🚨 Common Issues

### Node.js Version Mismatch
- **Issue**: Package requires Node.js >=22.x
- **Solution**: Update Node.js or use nvm/fnm to manage versions

### pnpm Not Found
- **Issue**: pnpm command not recognized
- **Solution**: Install pnpm globally: `npm install -g pnpm`

### MCP Server Build Failures
- **Issue**: TypeScript compilation errors
- **Solution**: Ensure all dependencies installed, check tsconfig.json

### Email Dependencies
- **Issue**: nodemailer authentication failures
- **Solution**: Verify Gmail app password configuration

## 📚 Additional Resources

- **Node.js**: https://nodejs.org/
- **pnpm**: https://pnpm.io/
- **Inkeep SDK**: https://docs.inkeep.com/
- **TypeScript**: https://www.typescriptlang.org/
- **Express.js**: https://expressjs.com/
- **Nodemailer**: https://nodemailer.com/

## 🔄 Dependency Updates

### Checking for Updates
```bash
# Check outdated Node.js packages
pnpm outdated

# Check outdated Python packages
pip list --outdated
```

### Updating Dependencies
```bash
# Update Node.js dependencies
pnpm update

# Update Python dependencies
pip install --upgrade -r requirements.txt
```

## 📝 Notes

- This project is primarily Node.js/TypeScript based
- Python dependencies are optional for additional utilities
- MCP servers have their own dependency trees
- All dependencies are pinned to specific versions for stability
- Use pnpm for Node.js package management (not npm or yarn)
- Virtual environments recommended for Python dependencies

## ✅ Success Indicators

Dependencies are correctly installed when:
- [ ] `pnpm run dev` starts without errors
- [ ] All MCP servers build successfully
- [ ] Agent simulation runs without import errors
- [ ] Email notifications send successfully
- [ ] Rate calculations return valid results
