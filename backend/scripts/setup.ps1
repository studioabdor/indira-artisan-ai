# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install PyTorch with CUDA support (if GPU available)
# If no GPU, the CPU version will be installed from requirements.txt
if (Get-Command nvidia-smi -ErrorAction SilentlyContinue) {
    pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
}

# Create necessary directories
New-Item -ItemType Directory -Force -Path media\uploads
New-Item -ItemType Directory -Force -Path media\generated

# Initialize database
alembic upgrade head

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..."
    @"
DATABASE_URL=postgresql://user:password@localhost:5432/indira_ai
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name
HUGGINGFACE_API_KEY=your_huggingface_key
JWT_SECRET=your_jwt_secret
"@ | Out-File -FilePath .env -Encoding UTF8
    Write-Host "Please update the .env file with your actual credentials"
}

Write-Host "Setup complete! Please:"
Write-Host "1. Update the .env file with your actual credentials"
Write-Host "2. Install and start Redis server (https://github.com/microsoftarchive/redis/releases)"
Write-Host "3. Install and start PostgreSQL server (https://www.postgresql.org/download/windows/)"
Write-Host "4. Run the backend with: uvicorn app.main:app --reload" 