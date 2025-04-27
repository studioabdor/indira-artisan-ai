#!/usr/bin/env bash
# exit on error
set -o errexit

# Backend build
cd backend
pip install -r requirements.txt

# Create required directories
mkdir -p media/sketches media/renders model_cache uploads

# Run migrations
python -m alembic upgrade head

# Frontend build
cd ../frontend
npm install
npm run build 