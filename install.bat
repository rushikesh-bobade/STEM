@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
echo Installing dependencies...
set PATH=C:\Program Files\nodejs;%PATH%
npm install --prefer-offline --no-audit --no-fund
if %ERRORLEVEL% neq 0 (
  echo Installation failed with error code %ERRORLEVEL%
  exit /b %ERRORLEVEL%
)
echo Installation complete
