Write-Host "Cleaning TypeScript cache..."
if (Test-Path -Path ".\.vite") {
    Remove-Item -Path ".\.vite" -Recurse -Force
}
if (Test-Path -Path ".\node_modules\.vite") {
    Remove-Item -Path ".\node_modules\.vite" -Recurse -Force
}
if (Test-Path -Path ".\dist") {
    Remove-Item -Path ".\dist" -Recurse -Force
}
Write-Host "Cache cleaned."