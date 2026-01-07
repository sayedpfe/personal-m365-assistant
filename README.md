# Cortex - Your Personal Microsoft 365 Assistant

Meet **Cortex** - your AI-powered desktop assistant that runs locally on your machine to help automate and manage your Microsoft 365 tasks. Just say "Hey Cortex" and get intelligent help with your emails, calendar, and tasks.

## Features

- 📧 **Email Management**: Automatically filter newsletters, draft responses, categorize messages
- 📅 **Calendar Intelligence**: Meeting prep reminders with AI-suggested talking points
- ✅ **Task Automation**: Auto-create tasks from emails with action items
- 🧠 **Pattern Learning**: Learns your work patterns over time (passive observation)
- 🔐 **Privacy First**: All data stays local, no telemetry
- 🎯 **Always-on-top Notifications**: Urgent alerts for important items

## Technology Stack

- **Frontend**: Electron + React (desktop GUI)
- **Backend**: Node.js + TypeScript
- **Microsoft 365**: Microsoft Graph API (device code flow - no app registration needed)
- **AI**: Azure OpenAI (GPT-4o)
- **Storage**: SQLite (local pattern database)

## Setup

### Prerequisites

- Node.js 18+ installed
- Azure subscription with Azure OpenAI deployed
- Microsoft 365 account (work or personal)

### Installation

1. **Install dependencies**:
   ```bash
   cd "C:\Users\saali\OneDrive - Microsoft\Documents\personal-m365-assistant"
   npm install
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Add your Azure OpenAI credentials:
     ```
     AZURE_OPENAI_ENDPOINT=your-endpoint
     AZURE_OPENAI_API_KEY=your-api-key
     AZURE_OPENAI_DEPLOYMENT=gpt-4o
     ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Run Phase 1 - Test connectivity**:
   ```bash
   npm run dev
   ```

## Development Phases

### ✅ Phase 1: Foundation & Authentication (Current)
- [x] Project structure setup
- [x] Azure OpenAI integration
- [x] Microsoft 365 authentication (device code flow)
- [x] Test connectivity

### 🔄 Phase 2: Microsoft 365 Connectors (Next)
- [ ] Email connector
- [ ] Calendar connector
- [ ] Tasks connector
- [ ] Basic data retrieval

### 📅 Phase 3: Pattern Learning Engine
- [ ] Activity monitor
- [ ] Pattern detection
- [ ] SQLite database
- [ ] Privacy-preserving data collection

### 🤖 Phase 4: AI + Rule Engine
- [ ] Simple rule engine (newsletter filtering, etc.)
- [ ] AI-powered decisions (draft responses, categorization)
- [ ] Hybrid approach implementation

### 🖥️ Phase 5: Desktop GUI
- [ ] Electron + React setup
- [ ] Dashboard
- [ ] Activity feed
- [ ] Pattern insights
- [ ] Settings

### ⚙️ Phase 6: Background Service
- [ ] Periodic polling
- [ ] Always-on-top notifications
- [ ] Priority task handlers

### 🧪 Phase 7: Testing & Refinement
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance optimization
- [ ] User feedback

## Project Structure

```
personal-m365-assistant/
├── src/
│   ├── auth/              # MSAL authentication
│   ├── ai/                # Azure OpenAI client
│   ├── connectors/        # Microsoft Graph connectors
│   ├── learning/          # Pattern detection
│   ├── rules/             # Rule engine
│   ├── service/           # Background service
│   ├── ui/                # Electron + React UI
│   ├── config/            # Configuration
│   └── main.ts            # Entry point
├── .env                   # Environment variables (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

## Authentication

This assistant uses **device code flow** for Microsoft 365 authentication:
- No app registration needed
- You authenticate as yourself (delegated permissions)
- Works with work or personal Microsoft accounts
- Tokens cached locally and auto-refreshed

## Privacy & Security

- ✅ All data stored locally (SQLite)
- ✅ No telemetry or external data sharing
- ✅ Email content never stored (only metadata)
- ✅ Tokens encrypted in Windows Credential Manager
- ✅ You can clear all learned patterns anytime

## Cost Estimate

With moderate usage:
- **Azure OpenAI (GPT-4o)**: $5-15/month
- **Azure OpenAI (GPT-4o-mini)**: $1-3/month

## Development Documentation

This project maintains several documentation files to preserve context across development sessions:

### For Developers
- **[DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md)**: Comprehensive development history, decisions, and implementation notes
  - Full project timeline and phase completion status
  - Architecture Decision Records (ADRs)
  - Technical implementation details
  - Issues encountered and solutions
  - Open questions and next steps

- **[.claude/sessions/](.claude/sessions/)**: Individual session summaries
  - Quick reference for recent work
  - Session-specific decisions and changes
  - Links to modified files

- **[CHANGELOG.md](CHANGELOG.md)**: Version-based release notes
  - User-facing changes
  - Version history
  - Breaking changes and migrations

### How to Resume Development

When starting a new development session:

1. Read **DEVELOPMENT_LOG.md** for complete project context
2. Check the latest file in **.claude/sessions/** for recent changes
3. Review **Next Steps** section in DEVELOPMENT_LOG.md
4. Update session notes as you work

### Maintaining Documentation

- **After each session**: Create a new session summary in `.claude/sessions/YYYY-MM-DD-session-N.md`
- **After significant changes**: Update DEVELOPMENT_LOG.md with decisions and implementations
- **Before releases**: Update CHANGELOG.md with version changes
- **Keep README current**: Update phase progress and setup instructions as needed

## License

MIT

## Author

Built with Claude Code
