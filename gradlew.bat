@echo off
setlocal
set GRADLE_VERSION=8.7
set BASE_DIR=%~dp0
set CACHE_DIR=%USERPROFILE%\.gradle\wrapper\dists\gradle-%GRADLE_VERSION%-bin
set GRADLE_HOME=%CACHE_DIR%\gradle-%GRADLE_VERSION%
if not exist "%GRADLE_HOME%\bin\gradle.bat" (
  if not exist "%CACHE_DIR%" mkdir "%CACHE_DIR%"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -Uri 'https://services.gradle.org/distributions/gradle-%GRADLE_VERSION%-bin.zip' -OutFile '%CACHE_DIR%\gradle.zip'"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -Force '%CACHE_DIR%\gradle.zip' '%CACHE_DIR%'"
  del /q "%CACHE_DIR%\gradle.zip"
)
call "%GRADLE_HOME%\bin\gradle.bat" %*
endlocal
