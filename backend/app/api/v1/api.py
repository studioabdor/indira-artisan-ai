from fastapi import APIRouter
from .endpoints import architectural_styles

api_router = APIRouter()

api_router.include_router(
    architectural_styles.router,
    prefix="/architectural-styles",
    tags=["architectural-styles"]
)

# Additional routers will be added here as we develop more features
# api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
# api_router.include_router(users.router, prefix="/users", tags=["users"])
# api_router.include_router(designs.router, prefix="/designs", tags=["designs"])
# api_router.include_router(renderings.router, prefix="/renderings", tags=["renderings"]) 