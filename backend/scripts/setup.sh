#!/bin/bash

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install PyTorch with CUDA support (if GPU available)
# If no GPU, the CPU version will be installed from requirements.txt
if command -v nvidia-smi &> /dev/null; then
    pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
fi

# Create necessary directories
mkdir -p media/uploads
mkdir -p media/generated

# Initialize database
alembic upgrade head

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOL
DATABASE_URL=postgresql://user:password@localhost:5432/indira_ai
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name
HUGGINGFACE_API_KEY=your_huggingface_key
JWT_SECRET=your_jwt_secret
EOL
    echo "Please update the .env file with your actual credentials"
fi

echo "Setup complete! Please:"
echo "1. Update the .env file with your actual credentials"
echo "2. Start Redis server"
echo "3. Start PostgreSQL server"
echo "4. Run the backend with: uvicorn app.main:app --reload" 