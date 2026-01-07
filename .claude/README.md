# .claude Directory

This directory stores session summaries and development notes from Claude Code sessions.

## Purpose

Since Claude Code chat history is not persisted across sessions, this directory serves as a persistent record of:
- Session summaries
- Key decisions made
- Code changes implemented
- Issues encountered and resolved
- Questions and answers

## File Structure

```
.claude/
├── README.md                    # This file
├── sessions/                    # Individual session logs
│   └── YYYY-MM-DD-session-N.md  # Session summary
└── quick-notes.md               # Quick notes between sessions
```

## Usage

### During a Session
When working with Claude Code, the assistant may create session summary files here to document:
- What was discussed
- What was implemented
- What decisions were made
- What remains to be done

### Between Sessions
When starting a new session:
1. Review the latest session summary in `sessions/`
2. Check `quick-notes.md` for any pending items
3. Update DEVELOPMENT_LOG.md with major changes

## Session Summary Template

Each session file should include:
```markdown
# Session: YYYY-MM-DD [Brief Description]

## Summary
[1-2 sentence overview of what was accomplished]

## Topics Covered
- [Topic 1]
- [Topic 2]

## Files Modified
- [file path]: [what changed]

## Decisions Made
- [Decision 1 and rationale]

## Issues Encountered
- [Issue and resolution]

## Next Steps
- [ ] [Action item 1]
- [ ] [Action item 2]

## Questions for User
- [Any open questions]
```

## Best Practices

1. **Update after significant changes**: Document major decisions as they happen
2. **Link to code**: Reference specific files and line numbers
3. **Be concise**: Focus on "what" and "why", not detailed "how"
4. **Track todos**: Keep next steps clear and actionable
5. **Date everything**: Use ISO format (YYYY-MM-DD) for easy sorting

## Maintenance

- Archive old sessions after 30 days (move to `sessions/archive/`)
- Keep recent 10 sessions easily accessible
- Update DEVELOPMENT_LOG.md monthly with session highlights

---

**Note**: This directory is gitignored by default. If you want to version control session notes, remove `.claude/` from .gitignore.
