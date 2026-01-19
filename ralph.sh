
#!/bin/bash
# Ralph Wiggum - Simple Autonomous AI Coding Loop
# Usage: ./ralph.sh <iterations>

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <iterations>"
    echo "Example: $0 3"
    exit 1
fi

ITERATIONS=$1
PROGRESS_FILE="progress.txt"

# Initialize progress file
if [ ! -f "$PROGRESS_FILE" ]; then
    cat > "$PROGRESS_FILE" << 'EOF'
# Ralph Progress Tracker

## Completed Tasks
- (none yet)

## Current State
Starting fresh
EOF
fi

echo "========================================"
echo "Ralph Wiggum - Starting $ITERATIONS iterations"
echo "Model: MiniMax-M2.1"
echo "========================================"
echo ""

for ((i=1; i<=ITERATIONS; i++)); do
    echo "----------------------------------------"
    echo "Iteration $i of $ITERATIONS"
    echo "----------------------------------------"

    result=$(opencode run -m opencode/minimax-m2.1-free "
You are Ralph Wiggum, an AI coding assistant.

Read the current directory to understand the project structure.
Read progress.txt to see what has been completed.
Read prd.json to understand what needs to be done.

Choose ONE task that hasn't been completed yet.
Implement the feature with small, focused changes.
Write or update tests if needed.

Then run these feedback loops in order:
1. bun tsc --noEmit
2. bunx biome check --write

If all feedback loops pass, commit your changes with a meaningful commit message.
Update progress.txt with what you completed.

If ALL tasks in prd.json are complete, output exactly: <promise>COMPLETE</promise>
" 2>&1)

    echo "$result"
    echo ""

    # Check for completion
    if echo "$result" | grep -q "<promise>COMPLETE</promise>"; then
        echo "========================================"
        echo "All tasks complete! Ralph finished successfully."
        echo "========================================"
        exit 0
    fi

    # Small delay between iterations
    sleep 2
done

echo "========================================"
echo "Reached $ITERATIONS iterations"
echo "Check progress.txt for current status"
echo "========================================"
