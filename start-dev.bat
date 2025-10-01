@echo off
echo Starting The White Barn FL MERN Stack Application...
echo.

echo 1. Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo 2. Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo 3. Setting up environment file...
if not exist .env (
    copy .env.example .env
    echo Please edit backend/.env file with your configuration
    echo Press any key after editing the .env file...
    pause
)

echo.
echo 4. Starting backend server...
start "Backend Server" cmd /k "npm run dev"

echo.
echo 5. Starting frontend development server...
cd ..
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause
