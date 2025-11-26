#!/bin/bash
set -e

# Go to project directory
cd /home/whizcamp/simranproject

# Log start
echo "===== DEPLOY STARTED AT: $(date) =====" >> deploy.log

# Pull latest code
echo "--- Pulling latest code from GitHub..." >> deploy.log
git pull origin main >> deploy.log 2>&1

# Install dependencies
echo "--- Installing npm packages..." >> deploy.log
npm install >> deploy.log 2>&1

# Restart app
echo "--- Restarting PM2..." >> deploy.log
pm2 restart simranproject >> deploy.log 2>&1

# Log end
echo "===== DEPLOY FINISHED AT: $(date) =====" >> deploy.log


