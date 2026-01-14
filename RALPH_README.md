# Ralph Wiggum - Long-Running AI Coding Agent for Zed

A systematic approach to running AI coding agents for hours or days while you sleep. Built specifically for **Zed's built-in AI chat agent**.

Named after Ralph Wiggum from The Simpsons because it embraces simplicity and repetition.

## The Philosophy

Ralph Wiggum works on a simple principle: **use Zed's AI chat with a structured approach, again and again, until all tasks are complete.**

Instead of one massive AI session that eventually loses track, Ralph breaks work into focused sessions. Each session:

1. Focuses on ONE story/task from the PRD
2. Makes incremental progress
3. Commits work that keeps CI green
4. Reports back to a shared progress file

## Quick Start

### 1. Open in Zed

```bash
cd /home/adem/Work/tanstack-start
zed .
```

### 2. Open the AI Chat

- Press `Cmd+Shift+P` → Type "Toggle AI Panel" → Enter
- Or press `Cmd+K` for inline generation

### 3. Load the Ralph Wiggum System Prompt

Copy the contents of `.claude/ralph-prompt.md` and paste it into the AI chat. This sets up the context and rules for Ralph.

### 4. Start Coding

Tell the AI: "I'm ready to start. Read `prd.json` and begin with the highest priority incomplete story."

## How It Works

### 1. The PRD (Product Requirements Document)

`prd.json` contains all user stories organized by priority. Each story has:

- `id`: Unique identifier (e.g., "story-1")
- `priority`: Lower number = higher priority
- `passes`: `false` means incomplete, `true` means done
- `acceptance_criteria`: What "done" looks like
- `status`: "pending" or "completed"

**Example Story:**

```json
{
  "id": "story-1",
  "priority": 1,
  "title": "Setup project structure and routing",
  "description": "Configure the initial project structure...",
  "passes": false,
  "acceptance_criteria": [
    "Project builds successfully",
    "All routes are accessible"
  ]
}
```

### 2. Progress Tracking

`progress.txt` is appended to on every session. Each entry includes:

- Timestamp
- What was accomplished
- What remains

This creates a running log that future sessions can read.

### 3. The Completion Signal

When a story (or all stories) are complete, the AI should reply with:

```
<promise>COMPLETE</promise>
```

This signals that work is done and you can start a fresh session.

### 4. Keeping CI Green

Every change MUST pass:

```bash
bun run check    # TypeScript type checking
bun run test     # Unit tests
bun run lint     # Linting
```

Open Zed's terminal with `Cmd+`` and run these before committing.

## Your Workflow in Zed

### Starting a New Session

1. **Open the project in Zed**

   ```bash
   zed /home/adem/Work/tanstack-start
   ```

2. **Open the AI Panel**
   - `Cmd+Shift+P` → "Toggle AI Panel"
   - Or `Cmd+K` for inline code generation

3. **Load the System Prompt**
   - Open `.claude/ralph-prompt.md` in a pane
   - Copy and paste into the AI chat
   - This gives the AI full context

4. **Begin Work**
   - Tell the AI: "Start working on the highest priority story"
   - The AI will read `prd.json` and `progress.txt`
   - It will pick the top incomplete story and begin

### During a Session

The AI will:

1. **Read the PRD** to understand what needs to be done
2. **Plan the work** in small, focused chunks
3. **Make changes** using Zed's editing features
4. **Run tests** in the terminal (`Cmd+``)
5. **Commit** when everything passes
6. **Update progress.txt** with what was done

### Ending a Session

When the AI needs to stop (context limit, end of day, etc.):

- If complete: Reply with `<promise>COMPLETE</promise>`
- If partial: Report what was done and what remains in `[PROGRESS]` format

### Starting Fresh

Next session, just open the AI panel again. The AI reads:

- `prd.json` - knows what stories remain
- `progress.txt` - knows what was already done
- `.claude/ralph-prompt.md` - knows the rules

**No need to re-explain context!** Each session starts fresh with full background.

## File Structure

```
tanstack-start/
├── prd.json                    # Product Requirements Document (JSON)
├── progress.txt                # Progress tracking file (auto-generated)
├── .claude/
│   └── ralph-prompt.md         # System prompt for the AI agent
├── RALPH_README.md             # This file
└── extensions/
    └── ralph-wiggum.json       # Zed extension for quick prompt loading
```

## Zed Features to Use

### AI & Chat

| Shortcut      | Action                    |
| ------------- | ------------------------- |
| `Cmd+Shift+P` | Command palette           |
| `Cmd+K`       | Inline AI code generation |
| `Cmd+Shift+A` | AI chat panel             |

### Navigation & Editing

| Shortcut    | Action                 |
| ----------- | ---------------------- |
| `Cmd+P`     | Quick file open        |
| `Cmd+B`     | Toggle file browser    |
| `Cmd+Alt+F` | Find in files          |
| `Cmd+D`     | Multi-cursor selection |

### Terminal & Git

| Shortcut      | Action          |
| ------------- | --------------- |
| `Cmd+``       | Toggle terminal |
| `Cmd+Shift+G` | Open Git panel  |
| `Cmd+Z`       | Undo            |
| `Cmd+Shift+Z` | Redo            |

## Best Practices

### For Writing Stories in prd.json

1. **Keep stories small** - A story should take 1-4 hours max
2. **Clear acceptance criteria** - How do you know it's done?
3. **Atomic scope** - Each story should be independently valuable
4. **Prioritize wisely** - High priority first

### For Running Ralph in Zed

1. **Start with a clean state** - Commit or stash any uncommitted changes
2. **Use terminal regularly** - Run tests after each change
3. **Let the AI read files** - It knows context from prd.json and progress.txt
4. **Break large tasks** - Small commits are easier to review and debug

### When Things Go Wrong

**AI hits context limit:**

- Say "Please summarize progress and stop"
- Start a fresh session - the next AI will pick up where left off

**Tests keep failing:**

- The AI should detect this and fix it
- If not, ask: "Why are tests failing? Please fix."

**AI goes off track:**

- Redirect: "Please focus only on the current story in prd.json"
- The system prompt keeps it on track

## Why This Works with Zed

### Built-in AI Integration

Zed's AI chat is always available. No external tools needed.

### Fast Context Loading

Zed is incredibly fast. Reading prd.json and progress.txt is instantaneous.

### Excellent Editing

Zed's multi-cursor and syntax-aware editing make code changes efficient.

### Terminal Integration

Built-in terminal means running tests is seamless (`Cmd+``).

### Keeps Code Healthy

The system prompt enforces test runs before commit, keeping CI green.

## Tips for Success

1. **Stories first** - Spend time on prd.json before running Ralph
2. **Be specific** - Acceptance criteria should be measurable
3. **Start fresh** - Each AI session has full context from files
4. **Check progress** - Read progress.txt to see the story of development
5. **Update honestly** - Mark stories complete only when criteria are met
6. **Small commits** - Easier to debug, review, and understand

## Example Session Flow

### Session 1 (Morning)

- AI reads prd.json, finds story-1 (highest priority)
- Implements basic routing setup
- Runs tests, commits, updates progress.txt
- Needs to stop at lunch

### Session 2 (Afternoon)

- AI reads prd.json (story-1 now has context), progress.txt
- Continues where left off, adds more routes
- Tests pass, commits, updates progress.txt
- Completes story-1, says `<promise>COMPLETE</promise>`
- You mark it as done in prd.json

### Session 3 (Next Day)

- AI reads prd.json, finds story-2 (next highest)
- Progress.txt shows story-1 is done
- Starts working on story-2
- And so on...

## Extending Ralph

### Customize the Prompt

Edit `.claude/ralph-prompt.md` to:

- Add project-specific rules
- Change test commands
- Modify the workflow

### Add More Stories

Edit `prd.json` to add new features:

```json
{
  "id": "story-11",
  "priority": 11,
  "title": "Add dark mode",
  "description": "Implement dark mode toggle...",
  "passes": false,
  "acceptance_criteria": ["Dark mode toggle works", "Persists across sessions"]
}
```

### Custom CI Checks

Edit the prompt to add more checks:

```bash
bun run check    # TypeScript
bun run test     # Unit tests
bun run lint     # Linting
bun run format   # Format check
```

## Comparison

| Approach                  | Pros                            | Cons                       |
| ------------------------- | ------------------------------- | -------------------------- |
| Single massive AI session | Deep context                    | Loses track, hits limits   |
| Ralph Wiggum in Zed       | Fresh start each time, CI green | Requires structure         |
| Claude Code CLI           | Powerful, dedicated             | External tool, costs money |
| Manual coding             | Full control                    | Time-consuming             |

## Troubleshooting

### "AI doesn't know about my project"

Make sure the AI reads:

1. `.claude/ralph-prompt.md` - the system prompt
2. `prd.json` - the stories
3. `progress.txt` - the history

### "Tests keep failing"

The AI should fix this. If not:

1. Run tests manually: `bun run test`
2. Share the error with the AI
3. Ask it to fix the issue

### "AI is doing too much"

Redirect it:

- "Please focus only on the current story"
- "Break this into smaller steps"
- "Stop and summarize progress"

## Advanced: Zed Extension

I've included a Zed extension at `extensions/ralph-wiggum.json` that provides:

- Quick command to load the Ralph prompt
- Syntax highlighting for progress.txt
- Template for new stories

To install:

1. Copy `extensions/ralph-wiggum.json` to your Zed extensions folder
2. Or just copy the prompt manually

## Summary

1. Open project in Zed
2. Open AI panel (`Cmd+Shift+P` → "Toggle AI Panel")
3. Paste the system prompt from `.claude/ralph-prompt.md`
4. Say: "Start working on the highest priority story"
5. AI reads `prd.json`, `progress.txt`, and begins
6. AI commits often, keeps CI green, updates progress
7. When done, AI says `<promise>COMPLETE</promise>`
8. Mark story complete in `prd.json`
9. Repeat with fresh session

**That's it!** Ship code while you sleep.

---

_"I'm in danger!"_ - Ralph Wiggum, probably, when he sees the bug you fixed overnight.

MIT License - Use it, modify it, ship code with it.
