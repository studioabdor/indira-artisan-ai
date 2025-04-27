from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.sketch import Sketch
from app.services.sketch_processor import sketch_processor
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/process")
async def process_sketch(
    file: UploadFile = File(...),
    style: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Save uploaded sketch
        content = await file.read()
        sketch_filename = sketch_processor.save_sketch(content)

        # Create sketch record
        sketch = Sketch(
            user_id=current_user.id,
            original_file_path=sketch_filename,
            rendered_file_path="",  # Will be updated after processing
            style=style,
            status="processing"
        )
        db.add(sketch)
        db.commit()
        db.refresh(sketch)

        try:
            # Process the sketch
            rendered_filename = sketch_processor.process_sketch(sketch_filename, style)
            
            # Update sketch record
            sketch.rendered_file_path = rendered_filename
            sketch.status = "completed"
            db.commit()
            db.refresh(sketch)

            return {
                "id": sketch.id,
                "originalUrl": sketch.original_url,
                "renderedUrl": sketch.rendered_url,
                "style": sketch.style,
                "createdAt": sketch.created_at.isoformat()
            }
        except Exception as e:
            sketch.status = "failed"
            db.commit()
            raise HTTPException(status_code=500, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("")
def list_sketches(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> List[dict]:
    sketches = db.query(Sketch).filter(
        Sketch.user_id == current_user.id,
        Sketch.status == "completed"
    ).order_by(Sketch.created_at.desc()).all()

    return [
        {
            "id": sketch.id,
            "originalUrl": sketch.original_url,
            "renderedUrl": sketch.rendered_url,
            "style": sketch.style,
            "createdAt": sketch.created_at.isoformat()
        }
        for sketch in sketches
    ]

@router.get("/{sketch_id}")
def get_sketch(
    sketch_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    sketch = db.query(Sketch).filter(
        Sketch.id == sketch_id,
        Sketch.user_id == current_user.id
    ).first()
    
    if not sketch:
        raise HTTPException(status_code=404, detail="Sketch not found")

    return {
        "id": sketch.id,
        "originalUrl": sketch.original_url,
        "renderedUrl": sketch.rendered_url,
        "style": sketch.style,
        "createdAt": sketch.created_at.isoformat()
    }

@router.delete("/{sketch_id}")
def delete_sketch(
    sketch_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    sketch = db.query(Sketch).filter(
        Sketch.id == sketch_id,
        Sketch.user_id == current_user.id
    ).first()
    
    if not sketch:
        raise HTTPException(status_code=404, detail="Sketch not found")

    # Delete files
    try:
        import os
        from app.core.config import settings

        original_path = os.path.join(settings.MEDIA_ROOT, settings.SKETCHES_DIR, sketch.original_file_path)
        rendered_path = os.path.join(settings.MEDIA_ROOT, settings.RENDERS_DIR, sketch.rendered_file_path)

        if os.path.exists(original_path):
            os.remove(original_path)
        if os.path.exists(rendered_path):
            os.remove(rendered_path)
    except Exception as e:
        print(f"Error deleting files: {e}")

    # Delete record
    db.delete(sketch)
    db.commit()

    return {"message": "Sketch deleted successfully"} 