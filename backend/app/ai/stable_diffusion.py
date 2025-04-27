from diffusers import StableDiffusionPipeline, StableDiffusionImg2ImgPipeline
import torch
from PIL import Image
import io
import logging
from ..core.config import settings
import boto3
from typing import Optional, Union, BinaryIO
import redis
import json
import hashlib

logger = logging.getLogger(__name__)

class StableDiffusionService:
    def __init__(self):
        self.device = "cpu"  # Force CPU for deployment
        self.pipe = None
        self.img2img_pipe = None
        self._initialize_pipeline()
        
        # Initialize Redis for caching
        self.redis_client = redis.Redis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            db=settings.REDIS_DB
        )
        self.cache_ttl = 60 * 60 * 24  # 24 hours

    def _initialize_pipeline(self):
        """Initialize the Stable Diffusion pipeline with optimizations."""
        try:
            # Initialize text-to-image pipeline with optimizations
            self.pipe = StableDiffusionPipeline.from_pretrained(
                settings.SD_MODEL_ID,
                torch_dtype=torch.float32,
                safety_checker=None
            )
            
            # Initialize image-to-image pipeline
            self.img2img_pipe = StableDiffusionImg2ImgPipeline.from_pretrained(
                settings.SD_MODEL_ID,
                torch_dtype=torch.float32,
                safety_checker=None
            )

            # Move to CPU and optimize
            self.pipe.to(self.device)
            self.img2img_pipe.to(self.device)

            # Enable memory efficient attention
            self.pipe.enable_attention_slicing(1)
            self.img2img_pipe.enable_attention_slicing(1)
            
            # Enable VAE tiling for memory efficiency
            self.pipe.enable_vae_tiling()
            self.img2img_pipe.enable_vae_tiling()

        except Exception as e:
            logger.error(f"Failed to initialize Stable Diffusion pipeline: {str(e)}")
            raise

    def _get_cache_key(self, prompt: str, **params) -> str:
        """Generate cache key from prompt and parameters."""
        cache_data = {
            "prompt": prompt,
            **params
        }
        return hashlib.md5(json.dumps(cache_data, sort_keys=True).encode()).hexdigest()

    async def generate_from_prompt(
        self,
        prompt: str,
        negative_prompt: str = None,
        num_inference_steps: int = None,
        guidance_scale: float = None,
        width: int = 768,
        height: int = 768,
        use_cache: bool = True
    ) -> bytes:
        """Generate image from text prompt with caching."""
        try:
            # Check cache first
            if use_cache:
                cache_key = self._get_cache_key(
                    prompt,
                    negative_prompt=negative_prompt,
                    num_inference_steps=num_inference_steps,
                    guidance_scale=guidance_scale,
                    width=width,
                    height=height
                )
                cached_result = self.redis_client.get(cache_key)
                if cached_result:
                    logger.info("Cache hit for prompt")
                    return cached_result

            num_inference_steps = num_inference_steps or settings.DEFAULT_INFERENCE_STEPS
            guidance_scale = guidance_scale or settings.DEFAULT_GUIDANCE_SCALE

            # Add architectural context to prompt
            enhanced_prompt = f"Indian architectural design, professional architectural visualization, {prompt}"
            
            # Generate with lower inference steps for faster results
            image = self.pipe(
                prompt=enhanced_prompt,
                negative_prompt=negative_prompt,
                num_inference_steps=min(num_inference_steps, 30),  # Limit steps for faster inference
                guidance_scale=guidance_scale,
                width=width,
                height=height,
            ).images[0]

            # Convert to bytes
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='PNG')
            result = img_byte_arr.getvalue()

            # Cache the result
            if use_cache:
                self.redis_client.setex(cache_key, self.cache_ttl, result)

            return result

        except Exception as e:
            logger.error(f"Image generation failed: {str(e)}")
            raise

    async def generate_from_sketch(
        self,
        sketch_image: Union[Image.Image, BinaryIO],
        prompt: str,
        negative_prompt: str = None,
        strength: float = 0.75,
        num_inference_steps: int = None,
        guidance_scale: float = None,
    ) -> bytes:
        """Generate architectural rendering from sketch."""
        try:
            if not isinstance(sketch_image, Image.Image):
                sketch_image = Image.open(sketch_image).convert("RGB")

            num_inference_steps = num_inference_steps or settings.DEFAULT_INFERENCE_STEPS
            guidance_scale = guidance_scale or settings.DEFAULT_GUIDANCE_SCALE

            # Add architectural context to prompt
            enhanced_prompt = f"Indian architectural design, professional architectural visualization, detailed rendering, {prompt}"

            # Generate with optimized settings
            image = self.img2img_pipe(
                prompt=enhanced_prompt,
                image=sketch_image,
                strength=strength,
                negative_prompt=negative_prompt,
                num_inference_steps=min(num_inference_steps, 30),  # Limit steps
                guidance_scale=guidance_scale,
            ).images[0]

            # Convert to bytes
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='PNG')
            return img_byte_arr.getvalue()

        except Exception as e:
            logger.error(f"Sketch-to-image generation failed: {str(e)}")
            raise

# Global instance
sd_service = StableDiffusionService() 