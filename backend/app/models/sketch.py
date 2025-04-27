from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base, TimestampMixin

class Sketch(Base, TimestampMixin):
    __tablename__ = "sketches"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    original_file_path = Column(String, nullable=False)
    rendered_file_path = Column(String, nullable=False)
    style = Column(String, nullable=False)
    prompt = Column(String)
    status = Column(String, nullable=False, default="pending")  # pending, processing, completed, failed

    # Relationships
    user = relationship("User", back_populates="sketches")

    @property
    def original_url(self) -> str:
        return f"/media/sketches/{self.original_file_path}"

    @property
    def rendered_url(self) -> str:
        return f"/media/renders/{self.rendered_file_path}" 