from fastapi import HTTPException, Request
from redis import Redis
import time
from ..core.config import settings
from typing import Callable, Optional
import json

class RateLimiter:
    def __init__(
        self,
        redis_client: Redis,
        prefix: str = "rate_limit:",
        max_requests: int = 100,
        window: int = 3600  # 1 hour
    ):
        self.redis = redis_client
        self.prefix = prefix
        self.max_requests = max_requests
        self.window = window

    async def is_rate_limited(self, key: str) -> bool:
        """Check if the request should be rate limited."""
        pipe = self.redis.pipeline()
        now = time.time()
        key = f"{self.prefix}{key}"
        
        # Clean old requests
        pipe.zremrangebyscore(key, 0, now - self.window)
        # Add current request
        pipe.zadd(key, {str(now): now})
        # Count requests in window
        pipe.zcard(key)
        # Set expiry on the key
        pipe.expire(key, self.window)
        
        _, _, request_count, _ = pipe.execute()
        return request_count > self.max_requests

class RateLimitMiddleware:
    def __init__(
        self,
        redis_client: Redis,
        max_requests: int = 100,
        window: int = 3600,
        prefix: str = "rate_limit:",
        get_key: Optional[Callable[[Request], str]] = None
    ):
        self.limiter = RateLimiter(
            redis_client=redis_client,
            prefix=prefix,
            max_requests=max_requests,
            window=window
        )
        self.get_key = get_key or self._default_key_func

    @staticmethod
    def _default_key_func(request: Request) -> str:
        """Default function to generate rate limit key from request."""
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            ip = forwarded.split(",")[0]
        else:
            ip = request.client.host
        return f"{ip}:{request.url.path}"

    async def __call__(self, request: Request, call_next):
        key = self.get_key(request)
        
        is_limited = await self.limiter.is_rate_limited(key)
        if is_limited:
            raise HTTPException(
                status_code=429,
                detail="Too many requests",
                headers={"Retry-After": str(self.limiter.window)}
            )
            
        response = await call_next(request)
        return response

def create_rate_limit_middleware(
    redis_url: str = settings.REDIS_URL,
    max_requests: int = 100,
    window: int = 3600,
    prefix: str = "rate_limit:",
    get_key: Optional[Callable[[Request], str]] = None
) -> RateLimitMiddleware:
    """Create a rate limit middleware instance."""
    redis_client = Redis.from_url(redis_url)
    return RateLimitMiddleware(
        redis_client=redis_client,
        max_requests=max_requests,
        window=window,
        prefix=prefix,
        get_key=get_key
    )

# Custom rate limiters for different endpoints
generation_limiter = RateLimitMiddleware(
    redis_client=Redis.from_url(settings.REDIS_URL),
    max_requests=10,  # 10 requests per hour for generation
    window=3600,
    prefix="generation_rate_limit:"
)

api_limiter = RateLimitMiddleware(
    redis_client=Redis.from_url(settings.REDIS_URL),
    max_requests=1000,  # 1000 requests per hour for general API
    window=3600,
    prefix="api_rate_limit:"
) 