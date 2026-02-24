@echo off
REM Alternative: Start Chrome with localhost (if WSL2 port forwarding works)
REM This version tries localhost:8080 instead of WSL2 IP

echo Starting Chrome with remote debugging (localhost version)...
echo.
echo Chrome will open with:
echo - Remote debugging on port 9222
echo - Localhost dev server at http://localhost:8080/
echo.

REM Kill any existing Chrome instances to avoid conflicts
taskkill /F /IM chrome.exe 2>nul

REM Wait a moment for processes to clean up
timeout /t 2 /nobreak >nul

REM Start Chrome with debugging enabled
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --remote-debugging-port=9222 ^
  --user-data-dir="%TEMP%\chrome-debug-profile" ^
  --no-first-run ^
  --no-default-browser-check ^
  http://localhost:8080/

echo.
echo Chrome started successfully!
echo.
echo If the page doesn't load, try running start-chrome-debug.bat instead
echo (which uses the WSL2 IP address)
echo.
pause
