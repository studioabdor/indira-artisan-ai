from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime

class ArchitecturalStyleBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: str
    region: str
    features: Dict[str, str]
    materials: List[str]
    examples: List[str]
    image_urls: List[str]
    metadata: Optional[Dict] = None

class ArchitecturalStyleCreate(ArchitecturalStyleBase):
    pass

class ArchitecturalStyleUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    region: Optional[str] = None
    features: Optional[Dict[str, str]] = None
    materials: Optional[List[str]] = None
    examples: Optional[List[str]] = None
    image_urls: Optional[List[str]] = None
    metadata: Optional[Dict] = None

class ArchitecturalStyleInDB(ArchitecturalStyleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ArchitecturalStyleResponse(ArchitecturalStyleInDB):
    pass 