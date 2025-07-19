# Leetcode Study Planner Deployment Script
# This script helps deploy the application to different environments

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("Development", "Production", "Docker")]
    [string]$Environment = "Development",
    
    [Parameter(Mandatory=$false)]
    [string]$ConnectionString = "",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipTests
)

Write-Host "🚀 Leetcode Study Planner Deployment Script" -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Yellow

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check prerequisites
Write-Host "`n📋 Checking prerequisites..." -ForegroundColor Cyan

if (-not (Test-Command "dotnet")) {
    Write-Host "❌ .NET SDK not found. Please install .NET 9.0 SDK." -ForegroundColor Red
    exit 1
}

$dotnetVersion = dotnet --version
Write-Host "✅ .NET Version: $dotnetVersion" -ForegroundColor Green

# Run tests unless skipped
if (-not $SkipTests) {
    Write-Host "`n🧪 Running tests..." -ForegroundColor Cyan
    Set-Location "LeetcodeStudyPlanner.Tests"
    dotnet test
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Tests failed. Deployment aborted." -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ All tests passed!" -ForegroundColor Green
    Set-Location ".."
}

# Build the application
Write-Host "`n🔨 Building application..." -ForegroundColor Cyan
Set-Location "LeetcodeStudyPlanner"
dotnet build -c Release
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Deployment aborted." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!" -ForegroundColor Green

# Update database
Write-Host "`n🗄️ Updating database..." -ForegroundColor Cyan
dotnet ef database update
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Database update failed." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database updated!" -ForegroundColor Green

# Deploy based on environment
switch ($Environment) {
    "Development" {
        Write-Host "`n🚀 Starting development server..." -ForegroundColor Cyan
        Write-Host "Frontend: Open index.html in your browser" -ForegroundColor Yellow
        Write-Host "API: http://localhost:5214" -ForegroundColor Yellow
        Write-Host "Swagger: http://localhost:5214/swagger" -ForegroundColor Yellow
        dotnet run
    }
    
    "Production" {
        Write-Host "`n🚀 Publishing for production..." -ForegroundColor Cyan
        dotnet publish -c Release -o ./publish
        
        Write-Host "✅ Application published to ./publish" -ForegroundColor Green
        Write-Host "To run in production:" -ForegroundColor Yellow
        Write-Host "1. Copy ./publish contents to your web server" -ForegroundColor White
        Write-Host "2. Set ASPNETCORE_ENVIRONMENT=Production" -ForegroundColor White
        Write-Host "3. Configure your connection string" -ForegroundColor White
        Write-Host "4. Run: dotnet LeetcodeStudyPlanner.dll" -ForegroundColor White
    }
    
    "Docker" {
        if (-not (Test-Command "docker")) {
            Write-Host "❌ Docker not found. Please install Docker Desktop." -ForegroundColor Red
            exit 1
        }
        
        Write-Host "`n🐳 Building Docker image..." -ForegroundColor Cyan
        Set-Location ".."
        docker build -t leetcode-planner .
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Docker build failed." -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ Docker image built successfully!" -ForegroundColor Green
        Write-Host "To run with Docker Compose:" -ForegroundColor Yellow
        Write-Host "docker-compose up --build" -ForegroundColor White
        Write-Host "To run standalone:" -ForegroundColor Yellow
        Write-Host "docker run -p 8080:80 leetcode-planner" -ForegroundColor White
    }
}

Write-Host "`n🎉 Deployment completed successfully!" -ForegroundColor Green 