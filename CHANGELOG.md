# Changelog

All notable changes to **Cortex** (Personal Microsoft 365 Assistant) project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Email connector for reading and categorizing messages
- Calendar connector for reading events and creating reminders
- Tasks connector for managing Microsoft To-Do items
- Pattern learning engine
- Desktop GUI with Electron + React

## [0.1.0] - 2026-01-07

### Added
- **Project Name**: Cortex - "Hey Cortex" personal M365 assistant
- Initial project structure with TypeScript + Node.js
- Azure OpenAI integration with GPT-4o support
- Microsoft 365 authentication using device code flow (MSAL)
- Microsoft Graph API client factory
- Environment-based configuration management with validation
- Four-step connectivity validation process
- Development logging system for session continuity
- Comprehensive documentation (README, DEVELOPMENT_LOG, session tracking)

### Infrastructure
- TypeScript 5.7.2 configuration
- ESLint setup for code quality
- Package dependencies:
  - @azure/msal-node (v2.15.0)
  - @microsoft/microsoft-graph-client (v3.0.7)
  - openai (v6.15.0)
  - dotenv (v16.4.5)
  - better-sqlite3 (v11.7.0)
  - electron (v28.3.3)

### Configuration
- Azure OpenAI endpoint and API key setup
- Microsoft Graph scopes: User.Read, Mail.ReadWrite, Calendars.ReadWrite, Tasks.ReadWrite
- App settings: polling interval, log level, data retention
- Using Azure CLI public client ID for device code flow

### Documentation
- README.md with feature overview and setup instructions
- DEVELOPMENT_LOG.md for comprehensive development history
- .claude/ directory for session tracking
- Session summary template and guidelines
- Architecture Decision Records (ADRs)

### Security
- Environment variables for sensitive data (.env gitignored)
- Token caching with OS-level security
- Privacy-first design (all data local)
- No telemetry or external data sharing

## [0.0.0] - Initial Planning

### Planning
- Defined 7-phase development roadmap
- Identified technology stack
- Estimated costs and resource requirements
- Defined privacy and security requirements

---

## Release Notes Format

### Version Numbers
- **Major (X.0.0)**: Breaking changes, major feature releases
- **Minor (0.X.0)**: New features, backward compatible
- **Patch (0.0.X)**: Bug fixes, minor improvements

### Change Categories
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Features marked for removal
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements
- **Infrastructure**: Development and build changes
- **Documentation**: Documentation changes

---

**Note**: This project is currently in active development (pre-1.0.0). The API and features may change between versions.
