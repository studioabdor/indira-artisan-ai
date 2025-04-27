from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import uvicorn
from .core.config import settings
from .api.v1.api import api_router
from .core.error_handlers import (
    base_exception_handler,
    validation_exception_handler,
    http_exception_handler,
    general_exception_handler,
    BaseAPIException
)
from fastapi.staticfiles import StaticFiles
import os
from app.db.session import engine
from app.models.base import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-powered architectural visualization platform for Indian architectural styles",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Register exception handlers
app.add_exception_handler(BaseAPIException, base_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add Gzip compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Mount static files
os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
app.mount("/media", StaticFiles(directory=settings.MEDIA_ROOT), name="media")

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return JSONResponse(
        content={
            "message": "Welcome to Indira Artisan AI API",
            "version": settings.VERSION,
            "docs_url": "/docs"
        }
    )

@app.get("/health")
async def health_check():
    return JSONResponse(
        content={
            "status": "healthy",
            "services": {
                "api": "up",
                "database": "up",
                "cache": "up",
                "ai_services": "up"
            }
        }
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 