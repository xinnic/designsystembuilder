# Automated Testing Workflow

## Overview

This document describes the automated testing workflow using Chrome DevTools MCP that should be followed after making non-trivial code changes to prevent runtime errors from reaching production.

## When to Test

**ALWAYS test after:**
- ✅ Token system changes
- ✅ State management modifications
- ✅ New component additions
- ✅ Hook implementations or changes
- ✅ Build configuration updates
- ✅ Any change affecting runtime behavior

**Skip testing for:**
- ❌ Documentation-only changes
- ❌ Comment updates
- ❌ Minor style tweaks
- ❌ README edits

## Quick Start

After making code changes:

```bash
# 1. Ensure dev server is running
npm run dev

# 2. Wait for build
sleep 3

# 3. Use Chrome DevTools MCP to test (via Claude Code)
# - Open http://localhost:8080/
# - Check console for errors
# - Verify core functionality
# - Take snapshot if needed
```

## Detailed Workflow

### Step 1: Start Dev Server

```bash
# Check if already running
ps aux | grep "npm run dev" | grep -v grep

# Start if needed
npm run dev
```

### Step 2: Open App with Chrome DevTools MCP

```typescript
// Claude Code command
mcp__chrome-devtools__new_page({
  url: "http://localhost:8080/",
  timeout: 10000
})
```

### Step 3: Check Console Errors

```typescript
// List all console errors
mcp__chrome-devtools__list_console_messages({
  types: ["error"],
  pageSize: 50
})

// List warnings (review these too)
mcp__chrome-devtools__list_console_messages({
  types: ["warn"],
  pageSize: 20
})
```

### Step 4: Verify Core Functionality

For this project, check:
- ✅ Token system loads without errors
- ✅ No undefined property access errors
- ✅ State initialization works correctly
- ✅ Components render without crashes
- ✅ No missing CSS variables or OKLCH errors
- ✅ Color generation works (if applicable)

### Step 5: Take Snapshot (Optional)

```typescript
// Capture current page state
mcp__chrome-devtools__take_snapshot({})
```

### Step 6: Fix Any Issues

If errors are found:
1. Note the error message and stack trace
2. Fix the issue in code
3. Wait for HMR to update
4. Re-run tests
5. Repeat until no errors

## Integration with Git Workflow

```bash
# Recommended workflow
1. Make code changes
2. ⚠️  RUN AUTOMATED TESTS (this process)
3. Fix any issues found
4. Verify tests pass
5. git add .
6. git commit -m "..."
7. git push
```

## Common Issues Caught by Testing

This workflow catches:
- Runtime type errors (undefined properties, null access)
- Missing tokens or CSS variables
- State initialization race conditions
- Component rendering errors
- Build configuration problems
- Import/export mismatches
- Console warnings about deprecated APIs

## Example Test Report

After testing, the report should include:

```
✅ Automated Test Results:
- Console Errors: 0
- Console Warnings: 1 (non-critical Tamagui warning)
- Page Load: Success
- Core Features: Working
- Visual State: Verified via snapshot

Issues Found: None
Ready to Commit: Yes
```

## Fallback: Manual Testing

If Chrome DevTools MCP is unavailable:

1. Open http://localhost:8080/ in your browser
2. Open DevTools (F12)
3. Check Console tab for errors (red messages)
4. Test core functionality manually
5. Report any issues before committing

## Success Criteria

A passing test shows:
- ✅ **0 console errors**
- ✅ **0 critical warnings**
- ✅ **Page loads successfully**
- ✅ **Core features work**
- ✅ **No visual breakage**

## Why This Matters

**Real-world impact:**
- Prevents production crashes
- Catches integration issues early
- Reduces debugging time
- Improves code quality
- Builds confidence in deployments

**Historical issues this would have caught:**
- `Cannot read properties of undefined (reading 'replace')` at primitives.ts:83
- `Cannot read properties of undefined (reading 'includes')` at useTokenSystem.ts:47
- Missing `borderColorHover` token warnings
- State property access errors in hooks

## Quick Reference

| Step | Action | Tool |
|------|--------|------|
| 1 | Start dev server | `npm run dev` |
| 2 | Open app | `new_page("http://localhost:8080/")` |
| 3 | Check errors | `list_console_messages({types: ["error"]})` |
| 4 | Check warnings | `list_console_messages({types: ["warn"]})` |
| 5 | Take snapshot | `take_snapshot()` |
| 6 | Verify features | Manual check |
| 7 | Report results | Summary |

---

**Remember:** Testing before committing saves hours of debugging later!
