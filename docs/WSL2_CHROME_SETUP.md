# WSL2 Chrome Remote Debugging Setup

## The Problem

When running the dev server in WSL2 and trying to access it from Windows Chrome:
- ✅ Dev server runs in WSL2
- ✅ Chrome DevTools MCP runs in WSL2
- ❌ Chrome browser needs to run in Windows
- ❌ Chrome needs remote debugging enabled for MCP to work

## The Solution

I've created two batch files to start Chrome with remote debugging enabled.

### Quick Start

1. **Navigate to the project folder in Windows Explorer**
   ```
   \\wsl$\Ubuntu\home\musho\projects\designsystembuilder\
   ```

2. **Run one of the batch files:**
   - Double-click `start-chrome-debug.bat` (recommended)
   - Or try `start-chrome-localhost.bat` if WSL2 port forwarding is working

3. **Chrome will open automatically** with:
   - Remote debugging enabled on port 9222
   - Your dev server loaded
   - Separate profile (won't affect your regular Chrome)

## Batch Files Explained

### `start-chrome-debug.bat` (Recommended)

Uses the **WSL2 IP address** (172.22.74.202:8080) to connect to the dev server.

**Pros:**
- ✅ Always works regardless of WSL2 port forwarding
- ✅ Direct network access to WSL2

**Cons:**
- ⚠️ IP address may change after WSL2 restart

### `start-chrome-localhost.bat` (Alternative)

Uses **localhost:8080** to connect to the dev server.

**Pros:**
- ✅ Cleaner URL
- ✅ Works if Windows port forwarding is configured

**Cons:**
- ❌ May not work if WSL2 localhost forwarding is broken
- ❌ Requires WSL2 to forward ports properly

## What These Batch Files Do

```batch
1. Kill any existing Chrome instances (to avoid conflicts)
2. Start Chrome with these flags:
   --remote-debugging-port=9222     # Enable Chrome DevTools Protocol
   --user-data-dir=%TEMP%\chrome... # Use separate profile
   --no-first-run                   # Skip first run experience
   --no-default-browser-check       # Don't ask to be default
   http://172.22.74.202:8080/       # Open your dev server
```

## Verifying It Works

### 1. Check Chrome Started Correctly

After running the batch file:
- Chrome window should open
- You should see your app at http://172.22.74.202:8080/
- Check DevTools console (F12) for any errors

### 2. Verify Remote Debugging is Enabled

In a new browser window, navigate to:
```
http://localhost:9222/json
```

You should see JSON output listing open tabs. This means remote debugging is working!

### 3. Test Claude Code Integration

Now when Claude Code uses Chrome DevTools MCP commands like:
```typescript
mcp__chrome-devtools__list_pages()
mcp__chrome-devtools__new_page()
mcp__chrome-devtools__list_console_messages()
```

They should work without "Target closed" errors!

## Troubleshooting

### Chrome won't start
- **Check Chrome path:** Make sure Chrome is installed at `C:\Program Files\Google\Chrome\Application\chrome.exe`
- **Close existing Chrome:** Close all Chrome windows and try again
- **Run as Administrator:** Right-click the .bat file and "Run as administrator"

### Can't reach the dev server
1. **Check dev server is running in WSL2:**
   ```bash
   ps aux | grep "npm run dev"
   ```

2. **Try the alternative batch file:**
   If `start-chrome-debug.bat` doesn't work, try `start-chrome-localhost.bat`

3. **Check WSL2 IP address:**
   ```bash
   hostname -I
   ```
   Update the .bat file if the IP changed.

### Remote debugging not working
1. **Check port 9222 is available:**
   ```powershell
   netstat -an | findstr 9222
   ```

2. **Kill conflicting processes:**
   Close all Chrome instances and try again

3. **Check firewall:**
   Windows Firewall might be blocking port 9222

## Manual Testing (Fallback)

If automated testing doesn't work, you can still test manually:

1. **Run either batch file** to start Chrome
2. **Open DevTools** (F12)
3. **Check Console tab** for errors
4. **Test functionality** manually
5. **Report findings** to Claude Code

## Making Life Easier

### Create Desktop Shortcut

1. Right-click `start-chrome-debug.bat`
2. Send to → Desktop (create shortcut)
3. Now you can launch with one click!

### Add to Windows Terminal

Edit your Windows Terminal settings to add a new profile:
```json
{
  "name": "Start Chrome Debug",
  "commandline": "cmd.exe /c \"cd /d \\\\wsl$\\Ubuntu\\home\\musho\\projects\\designsystembuilder && start-chrome-debug.bat\""
}
```

## Why This Setup?

**WSL2 Networking Complexity:**
- WSL2 uses a virtualized network
- `localhost` in WSL2 ≠ `localhost` in Windows (sometimes)
- Direct IP access (172.22.x.x) is more reliable
- Chrome DevTools Protocol needs cross-network access

**Separate Chrome Profile:**
- Avoids conflicts with your regular browsing
- Clean state for testing
- Won't mess with your extensions or settings

**Remote Debugging:**
- Allows Claude Code to control Chrome programmatically
- Enables automated testing workflows
- Provides better debugging capabilities

## Next Steps

1. ✅ Run `start-chrome-debug.bat`
2. ✅ Verify your app loads
3. ✅ Check console for errors
4. ✅ Tell Claude Code testing is ready!

---

**Remember:** You need to run the dev server in WSL2 (`npm run dev`) AND the batch file in Windows for everything to work together!
