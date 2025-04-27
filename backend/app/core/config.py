from pydantic_settings import BaseSettings
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Indira Artisan AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment settings
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    USE_CUDA: bool = os.getenv("USE_CUDA", "True").lower() == "true"
    
    # Database settings - handle Render's DATABASE_URL
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "indira")
    SQLALCHEMY_DATABASE_URI: Optional[str] = None

    @property
    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL.replace("postgres://", "postgresql://")
        if self.SQLALCHEMY_DATABASE_URI:
            return self.SQLALCHEMY_DATABASE_URI
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}/{self.POSTGRES_DB}"

    # JWT Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    # File Storage
    MEDIA_ROOT: str = os.getenv("MEDIA_ROOT", "media")
    SKETCHES_DIR: str = os.getenv("SKETCHES_DIR", "sketches")
    RENDERS_DIR: str = os.getenv("RENDERS_DIR", "renders")

    # AI Model Settings
    MODEL_NAME: str = os.getenv("MODEL_NAME", "stabilityai/stable-diffusion-xl-base-1.0")
    DEVICE: str = "cuda" if USE_CUDA else "cpu"
    
    # CORS - handle Render's domain
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost:8080",
        "https://*.onrender.com"  # Allow Render domains
    ]
    
    # Redis - handle Render's Redis URL
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # AI Model Settings
    MODEL_PATH: str = os.getenv("MODEL_PATH", "models/")
    BATCH_SIZE: int = int(os.getenv("BATCH_SIZE", "4"))
    MAX_LENGTH: int = int(os.getenv("MAX_LENGTH", "512"))
    
    # Supported Languages
    SUPPORTED_LANGUAGES: List[str] = ["en", "hi", "ta", "bn"]
    DEFAULT_LANGUAGE: str = "en"
    
    # File Upload
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
    MAX_UPLOAD_SIZE: int = int(os.getenv("MAX_UPLOAD_SIZE", str(10 * 1024 * 1024)))  # 10MB
    
    # Architectural Styles
    ARCHITECTURAL_STYLES: List[str] = [
        "Mughal",
        "Dravidian",
        "Rajput",
        "Bengal",
        "Gujarat",
        "Kerala",
        "Kashmir",
        "Deccan",
        "Maratha",
        "Colonial"
    ]

    # Stable Diffusion Configuration
    SD_MODEL_ID: str = os.getenv("SD_MODEL_ID", "runwayml/stable-diffusion-v1-5")
    SD_CACHE_DIR: str = os.getenv("SD_CACHE_DIR", "./model_cache")
    ENABLE_CPU_OFFLOAD: bool = os.getenv("ENABLE_CPU_OFFLOAD", "True").lower() == "true"
    
    # AWS Configuration for Model Storage
    AWS_ACCESS_KEY_ID: Optional[str] = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: Optional[str] = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_REGION: str = os.getenv("AWS_REGION", "ap-south-1")
    AWS_BUCKET_NAME: Optional[str] = os.getenv("AWS_BUCKET_NAME")
    
    # Redis Configuration for Job Queue
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", "6379"))
    REDIS_DB: int = int(os.getenv("REDIS_DB", "0"))
    
    # Model Inference Settings
    MAX_BATCH_SIZE: int = int(os.getenv("MAX_BATCH_SIZE", "4"))
    DEFAULT_INFERENCE_STEPS: int = int(os.getenv("DEFAULT_INFERENCE_STEPS", "50"))
    DEFAULT_GUIDANCE_SCALE: float = float(os.getenv("DEFAULT_GUIDANCE_SCALE", "7.5"))
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 