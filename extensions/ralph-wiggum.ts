// Ralph Wiggum Extension for Zed
// A systematic approach to running AI coding agents incrementally

import { Extension } from "@zed/extension"
import * as fs from "fs"
import * as path from "path"

const PRD_FILE = "prd.json"
const PROGRESS_FILE = "progress.txt"
const COMPLETE_MARKER = "<promise>COMPLETE</promise>"
const MAX_ITERATIONS = 10

interface Story {
  id: string
  priority: number
  title: string
  description: string
  passes: boolean
  status: string
  acceptance_criteria: string[]
}

interface PRD {
  stories: Story[]
  metadata: {
    total_stories: number
    completed_stories: number
  }
}

export default class RalphWiggumExtension extends Extension {
  async start() {
    // Register the Ralph Wiggum command
    this.registerCommand("ralph-wiggum.start", () => this.runRalph())

    // Register a quick-start command
    this.registerCommand("ralph-wiggum.next-story", () => this.startNextStory())

    // Register progress tracking command
    this.registerCommand("ralph-wiggum.report-progress", () => this.reportProgress())

    // Register completion check command
    this.registerCommand("ralph-wiggum.check-complete", () => this.checkCompletion())

    console.log("Ralph Wiggum extension loaded")
  }

  private async runRalph() {
    const workspace = this.activeWorkspace
    if (!workspace) {
      this.showError("No workspace open")
      return
    }

    const projectPath = workspace.rootPath
    if (!projectPath) {
      this.showError("No project path found")
      return
    }

    // Check if PRD exists
    const prdPath = path.join(projectPath, PRD_FILE)
    if (!fs.existsSync(prdPath)) {
      this.showError(`PRD file not found: ${PRD_FILE}`)
      return
    }

    // Load PRD
    const prdContent = fs.readFileSync(prdPath, "utf-8")
    const prd: PRD = JSON.parse(prdContent)

    // Find highest priority incomplete story
    const incompleteStories = prd.stories
      .filter(s => !s.passes)
      .sort((a, b) => a.priority - b.priority)

    if (incompleteStories.length === 0) {
      this.showMessage("🎉 All stories completed! Ralph Wiggum is done.")
      return
    }

    const currentStory = incompleteStories[0]

    // Build the prompt for the AI
    const prompt = this.buildRalphPrompt(currentStory, prd, projectPath)

    // Open AI panel with the prompt
    await this.openAIPanel(prompt)

    this.showMessage(`Started work on: ${currentStory.title} (${currentStory.id})`)
  }

  private async startNextStory() {
    // Quick command to jump to the next incomplete story
    await this.runRalph()
  }

  private buildRalphPrompt(story: Story, prd: PRD, projectPath: string): string {
    const progressPath = path.join(projectPath, PROGRESS_FILE)
    let progressContent = ""

    if (fs.existsSync(progressPath)) {
      progressContent = fs.readFileSync(progressPath, "utf-8")
    }

    return `# Ralph Wiggum - Current Task

## Current Story
**ID:** ${story.id}
**Title:** ${story.title}
**Priority:** ${story.priority}

**Description:**
${story.description}

**Acceptance Criteria:**
${story.acceptance_criteria.map((c, i) => `${i + 1}. ${c}`).join("\n")}

## Progress So Far
${progressContent || "No progress yet."}

## Your Task

1. **Work on this story ONLY** - Do not start other stories
2. **Scope it small** - Break it into the smallest testable chunk
3. **Keep CI green** - Run these commands after each change:
   \`\`\`bash
   bun run check
   bun run test
   bun run lint
   \`\`\`
4. **Commit your work** - Use clear commit messages
5. **Track progress** - Append to progress.txt

## When Complete

When this story's acceptance criteria are ALL met AND all checks pass:

Reply with ONLY:
\`<promise>COMPLETE</promise>\`

If you make partial progress but need to stop:
\`\`\`
[PROGRESS]
- What you accomplished
- What remains to be done
[/PROGRESS]
\`\`\`

## Remember
- One story at a time
- Keep CI green
- Commit often
- Document progress

Begin working on this story now.`
  }

  private async openAIPanel(prompt: string) {
    // Open the AI panel with our Ralph Wiggum prompt
    await this.app.commands.execute("ai.toggle-panel")

    // Wait for panel to open, then set the prompt
    setTimeout(() => {
      const aiPanel = document.querySelector("[data-ai-panel]")
      if (aiPanel) {
        const input = aiPanel.querySelector("textarea") as HTMLTextAreaElement
        if (input) {
          input.value = prompt
          input.dispatchEvent(new Event("input", { bubbles: true }))
        }
      }
    }, 100)
  }

  private async reportProgress() {
    const workspace = this.activeWorkspace
    if (!workspace) {
      this.showError("No workspace open")
      return
    }

    const projectPath = workspace.rootPath
    if (!projectPath) return

    // Prompt for progress update
    const progress = await this.app.prompts.input({
      title: "Report Progress",
      message: "What did you accomplish?",
      placeholder: "Describe your progress..."
    })

    if (progress) {
      const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19)
      const entry = `[${timestamp}] ${progress}\n`

      const progressPath = path.join(projectPath, PROGRESS_FILE)
      fs.appendFileSync(progressPath, entry)

      this.showMessage("Progress recorded ✅")
    }
  }

  private async checkCompletion() {
    const workspace = this.activeWorkspace
    if (!workspace) return

    const projectPath = workspace.rootPath
    if (!projectPath) return

    // Read current story from PRD
    const prdPath = path.join(projectPath, PRD_FILE)
    const prdContent = fs.readFileSync(prdPath, "utf-8")
    const prd: PRD = JSON.parse(prdContent)

    const incomplete = prd.stories.filter(s => !s.passes)

    if (incomplete.length === 0) {
      this.showMessage("🎉 ALL STORIES COMPLETE! Great work!")
    } else {
      const current = incomplete.sort((a, b) => a.priority - b.priority)[0]
      this.showMessage(`Still working on: ${current.title} (${incomplete.length} remaining)`)
    }
  }

  private showMessage(message: string) {
    this.app.notifications.show({
      title: "Ralph Wiggum",
      message,
      style: "info"
    })
  }

  private showError(message: string) {
    this.app.notifications.show({
      title: "Ralph Wiggum Error",
      message,
      style: "error"
    })
  }
}
