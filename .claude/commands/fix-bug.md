# Autonomous Bug Fixer

Fix any UI/functionality bug autonomously using browser automation.

## Usage
```
/fix-bug "bug description"
```

## Examples
- `/fix-bug "logo not displaying on dev server"`
- `/fix-bug "submit button doesn't work"`
- `/fix-bug "console errors on page load"`
- `/fix-bug "mobile menu not opening"`
- `/fix-bug "layout broken on tablet view"`

## What This Command Does

1. **Analyzes the bug description** to understand:
   - What element/feature is affected
   - What the expected behavior should be
   - What symptoms are occurring

2. **Sets up browser automation**:
   - Detects VSCode dev server port (3000, 5500, 8080, 5173)
   - Launches Playwright browser via MCP
   - Navigates to the local development site
   - Opens DevTools for inspection

3. **Diagnoses the issue** based on bug type:
   - **Visual bugs**: Check element visibility, CSS properties, asset paths
   - **Functional bugs**: Verify event listeners, form validation, JavaScript errors
   - **Console errors**: Capture error messages, check network 404s, validate syntax
   - **Responsive bugs**: Test different viewports, check media queries

4. **Applies smart fixes**:
   - Edits HTML/CSS/JavaScript files directly
   - Tries multiple solution approaches if needed
   - Uses proven fix patterns for common issues

5. **Verifies the fix**:
   - Waits for VSCode Live Server auto-reload
   - Re-runs diagnostic checks
   - Takes before/after screenshots
   - Confirms issue is resolved

6. **Reports results** with:
   - Root cause explanation
   - Files and lines changed
   - Verification evidence
   - Rollback instructions if needed

## Bug Pattern Recognition

The command recognizes these patterns:

| Keywords | Diagnosis Focus | Common Fixes |
|----------|----------------|--------------|
| "logo", "image", "icon", "not displaying" | Asset paths, SVG attributes | Fix paths, remove fill="none", add display:block |
| "button", "click", "submit", "not working" | Event handlers, disabled states | Add listeners, fix syntax, remove disabled |
| "error", "console", "undefined" | JavaScript errors | Add null checks, fix references, catch errors |
| "mobile", "responsive", "tablet" | Viewport, media queries | Fix breakpoints, add viewport meta |
| "layout", "overlap", "position" | CSS positioning, z-index | Fix position values, adjust z-index |
| "slow", "performance", "loading" | Network, bundle size | Optimize assets, add lazy loading |

## Implementation

```bash
# Use the Task tool with Playwright MCP to:
# 1. Detect dev server port
# 2. Launch browser and navigate to site
# 3. Diagnose the specific issue
# 4. Apply targeted fixes
# 5. Verify and report results

# The command will use these MCP tools:
# - mcp_playwright_navigate
# - mcp_playwright_evaluate
# - mcp_playwright_screenshot
# - mcp_playwright_click/fill/etc

# And these file tools:
# - Read (to inspect code)
# - Edit (to fix issues)
# - Grep (to find patterns)
```

## Safety Features

- Creates git stash before making changes
- Tests fixes on local dev server only
- Provides rollback instructions
- Never pushes to production
- Keeps audit log of all changes

## Current Known Issues

This command is particularly useful for fixing:
- SVG logos not rendering (fill="none" issues)
- Path resolution problems between file:// and http://
- Event handlers not attaching properly
- CSS display issues
- Console errors from undefined variables
- Responsive layout problems

## Notes

- Requires VSCode with Live Server or similar dev server running
- Playwright MCP must be configured in `.claude/mcp_settings.json`
- Works best with single-page applications
- Can handle both inline and external assets