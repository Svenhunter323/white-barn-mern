@echo off
echo ========================================
echo The White Barn FL - MERN Stack Setup
echo ========================================
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
echo 3. Setting up environment files...
if not exist .env (
    copy .env.example .env
    echo Backend .env file created. Please edit with your configuration.
)

cd ..
if not exist .env (
    copy .env.example .env
    echo Frontend .env file created.
)

echo.
echo 4. Would you like to migrate data from MySQL backup? (y/n)
set /p migrate="Enter choice: "
if /i "%migrate%"=="y" (
    echo Running MySQL to MongoDB migration...
    cd backend
    call npm run migrate
    if %errorlevel% neq 0 (
        echo Migration failed. You can run it later with: npm run migrate
    ) else (
        echo Migration completed successfully!
    )
    cd ..
) else (
    echo Skipping migration. You can run it later with: cd backend && npm run migrate
)

echo.
echo 5. Setup completed successfully!
echo.
echo To start the development servers:
echo   Backend:  cd backend && npm run dev
echo   Frontend: npm run dev
echo.
echo Admin Login Credentials (after migration):
echo   Email: info@thewhitebarnfl.com
echo   Password: admin123
echo.
echo Access URLs:
echo   Frontend: http://localhost:5173
echo   Backend API: http://localhost:5000
echo   Admin Panel: http://localhost:5173/admin
echo.
pause
