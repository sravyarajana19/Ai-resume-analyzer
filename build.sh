#!/usr/bin/env bash
set -o errexit

echo "=== Installing Python Dependencies ==="
pip install --upgrade pip
pip install -r backend/requirements.txt

if command -v npm &> /dev/null
then
    echo "=== Building Frontend with NPM ==="
    cd frontend && npm install && npm run build && cd ..
fi

echo "=== Build Complete! Static Bundle Ready ==="

