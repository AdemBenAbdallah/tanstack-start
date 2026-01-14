#!/bin/bash

# ============================================================================
# Ralph Wiggum - Long-Running AI Coding Agent Orchestrator
# ============================================================================
# This script runs a coding agent repeatedly until all tasks are complete.
# It ensures incremental progress, keeps CI green, and manages context windows.
# ============================================================================

set -euo pipefail

# Configuration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
readonly MAX_ITERATIONS="${RALPH_MAX_ITERATIONS:-10}"
readonly AGENT_TYPE="${RALPH_AGENT_TYPE:-claude-code}"
readonly PRD_FILE="${PROJECT_ROOT}/prd.json"
readonly PROGRESS_FILE="${PROJECT_ROOT}/progress.txt"
readonly PROMPT_FILE="${PROJECT_ROOT}/.claude/ralph-prompt.md"
readonly COMPLETE_MARKER="<promise>COMPLETE</promise>"

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# ============================================================================
# Utility Functions
# ============================================================================

log_info() {
    echo -e "${BLUE}[RALPH]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[RALPH]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[RALPH]${NC} $1"
}

log_error() {
    echo -e "${RED}[RALPH]${NC} $1" >&2
}

timestamp() {
    date '+%Y-%m-%d %H:%M:%S'
}

append_progress() {
    local message="$1"
    echo "[$(timestamp)] ${message}" >> "${PROGRESS_FILE}"
    log_info "Progress: ${message}"
}

count_pending_stories() {
    local count
    count=$(grep -o '"passes": false' "${PRD_FILE}" | wc -l || echo "0")
    echo "${count}"
}

get_highest_priority_story() {
    local story
    story=$(jq -r '.stories | sort_by(.priority) | .[] | select(.passes == false) | "ID: \(.id)\nTitle: \(.title)\nDescription: \(.description)\nAcceptance Criteria: \(.acceptance_criteria | join("; "))"' "${PRD_FILE}" | head -n 15 || echo "")
    echo "${story}"
}

update_story_status() {
    local story_id="$1"
    local status="$2"  # "passes" or "fails"

    # Update the passes field in PRD
    if [ "${status}" = "passes" ]; then
        jq --arg id "${story_id}" '.stories[] | select(.id == $id) | .passes = true | .status = "completed"' "${PRD_FILE}" > "${PRD_FILE}.tmp" && mv "${PRD_FILE}.tmp" "${PRD_FILE}"
    fi

    append_progress "Story ${story_id} marked as: ${status}"
}

cleanup() {
    log_warn "Cleaning up..."
    # Kill any background processes
    jobs -p | xargs -r kill 2>/dev/null || true
}

trap cleanup EXIT

# ============================================================================
# Agent Execution Functions
# ============================================================================

build_prompt() {
    local iteration="$1"
    local story="$2"

    cat > "${PROMPT_FILE}.temp" << EOF
# Ralph Wiggum - AI Coding Agent Task

## Iteration
This is iteration ${iteration} of ${MAX_ITERATIONS}.

## Current Task
${story}

## Priority Order
You MUST work on the highest priority story that has \`passes: false\` in the PRD.

## Progress Context
$(cat "${PROGRESS_FILE}" 2>/dev/null || echo "No progress yet.")

## Your Responsibilities

1. **Scope Work Small**: Break this story into the smallest possible unit of work that can be completed and tested.

2. **Make Progress**: Commit your work incrementally. After each meaningful change:
   - Run \`bun run check\` (type checking)
   - Run \`bun run test\` (unit tests)
   - Run \`bun run lint\` (linting)
   - ALL must pass before committing

3. **Track Progress**: Append to progress.txt in format:
   \`[TIMESTAMP] Completed: <description of work>\`

4. **Exit Condition**:
   - If you COMPLETE the current story and there are NO remaining stories with \`passes: false\`, reply with ONLY:
   \`<promise>COMPLETE</promise>\`
   - If you complete this story but others remain, continue to next story
   - If you cannot complete this story, append progress explaining what was done and exit normally

5. **Never Stop Early**: Only emit \`<promise>COMPLETE</promise>\` when truly done with ALL stories.

## Important
- Keep changes focused and small
- Run tests on EVERY commit
- Use clear, descriptive commit messages
- Document what you did in progress.txt

Begin your work now. Focus on the highest priority incomplete story.
EOF

    cat "${PROMPT_FILE}.temp" > "${PROMPT_FILE}"
    rm -f "${PROMPT_FILE}.temp"
}

run_agent_claude_code() {
    local prompt="$1"

    # Using Claude Code CLI if available
    if command -v claude &> /dev/null; then
        claude --prompt "${prompt}" --no-tty
    else
        log_error "Claude Code CLI not found. Please install it first."
        return 1
    fi
}

run_agent_zed() {
    local prompt="$1"

    # Using Zed Agent if available
    if command -v zed &> /dev/null; then
        zed --agent --prompt "${prompt}"
    else
        log_error "Zed CLI not found. Please install it first."
        return 1
    fi
}

run_agent_opencode() {
    local prompt="$1"

    # OpenCode (Cline) integration
    log_info "OpenCode integration would go here"
    # opencode --prompt "${prompt}"
    return 1
}

run_agent() {
    local agent_output
    local exit_code=0

    log_info "Running ${AGENT_TYPE} agent..."

    case "${AGENT_TYPE}" in
        claude-code)
            run_agent_claude_code "$1" || exit_code=$?
            ;;
        zed|zed-agent)
            run_agent_zed "$1" || exit_code=$?
            ;;
        opencode)
            run_agent_opencode "$1" || exit_code=$?
            ;;
        *)
            log_error "Unknown agent type: ${AGENT_TYPE}"
            return 1
            ;;
    esac

    return ${exit_code}
}

# ============================================================================
# Main Loop
# ============================================================================

main() {
    log_info "Starting Ralph Wiggum - Long-Running AI Coding Agent"
    log_info "Max iterations: ${MAX_ITERATIONS}"
    log_info "Agent type: ${AGENT_TYPE}"
    log_info "Project root: ${PROJECT_ROOT}"
    echo ""

    # Validate prerequisites
    if [ ! -f "${PRD_FILE}" ]; then
        log_error "PRD file not found: ${PRD_FILE}"
        exit 1
    fi

    if [ ! -f "${PROGRESS_FILE}" ]; then
        touch "${PROGRESS_FILE}"
        cat > "${PROGRESS_FILE}" << 'EOF'
# Ralph Wiggum Progress Tracker
# This file tracks incremental progress of the AI coding agent
# Each agent run appends its progress below
# ============================================

EOF
    fi

    # Initialize Claude configuration directory
    mkdir -p "${PROJECT_ROOT}/.claude"

    local iteration=1
    local all_complete=false

    while [ ${iteration} -le ${MAX_ITERATIONS} ]; do
        log_info "=========================================="
        log_info "Iteration ${iteration}/${MAX_ITERATIONS}"
        log_info "=========================================="

        # Check remaining stories
        local pending_count
        pending_count=$(count_pending_stories)

        if [ "${pending_count}" -eq 0 ]; then
            log_success "All stories completed! Exiting."
            append_progress "ALL STORIES COMPLETED - Ralph Wiggum finished successfully!"
            all_complete=true
            break
        fi

        log_info "Pending stories: ${pending_count}"

        # Get highest priority story
        local current_story
        current_story=$(get_highest_priority_story)

        if [ -z "${current_story}" ]; then
            log_warn "No pending stories found (may be a parsing issue)"
            break
        fi

        # Build and save prompt
        build_prompt "${iteration}" "${current_story}"

        # Extract story ID for status updates
        local story_id
        story_id=$(echo "${current_story}" | grep "^ID:" | cut -d' ' -f2)

        append_progress "Starting story: ${story_id}"

        # Run the agent
        local agent_output
        agent_output=$(run_agent "${PROMPT_FILE}" 2>&1) || true

        # Log agent output
        echo "${agent_output}" >> "${PROGRESS_FILE}"

        # Check for completion
        if echo "${agent_output}" | grep -qF "${COMPLETE_MARKER}"; then
            log_success "Agent reported completion!"

            # Update PRD status
            update_story_status "${story_id}" "passes"

            # Check if all stories are now complete
            pending_count=$(count_pending_stories)
            if [ "${pending_count}" -eq 0 ]; then
                log_success "ALL STORIES COMPLETED! Ralph Wiggum finished successfully."
                append_progress "RALPH WIGGUM COMPLETE: All ${MAX_ITERATIONS} iterations finished successfully!"
                all_complete=true
                break
            fi
        else
            log_warn "Agent did not report completion."
            append_progress "Iteration ${iteration} finished - story ${story_id} needs more work"
        fi

        echo ""
        iteration=$((iteration + 1))
    done

    # Final status
    echo ""
    log_info "=========================================="
    log_info "Ralph Wiggum Execution Complete"
    log_info "=========================================="

    if [ "${all_complete}" = true ]; then
        log_success "All tasks completed successfully! 🎉"
        exit 0
    else
        local pending
        pending=$(count_pending_stories)
        log_warn "Stopped after ${MAX_ITERATIONS} iterations with ${pending} stories remaining."
        log_warn "You can run again with: RALPH_MAX_ITERATIONS=20 ./scripts/ralph.sh"
        exit 0  # Don't fail, just report
    fi
}

# Run main function
main "$@"
