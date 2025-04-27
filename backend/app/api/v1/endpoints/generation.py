from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import Response
from typing import Optional
from ....ai.stable_diffusion import sd_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/text-to-image")
async def generate_from_text(
    prompt: str = Form(...),
    negative_prompt: Optional[str] = Form(None),
    num_inference_steps: Optional[int] = Form(None),
    guidance_scale: Optional[float] = Form(None),
    width: Optional[int] = Form(768),
    height: Optional[int] = Form(768),
):
    """Generate architectural visualization from text prompt."""
    try:
        image_bytes = await sd_service.generate_from_prompt(
            prompt=prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=num_inference_steps,
            guidance_scale=guidance_scale,
            width=width,
            height=height,
        )
        return Response(content=image_bytes, media_type="image/png")
    except Exception as e:
        logger.error(f"Text-to-image generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/sketch-to-image")
async def generate_from_sketch(
    sketch: UploadFile = File(...),
    prompt: str = Form(...),
    negative_prompt: Optional[str] = Form(None),
    strength: Optional[float] = Form(0.75),
    num_inference_steps: Optional[int] = Form(None),
    guidance_scale: Optional[float] = Form(None),
):
    """Generate architectural visualization from sketch."""
    try:
        image_bytes = await sd_service.generate_from_sketch(
            sketch_image=sketch.file,
            prompt=prompt,
            negative_prompt=negative_prompt,
            strength=strength,
            num_inference_steps=num_inference_steps,
            guidance_scale=guidance_scale,
        )
        return Response(content=image_bytes, media_type="image/png")
    except Exception as e:
        logger.error(f"Sketch-to-image generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 