# Add and Commit with Conventional Commits

Adds all changes (including untracked files) and creates a commit using the Conventional Commits specification.

## Usage
```bash
/ac [commit message]
```

If no commit message is provided, automatically generates one based on file changes using conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style/formatting
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks
- `build:` - Build system changes
- `ci:` - CI/CD changes

## Script
```bash
#!/bin/bash

# If a message is provided, use it directly
if [ -n "$1" ]; then
    git add -A && git commit -m "$1"
    exit $?
fi

# Stage all changes first
git add -A

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "No changes to commit"
    exit 0
fi

# Analyze changes to determine commit type and description
FILES_CHANGED=$(git diff --cached --name-only)
FILES_COUNT=$(echo "$FILES_CHANGED" | wc -l)
STATS=$(git diff --cached --stat)

# Determine commit type based on file patterns
TYPE="chore"
SCOPE=""
DESC="update files"

# Check for specific file patterns
if echo "$FILES_CHANGED" | grep -qi "README\|\.md$\|LICENSE\|CLAUDE\.md"; then
    TYPE="docs"
    if echo "$FILES_CHANGED" | grep -qi "README"; then
        DESC="update README"
    elif echo "$FILES_CHANGED" | grep -qi "CLAUDE\.md"; then
        DESC="update CLAUDE.md"
    elif echo "$FILES_CHANGED" | grep -qi "LICENSE"; then
        DESC="update license"
    else
        DESC="update documentation"
    fi
elif echo "$FILES_CHANGED" | grep -qi "test\|spec\|\.test\.\|\.spec\."; then
    TYPE="test"
    DESC="update tests"
elif echo "$FILES_CHANGED" | grep -qi "package\.json\|package-lock\.json\|yarn\.lock\|requirements\.txt\|Gemfile\|go\.mod\|go\.sum\|\.csproj"; then
    TYPE="build"
    DESC="update dependencies"
elif echo "$FILES_CHANGED" | grep -qi "\.github/workflows\|\.gitlab-ci\|jenkinsfile\|\.circleci"; then
    TYPE="ci"
    DESC="update CI configuration"
elif echo "$FILES_CHANGED" | grep -qi "\.gitignore\|\.editorconfig\|\.prettierrc\|\.eslintrc"; then
    TYPE="chore"
    DESC="update configuration"
elif echo "$FILES_CHANGED" | grep -qi "\.css$\|\.scss$\|\.less$"; then
    # Check if it's just formatting or actual changes
    if git diff --cached | grep -q "^+.*{"; then
        TYPE="style"
        DESC="update styles"
    fi
elif echo "$FILES_CHANGED" | grep -qi "\.html$\|\.js$\|\.ts$\|\.tsx$\|\.jsx$\|\.vue$\|\.py$\|\.go$\|\.cs$\|\.java$"; then
    # For code files, check if it looks like a new feature or fix
    ADDITIONS=$(git diff --cached --numstat | awk '{sum+=$1} END {print sum}')
    DELETIONS=$(git diff --cached --numstat | awk '{sum+=$2} END {print sum}')

    # If mostly additions, likely a feature
    if [ "$ADDITIONS" -gt "$((DELETIONS * 2))" ]; then
        TYPE="feat"
        DESC="add new functionality"
    # If significant refactoring (both adds and deletes)
    elif [ "$DELETIONS" -gt 10 ] && [ "$ADDITIONS" -gt 10 ]; then
        TYPE="refactor"
        DESC="refactor code"
    else
        TYPE="fix"
        DESC="update implementation"
    fi
fi

# Create the commit message
COMMIT_MSG="${TYPE}: ${DESC}"

echo "Creating commit: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"
```
