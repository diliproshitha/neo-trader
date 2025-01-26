#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create a dist directory for Chrome if it doesn't exist
mkdir -p dist/chrome

# Copy build files to Chrome dist directory
echo "Copying files to Chrome distribution folder..."
cp -r build/* dist/chrome/
cp build/manifest_chrome.json dist/chrome/manifest.json

# Remove unnecessary manifest files
rm dist/chrome/manifest_chrome.json
rm dist/chrome/manifest_firefox.json

echo "Chrome extension bundle created successfully in dist/chrome" 