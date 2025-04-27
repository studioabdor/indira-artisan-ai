from sqlalchemy import Column, Integer, String, Text, JSON
from sqlalchemy.orm import relationship
from ..core.database import Base

class ArchitecturalStyle(Base):
    __tablename__ = "architectural_styles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    description = Column(Text)
    region = Column(String(100))
    features = Column(JSON)  # Store key architectural features
    materials = Column(JSON)  # Common materials used
    examples = Column(JSON)  # Notable examples
    image_urls = Column(JSON)  # Reference images
    metadata = Column(JSON)  # Additional metadata

    # Relationships can be added here as needed
    # designs = relationship("Design", back_populates="style") 