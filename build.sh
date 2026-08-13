#!/usr/bin/env bash
# exit on error
set -o errexit

echo "=== 1. Installing Python Dependencies ==="
pip install --upgrade pip
pip install -r backend/requirements.txt

echo "=== 2. Building Vite React Frontend ==="
cd frontend
npm install
npm run build
cd ..

echo "=== Build Complete! Single-Service Bundle Ready ==="
