from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.architectural_style import ArchitecturalStyle
from ..schemas.architectural_style import ArchitecturalStyleCreate, ArchitecturalStyleUpdate

class ArchitecturalStyleService:
    @staticmethod
    def get_style(db: Session, style_id: int) -> Optional[ArchitecturalStyle]:
        return db.query(ArchitecturalStyle).filter(ArchitecturalStyle.id == style_id).first()

    @staticmethod
    def get_styles(
        db: Session,
        skip: int = 0,
        limit: int = 10,
        region: Optional[str] = None
    ) -> List[ArchitecturalStyle]:
        query = db.query(ArchitecturalStyle)
        if region:
            query = query.filter(ArchitecturalStyle.region == region)
        return query.offset(skip).limit(limit).all()

    @staticmethod
    def create_style(db: Session, style: ArchitecturalStyleCreate) -> ArchitecturalStyle:
        db_style = ArchitecturalStyle(**style.model_dump())
        db.add(db_style)
        db.commit()
        db.refresh(db_style)
        return db_style

    @staticmethod
    def update_style(
        db: Session,
        style_id: int,
        style_update: ArchitecturalStyleUpdate
    ) -> Optional[ArchitecturalStyle]:
        db_style = ArchitecturalStyleService.get_style(db, style_id)
        if not db_style:
            return None

        update_data = style_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_style, field, value)

        db.commit()
        db.refresh(db_style)
        return db_style

    @staticmethod
    def delete_style(db: Session, style_id: int) -> bool:
        db_style = ArchitecturalStyleService.get_style(db, style_id)
        if not db_style:
            return False

        db.delete(db_style)
        db.commit()
        return True

    @staticmethod
    def get_styles_by_region(db: Session, region: str) -> List[ArchitecturalStyle]:
        return db.query(ArchitecturalStyle).filter(ArchitecturalStyle.region == region).all()

    @staticmethod
    def search_styles(
        db: Session,
        query: str,
        skip: int = 0,
        limit: int = 10
    ) -> List[ArchitecturalStyle]:
        return (
            db.query(ArchitecturalStyle)
            .filter(
                ArchitecturalStyle.name.ilike(f"%{query}%") |
                ArchitecturalStyle.description.ilike(f"%{query}%")
            )
            .offset(skip)
            .limit(limit)
            .all()
        ) 