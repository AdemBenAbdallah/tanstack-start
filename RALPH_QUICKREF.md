# Ralph Wiggum - Quick Reference Card

## One-Line Summary

Use Zed's AI chat with the Ralph Wiggum system prompt to implement features one story at a time, keeping CI green and tracking progress in files.

---

## 🚀 Quick Start

```
1. Open project:       zed /home/adem/Work/tanstack-start
2. Open AI Panel:      Cmd+Shift+P → "Toggle AI Panel"
3. Load Prompt:        Paste .claude/ralph-prompt.md into chat
4. Begin:              "Start working on the highest priority story"
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `prd.json` | User stories with priority, status, acceptance criteria |
| `progress.txt` | Append-only progress log (timestamp + description) |
| `.claude/ralph-prompt.md` | System prompt with rules and workflow |

---

## 📋 Story Format (prd.json)

```json
{
  "id": "story-1",
  "priority": 1,
  "title": "Feature name",
  "description": "What to build",
  "passes": false,
  "acceptance_criteria": [
    "Criterion 1",
    "Criterion 2"
  ]
}
```

---

## 🔄 The Ralph Loop

```
┌─────────────────────────────────────────────┐
│  1. AI reads prd.json + progress.txt        │
│  2. AI picks highest priority story         │
│  3. AI makes focused code changes           │
│  4. AI runs: bun run check | test | lint    │
│  5. AI commits with clear message           │
│  6. AI appends to progress.txt              │
│  7. IF story done → <promise>COMPLETE</promise> │
│  8. Start fresh session (repeat)            │
└─────────────────────────────────────────────┘
```

---

## ✅ Must-Run Commands (After Every Change)

```bash
bun run check    # TypeScript types
bun run test     # Unit tests
bun run lint     # Linting
```

**ALL must pass before committing.**

---

## 🎯 Completion Signals

### Story Complete:
```
<promise>COMPLETE</promise>
```

### Partial Progress:
```
[PROGRESS]
- What you accomplished
- What remains to be done
[/PROGRESS]
```

---

## 📝 Progress Entry Format

```
[YYYY-MM-DD HH:MM:SS] Completed: <description>
```

**Only append, never overwrite.**

---

## 🏃‍♂️ Zed Shortcuts

| Key | Action |
|-----|--------|
| `Cmd+Shift+P` | Command palette |
| `Cmd+K` | Inline AI generation |
| `Cmd+Shift+A` | AI chat panel |
| `Cmd+`` | Toggle terminal |
| `Cmd+P` | Quick file open |
| `Cmd+B` | File browser |
| `Cmd+Shift+G` | Git panel |

---

## 📊 Status Check Commands

```bash
# Check pending stories
grep -c '"passes": false' prd.json

# View recent progress
tail -20 progress.txt

# View current story
cat prd.json | jq '.stories[] | select(.passes == false) | .title' | head -1
```

---

## ⚠️ Rules Summary

**DO:**
- ✅ Read prd.json first
- ✅ Work on ONE story at a time
- ✅ Keep changes small and focused
- ✅ Run tests after every change
- ✅ Commit with clear messages
- ✅ Append to progress.txt

**DON'T:**
- ❌ Skip running tests
- ❌ Overwrite progress.txt
- ❌ Work on multiple stories
- ❌ Commit broken code
- ❌ Emit COMPLETE unless truly done

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| AI forgets context | Reload prompt from .claude/ralph-prompt.md |
| Tests failing | Run manually, share error with AI |
| AI off track | "Please focus only on current story" |
| Context limit | Say: "Summarize and stop" |
| Need to pause | Report in [PROGRESS] format |

---

## 📈 Workflow Example

```
Day 1, Session 1:
  → AI reads prd.json (story-1 incomplete)
  → Implements routes
  → Tests pass, commits
  → Updates progress.txt
  → "<promise>COMPLETE</promise>"

Day 1, Session 2:
  → AI reads prd.json, progress.txt
  → story-1 done, finds story-2
  → Implements SSR
  → Tests pass, commits
  → Partial progress, needs to stop

Day 2, Session 1:
  → AI reads prd.json, progress.txt
  → Continues story-2
  → Completes, commits
  → Marks story-2 as done in prd.json
  → Starts story-3
```

---

## 💡 Pro Tips

1. **Keep stories small** - 1-4 hours max
2. **Specific criteria** - "Works" isn't enough
3. **Fresh sessions** - Each AI has full context from files
4. **Small commits** - Easier to debug and review
5. **Check progress** - Read progress.txt to understand history

---

## 🔗 Related Files

- `.claude/ralph-prompt.md` - Full system prompt
- `prd.json` - Stories database
- `progress.txt` - Progress log
- `RALPH_README.md` - Full documentation

---

**Remember:** Small steps, green CI, track everything. Ship code while you sleep.
