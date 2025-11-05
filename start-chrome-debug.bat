@echo off
REM Start Chrome with Remote Debugging for Claude Code DevTools MCP
REM This allows automated testing via Chrome DevTools Protocol

echo Starting Chrome with remote debugging...
echo.
echo Chrome will open with:
echo - Remote debugging on port 9222
echo - WSL2 dev server at http://172.22.74.202:8080/
echo.

REM Kill any existing Chrome instances to avoid conflicts
taskkill /F /IM chrome.exe 2>nul

REM Wait a moment for processes to clean up
timeout /t 2 /nobreak >nul

REM Start Chrome with debugging enabled
REM Using a separate user data directory to avoid conflicts with your regular Chrome
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --remote-debugging-port=9222 ^
  --user-data-dir="%TEMP%\chrome-debug-profile" ^
  --no-first-run ^
  --no-default-browser-check ^
  http://172.22.74.202:8080/

echo.
echo Chrome started successfully!
echo.
echo Now you can:
echo 1. Test your app in the Chrome window that just opened
echo 2. Claude Code can use Chrome DevTools MCP to automatically test
echo.
echo To stop: Just close the Chrome window
echo.
pause
