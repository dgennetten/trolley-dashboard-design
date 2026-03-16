# Deploy Fort Collins Trolley Design OS to Netlify
# Usage: .\deploy.ps1
# First run will prompt you to log in and create a site.
# Subsequent runs deploy updates to the same site.

Write-Host ""
Write-Host "=== Fort Collins Trolley - Design OS Deploy ===" -ForegroundColor Green
Write-Host ""

# Build
Write-Host "Building..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Fix errors and try again." -ForegroundColor Red
    exit 1
}
Write-Host "Build complete." -ForegroundColor Green
Write-Host ""

# Check for netlify-cli
$netlifyPath = Get-Command netlify -ErrorAction SilentlyContinue
if (-not $netlifyPath) {
    Write-Host "Installing netlify-cli..." -ForegroundColor Cyan
    npm install -g netlify-cli
}

# Deploy (draft URL for review — not production)
Write-Host "Deploying to Netlify (draft URL for review)..." -ForegroundColor Cyan
Write-Host ""
netlify deploy --dir=dist

Write-Host ""
Write-Host "Done! Share the draft URL above for review." -ForegroundColor Green
Write-Host "To deploy to production URL: netlify deploy --dir=dist --prod" -ForegroundColor Yellow
Write-Host ""
