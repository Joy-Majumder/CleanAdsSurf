#!/usr/bin/env node

/**
 * Extension Download Generator
 * This script creates a downloadable ZIP of the extension
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const extensionDir = path.join(__dirname, 'CleanAdsSurf');
const outputDir = path.join(__dirname, 'public');
const zipFileName = 'CleanAdsSurf-Extension.zip';
const zipFilePath = path.join(outputDir, zipFileName);

// Create public directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create zip file from extension folder
try {
  console.log('Creating extension ZIP file...');
  
  // Use zip command to create archive
  execSync(`cd ${__dirname} && zip -r ${zipFilePath} CleanAdsSurf -x "CleanAdsSurf/.git/*" "CleanAdsSurf/node_modules/*"`, {
    stdio: 'inherit'
  });
  
  console.log(`✅ Extension ZIP created successfully: ${zipFilePath}`);
  console.log(`📦 File size: ${(fs.statSync(zipFilePath).size / 1024 / 1024).toFixed(2)} MB`);
  
} catch (error) {
  console.error('❌ Error creating ZIP file:', error.message);
  process.exit(1);
}
