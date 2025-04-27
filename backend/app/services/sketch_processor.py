import torch
from diffusers import StableDiffusionXLImg2ImgPipeline
from PIL import Image
import os
from app.core.config import settings
import uuid

class SketchProcessor:
    def __init__(self):
        self.device = settings.DEVICE
        self.model = None
        self._ensure_directories()

    def _ensure_directories(self):
        """Ensure media directories exist"""
        os.makedirs(os.path.join(settings.MEDIA_ROOT, settings.SKETCHES_DIR), exist_ok=True)
        os.makedirs(os.path.join(settings.MEDIA_ROOT, settings.RENDERS_DIR), exist_ok=True)

    def _load_model(self):
        """Lazy load the model when needed"""
        if self.model is None:
            self.model = StableDiffusionXLImg2ImgPipeline.from_pretrained(
                settings.MODEL_NAME,
                torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
            )
            self.model.to(self.device)

    def save_sketch(self, file_content: bytes) -> str:
        """Save uploaded sketch and return filename"""
        filename = f"{uuid.uuid4()}.png"
        filepath = os.path.join(settings.MEDIA_ROOT, settings.SKETCHES_DIR, filename)
        
        # Save the uploaded file
        with open(filepath, "wb") as f:
            f.write(file_content)
        
        return filename

    def process_sketch(self, sketch_path: str, style: str) -> str:
        """Process sketch and return rendered image path"""
        self._load_model()

        # Load and preprocess image
        image = Image.open(os.path.join(settings.MEDIA_ROOT, settings.SKETCHES_DIR, sketch_path))
        
        # Prepare prompt based on style
        prompt = f"Convert this architectural sketch into a photorealistic {style} style building, " \
                f"with authentic Indian architectural details, textures, and materials"
        
        # Generate image
        output = self.model(
            prompt=prompt,
            image=image,
            num_inference_steps=50,
            strength=0.75,
            guidance_scale=7.5,
        ).images[0]

        # Save output
        output_filename = f"{uuid.uuid4()}.png"
        output_path = os.path.join(settings.MEDIA_ROOT, settings.RENDERS_DIR, output_filename)
        output.save(output_path)

        return output_filename

    def cleanup(self):
        """Clean up resources"""
        if self.model is not None:
            del self.model
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
            self.model = None

sketch_processor = SketchProcessor() 