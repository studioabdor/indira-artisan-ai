from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging
from typing import Any, Dict, Optional

# Configure logging
logger = logging.getLogger(__name__)

class BaseAPIException(Exception):
    """Base exception class for API errors."""
    def __init__(
        self,
        message: str,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        error_code: str = "INTERNAL_ERROR",
        details: Optional[Dict[str, Any]] = None
    ):
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        self.details = details or {}
        super().__init__(message)

class ValidationError(BaseAPIException):
    """Exception for validation errors."""
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            error_code="VALIDATION_ERROR",
            details=details
        )

class AuthenticationError(BaseAPIException):
    """Exception for authentication errors."""
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(
            message=message,
            status_code=status.HTTP_401_UNAUTHORIZED,
            error_code="AUTHENTICATION_ERROR"
        )

class AuthorizationError(BaseAPIException):
    """Exception for authorization errors."""
    def __init__(self, message: str = "Not authorized"):
        super().__init__(
            message=message,
            status_code=status.HTTP_403_FORBIDDEN,
            error_code="AUTHORIZATION_ERROR"
        )

class ResourceNotFoundError(BaseAPIException):
    """Exception for not found resources."""
    def __init__(self, resource: str, resource_id: str):
        super().__init__(
            message=f"{resource} with id {resource_id} not found",
            status_code=status.HTTP_404_NOT_FOUND,
            error_code="RESOURCE_NOT_FOUND",
            details={"resource": resource, "resource_id": resource_id}
        )

class GenerationError(BaseAPIException):
    """Exception for image generation errors."""
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            error_code="GENERATION_ERROR",
            details=details
        )

async def base_exception_handler(request: Request, exc: BaseAPIException) -> JSONResponse:
    """Handler for custom API exceptions."""
    logger.error(
        f"API error occurred: {exc.error_code} - {exc.message}",
        extra={
            "error_code": exc.error_code,
            "status_code": exc.status_code,
            "details": exc.details,
            "path": request.url.path
        }
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.error_code,
                "message": exc.message,
                "details": exc.details
            }
        }
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """Handler for request validation errors."""
    logger.warning(
        "Validation error",
        extra={
            "errors": exc.errors(),
            "body": exc.body,
            "path": request.url.path
        }
    )
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid request parameters",
                "details": {
                    "errors": exc.errors()
                }
            }
        }
    )

async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    """Handler for HTTP exceptions."""
    logger.warning(
        f"HTTP error {exc.status_code}",
        extra={
            "status_code": exc.status_code,
            "detail": exc.detail,
            "path": request.url.path
        }
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": "HTTP_ERROR",
                "message": str(exc.detail),
                "details": {}
            }
        }
    )

async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handler for unhandled exceptions."""
    logger.error(
        f"Unhandled exception: {str(exc)}",
        exc_info=True,
        extra={"path": request.url.path}
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred",
                "details": {
                    "type": exc.__class__.__name__,
                    "message": str(exc)
                }
            }
        }
    ) 