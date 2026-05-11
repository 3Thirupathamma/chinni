@echo off
echo ==============================================
echo   EMPOWER ILLITERATE - STARTING APPLICATION
echo ==============================================
echo.
echo Installing required packages (if any)...
call npm install

echo.
echo Starting the Node.js Server...
echo The app will open in your browser automatically!
echo.
echo [ Keep this window open to keep the server running ]

start http://localhost:3000
node server.js

pause
