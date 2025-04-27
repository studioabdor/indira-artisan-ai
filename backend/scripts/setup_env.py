import os
import secrets
from pathlib import Path

def create_env_file():
    env_content = """# Database Configuration
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=indira

# Security
SECRET_KEY={secret_key}
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Model Settings
USE_CUDA=1
MODEL_NAME=stabilityai/stable-diffusion-xl-base-1.0

# File Storage
MEDIA_ROOT=media
SKETCHES_DIR=sketches
RENDERS_DIR=renders

# AWS Configuration (Optional)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

# Server Settings
DEBUG=True
ENVIRONMENT=development
""".format(secret_key=secrets.token_urlsafe(32))

    env_path = Path(__file__).parent.parent / '.env'
    with open(env_path, 'w') as f:
        f.write(env_content)
    print(f"Created .env file at {env_path}")

def create_directories():
    base_dir = Path(__file__).parent.parent
    dirs = [
        base_dir / 'media',
        base_dir / 'media/sketches',
        base_dir / 'media/renders',
        base_dir / 'alembic/versions',
    ]
    for dir_path in dirs:
        dir_path.mkdir(parents=True, exist_ok=True)
        print(f"Created directory: {dir_path}")

if __name__ == "__main__":
    create_env_file()
    create_directories() 