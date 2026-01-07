# Development Log - Cortex (Personal Microsoft 365 Assistant)

This document tracks all development decisions, progress, issues, and solutions for **Cortex** - your personal M365 Assistant project.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Development Timeline](#development-timeline)
3. [Architecture Decisions](#architecture-decisions)
4. [Implementation Notes](#implementation-notes)
5. [Issues & Solutions](#issues--solutions)
6. [Next Steps](#next-steps)

---

## Project Overview

**Project Name**: Cortex
**Tagline**: "Hey Cortex" - Your Personal M365 Assistant
**Goal**: Build an AI-powered desktop assistant that runs locally to automate and manage Microsoft 365 tasks.

**Key Features**:
- Email management (filter newsletters, draft responses, categorize)
- Calendar intelligence (meeting prep, AI-suggested talking points)
- Task automation (auto-create tasks from emails)
- Pattern learning (passive observation of work patterns)
- Privacy-first (all data local, no telemetry)
- Always-on-top notifications for urgent items

**Technology Stack**:
- **Frontend**: Electron + React
- **Backend**: Node.js + TypeScript
- **Microsoft 365**: Microsoft Graph API (device code flow)
- **AI**: Azure OpenAI (GPT-4o)
- **Storage**: SQLite (local pattern database)

---

## Development Timeline

### Phase 1: Foundation & Authentication ✅ COMPLETED

**Date Started**: [Initial development session]

#### Objectives
- [x] Set up project structure
- [x] Configure Azure OpenAI integration
- [x] Implement Microsoft 365 authentication (device code flow)
- [x] Test connectivity to both services

#### Key Implementation Details

**Project Structure Created**:
```
personal-m365-assistant/
├── src/
│   ├── auth/              # MSAL authentication
│   ├── ai/                # Azure OpenAI client
│   ├── connectors/        # Microsoft Graph connectors
│   ├── config/            # Configuration management
│   └── main.ts            # Entry point with 4-step validation
├── .env                   # Environment variables (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

**Configuration Management** ([app.config.ts](src/config/app.config.ts)):
- Environment variable loading via dotenv
- Validation function to ensure required variables are set
- Separated concerns: Azure OpenAI, App settings, MS Graph
- Using Azure CLI public client ID for device code flow

**Authentication System** ([MsalAuthProvider.ts](src/auth/MsalAuthProvider.ts)):
- Device code flow implementation (no app registration needed)
- Silent token acquisition with automatic refresh
- Token caching for performance
- Sign out capability with cache clearing
- User-friendly authentication prompts with formatted output

**Entry Point** ([main.ts](src/main.ts)):
- 4-step validation process:
  1. Configuration validation
  2. Azure OpenAI connection test
  3. Microsoft 365 authentication
  4. Microsoft Graph API connection test
- Graceful error handling with clear user feedback
- Formatted console output for better UX

**Dependencies Installed**:
- `@azure/msal-node` (v2.15.0) - Microsoft authentication
- `@microsoft/microsoft-graph-client` (v3.0.7) - Graph API client
- `openai` (v6.15.0) - Azure OpenAI SDK
- `dotenv` (v16.4.5) - Environment variable management
- `better-sqlite3` (v11.7.0) - Local database
- `electron` (v28.3.3) - Desktop app framework
- `typescript` (v5.7.2) - Type safety

**Environment Variables Configured** ([.env](.env)):
```
AZURE_OPENAI_ENDPOINT=https://m365-assistant-project-resource.cognitiveservices.azure.com/
AZURE_OPENAI_API_KEY=[CONFIGURED]
AZURE_OPENAI_DEPLOYMENT=gpt-4o
AZURE_OPENAI_API_VERSION=2025-01-01-preview
POLLING_INTERVAL_MINUTES=15
LOG_LEVEL=info
DATA_RETENTION_DAYS=90
```

#### Design Decisions

**Decision 1: Device Code Flow Authentication**
- **Rationale**: No app registration required, works with work/personal accounts
- **Alternative Considered**: Interactive browser flow
- **Trade-offs**: Slightly more user steps, but better for local apps
- **Outcome**: Clean authentication experience without Azure AD setup

**Decision 2: Azure CLI Public Client ID**
- **Client ID**: `04b07795-8ddb-461a-bbee-02f9e1bf7b46`
- **Rationale**: Well-known public client, no registration needed
- **Scopes Requested**: User.Read, Mail.ReadWrite, Calendars.ReadWrite, Tasks.ReadWrite, offline_access

**Decision 3: TypeScript + Node.js Backend**
- **Rationale**: Type safety, excellent Microsoft Graph SDK support
- **Trade-offs**: Compilation step required
- **Outcome**: Better developer experience and maintainability

**Decision 4: Local-First Architecture**
- **Rationale**: Privacy concerns, no cloud dependencies for data storage
- **Storage**: SQLite for patterns/metadata
- **Security**: Tokens cached locally, encrypted by OS

#### Testing
- **Status**: Not yet implemented
- **Commands**: `npm run test` configured but no tests written
- **Planned**: Unit tests for connectors, integration tests for workflows

---

### Phase 2: Microsoft 365 Connectors 🔄 NEXT

**Status**: Not started

#### Planned Objectives
- [ ] Email connector (retrieve, categorize, draft responses)
- [ ] Calendar connector (read events, create reminders)
- [ ] Tasks connector (create, update tasks)
- [ ] Basic data retrieval and display

#### Open Questions
1. Should we implement rate limiting for Graph API calls?
2. How frequently should we poll for new items?
3. What metadata should we store locally vs. fetch on-demand?

---

### Phase 3: Pattern Learning Engine 📅 PLANNED

**Status**: Not started

#### Planned Objectives
- [ ] Activity monitor (track user interactions)
- [ ] Pattern detection algorithms
- [ ] SQLite database schema design
- [ ] Privacy-preserving data collection

---

### Phase 4: AI + Rule Engine 📅 PLANNED

**Status**: Not started

#### Planned Objectives
- [ ] Simple rule engine (newsletter filtering, etc.)
- [ ] AI-powered decisions (draft responses, categorization)
- [ ] Hybrid approach implementation

---

### Phase 5: Desktop GUI 📅 PLANNED

**Status**: Not started

#### Planned Objectives
- [ ] Electron + React setup
- [ ] Dashboard
- [ ] Activity feed
- [ ] Pattern insights view
- [ ] Settings panel

---

### Phase 6: Background Service 📅 PLANNED

**Status**: Not started

#### Planned Objectives
- [ ] Periodic polling mechanism
- [ ] Always-on-top notifications
- [ ] Priority task handlers

---

### Phase 7: Testing & Refinement 📅 PLANNED

**Status**: Not started

#### Planned Objectives
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization
- [ ] User feedback collection

---

## Architecture Decisions

### ADR-001: Device Code Flow for Authentication
**Date**: Initial development
**Status**: Accepted

**Context**: Need to authenticate users with Microsoft 365 without requiring app registration in Azure AD.

**Decision**: Use MSAL device code flow with Azure CLI public client ID.

**Consequences**:
- ✅ No Azure AD app registration needed
- ✅ Works with work and personal accounts
- ✅ Tokens cached locally and auto-refreshed
- ⚠️ Requires user to visit URL and enter code (extra steps)

---

### ADR-002: Local SQLite for Pattern Storage
**Date**: Initial planning
**Status**: Proposed

**Context**: Need to store learned patterns and user preferences locally.

**Decision**: Use SQLite with better-sqlite3 library.

**Consequences**:
- ✅ No cloud dependencies
- ✅ Full privacy control
- ✅ Fast queries
- ⚠️ Data only accessible on one machine (no sync)

---

### ADR-003: Azure OpenAI for AI Features
**Date**: Initial development
**Status**: Accepted

**Context**: Need AI capabilities for email categorization, response drafting, etc.

**Decision**: Use Azure OpenAI with GPT-4o deployment.

**Consequences**:
- ✅ Enterprise-grade reliability
- ✅ Data privacy (Azure region control)
- ✅ Latest GPT-4o capabilities
- ⚠️ Cost: $5-15/month estimated
- ⚠️ Requires Azure subscription

**Alternative Considered**: GPT-4o-mini for cost savings ($1-3/month)

---

## Implementation Notes

### File: src/main.ts
**Purpose**: Application entry point with connectivity validation

**Key Functions**:
- `main()`: Orchestrates 4-step validation process
- Validates config → Tests Azure OpenAI → Authenticates M365 → Tests Graph API

**Error Handling**: Process exits with code 1 on any validation failure

---

### File: src/auth/MsalAuthProvider.ts
**Purpose**: Microsoft authentication provider using MSAL

**Key Methods**:
- `authenticateDeviceCode()`: Initial authentication with user prompt
- `getAccessTokenSilent()`: Get cached/refreshed token without prompt
- `getAccessToken()`: Smart method that tries silent first, falls back to device code
- `signOut()`: Clear cached tokens

**Token Caching**: Automatic via MSAL library, stored in OS-secured location

---

### File: src/config/app.config.ts
**Purpose**: Centralized configuration management

**Key Features**:
- Environment variable loading
- Type-safe configuration object
- Validation function with error reporting
- Default values for optional settings

**Critical Variables**:
- AZURE_OPENAI_ENDPOINT (required)
- AZURE_OPENAI_API_KEY (required)
- AZURE_OPENAI_DEPLOYMENT (required)

---

### File: src/connectors/GraphClientFactory.ts
**Purpose**: Factory for creating authenticated Microsoft Graph clients

**Implementation**: Uses MSAL auth provider to inject tokens into Graph SDK client

---

## Issues & Solutions

### Issue #1: Chat History Lost After Folder Reopen
**Date**: 2026-01-07
**Status**: Addressed

**Problem**: Claude Code chat history is not persisted when closing/reopening the project folder.

**Root Cause**: Chat sessions are stored in IDE/CLI memory, not on disk.

**Solution**:
- Created DEVELOPMENT_LOG.md for persistent development notes
- Will create .claude/ directory for session summaries
- Will create CHANGELOG.md for version tracking
- Documented guidelines in README for maintaining logs

**Workaround**: Keep VS Code window open, or regularly update development log.

---

## Next Steps

### Immediate (Session Continuity)
- [x] Create DEVELOPMENT_LOG.md
- [ ] Create .claude/ directory structure
- [ ] Create CHANGELOG.md
- [ ] Update README with development log guidelines

### Phase 2 Planning
- [ ] Design Microsoft Graph connector interfaces
- [ ] Implement email retrieval connector
- [ ] Implement calendar connector
- [ ] Implement tasks connector
- [ ] Add basic data display functionality

### Technical Debt
- [ ] Add unit tests for authentication
- [ ] Add integration tests for Graph API calls
- [ ] Implement proper logging system (Winston/Pino)
- [ ] Add error tracking and monitoring
- [ ] Document API interfaces with JSDoc

### Questions to Resolve
1. Should we implement incremental sync or full refresh for emails/calendar?
2. What's the optimal polling interval for different data types?
3. How should we handle rate limiting from Microsoft Graph API?
4. Should we implement a queue system for API calls?
5. What email metadata should we store vs. fetch on-demand?

---

## Cost Tracking

### Azure Resources
- **Azure OpenAI (GPT-4o)**: Estimated $5-15/month
  - Based on moderate usage (email categorization, response drafting)
  - Alternative: GPT-4o-mini at $1-3/month

### Total Estimated Monthly Cost: $5-15

---

## Security & Privacy Notes

### Security Measures
- ✅ All API keys stored in .env (gitignored)
- ✅ Tokens cached by OS (Windows Credential Manager)
- ✅ No telemetry or external data sharing
- ✅ Email content never stored (only metadata)
- ✅ SQLite database local only

### Privacy Guarantees
- All data processing happens locally
- No user data sent to external services except:
  - Microsoft Graph API (required for M365 access)
  - Azure OpenAI (required for AI features)
- Users can clear all learned patterns anytime
- No analytics or tracking

---

## Development Environment

### Prerequisites
- Node.js 18+ (v18.0.0+)
- Azure subscription with OpenAI deployed
- Microsoft 365 account (work or personal)

### Commands
- `npm run dev`: Build and run with Electron
- `npm run build`: Compile TypeScript
- `npm run watch`: Watch mode for development
- `npm run lint`: Run ESLint
- `npm run test`: Run Jest tests (not yet implemented)

### Development Tools
- TypeScript 5.7.2
- ESLint 8.57.1
- VS Code (recommended IDE)

---

## Session Notes

### Session: 2026-01-07
**Topics Covered**:
- Reviewed project structure and current status
- Identified chat history persistence issue
- Created development log system for continuity

**Files Modified**:
- Created: DEVELOPMENT_LOG.md

**Decisions Made**:
- Implement persistent logging system
- Use markdown for easy version control
- Separate CHANGELOG for version releases

---

## Appendix

### Useful Links
- [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/)
- [MSAL Node Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node)
- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)

### Project Repository
- **Location**: `c:\Users\saali\OneDrive - Microsoft\Documents\personal-m365-assistant`
- **Git**: Not initialized yet
- **Version**: 0.1.0

---

**Last Updated**: 2026-01-07
**Current Phase**: Phase 1 Complete, Phase 2 Next
**Maintained By**: Development sessions with Claude Code
