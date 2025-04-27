from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ....core.database import get_db
from ....schemas.architectural_style import (
    ArchitecturalStyleCreate,
    ArchitecturalStyleUpdate,
    ArchitecturalStyleResponse
)
from ....services.architectural_style_service import ArchitecturalStyleService

router = APIRouter()

@router.get("/", response_model=List[ArchitecturalStyleResponse])
def get_architectural_styles(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    region: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve a list of architectural styles with pagination and optional region filter.
    """
    return ArchitecturalStyleService.get_styles(db, skip=skip, limit=limit, region=region)

@router.post("/", response_model=ArchitecturalStyleResponse)
def create_architectural_style(
    style: ArchitecturalStyleCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new architectural style.
    """
    return ArchitecturalStyleService.create_style(db, style)

@router.get("/{style_id}", response_model=ArchitecturalStyleResponse)
def get_architectural_style(
    style_id: int,
    db: Session = Depends(get_db)
):
    """
    Retrieve a specific architectural style by ID.
    """
    style = ArchitecturalStyleService.get_style(db, style_id)
    if not style:
        raise HTTPException(status_code=404, detail="Architectural style not found")
    return style

@router.put("/{style_id}", response_model=ArchitecturalStyleResponse)
def update_architectural_style(
    style_id: int,
    style_update: ArchitecturalStyleUpdate,
    db: Session = Depends(get_db)
):
    """
    Update an existing architectural style.
    """
    updated_style = ArchitecturalStyleService.update_style(db, style_id, style_update)
    if not updated_style:
        raise HTTPException(status_code=404, detail="Architectural style not found")
    return updated_style

@router.delete("/{style_id}")
def delete_architectural_style(
    style_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete an architectural style.
    """
    if not ArchitecturalStyleService.delete_style(db, style_id):
        raise HTTPException(status_code=404, detail="Architectural style not found")
    return {"message": "Architectural style deleted successfully"}

@router.get("/search/", response_model=List[ArchitecturalStyleResponse])
def search_architectural_styles(
    query: str = Query(..., min_length=1),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Search architectural styles by name or description.
    """
    return ArchitecturalStyleService.search_styles(db, query, skip=skip, limit=limit)

@router.get("/region/{region}", response_model=List[ArchitecturalStyleResponse])
def get_styles_by_region(
    region: str,
    db: Session = Depends(get_db)
):
    """
    Get all architectural styles for a specific region.
    """
    return ArchitecturalStyleService.get_styles_by_region(db, region) 