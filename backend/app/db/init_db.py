from sqlalchemy.orm import Session
from app.core.auth import get_password_hash
from app.models.user import User
from app.core.config import settings

def init_db(db: Session) -> None:
    # Create a default superuser if it doesn't exist
    user = db.query(User).filter(User.email == "admin@indiraartisan.ai").first()
    if not user:
        user = User(
            email="admin@indiraartisan.ai",
            hashed_password=get_password_hash("admin123"),  # Change in production
            full_name="Admin User",
            is_superuser=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)

if __name__ == "__main__":
    from app.db.session import SessionLocal
    db = SessionLocal()
    init_db(db) 