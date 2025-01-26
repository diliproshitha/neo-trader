#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create a dist directory for Firefox if it doesn't exist
mkdir -p dist/firefox

# Copy build files to Firefox dist directory
echo "Copying files to Firefox distribution folder..."
cp -r build/* dist/firefox/
cp build/manifest_firefox.json dist/firefox/manifest.json

# Remove unnecessary manifest files
rm dist/firefox/manifest_chrome.json
rm dist/firefox/manifest_firefox.json

echo "Firefox extension bundle created successfully in dist/firefox" 