from pydantic import BaseModel
from typing import List, Optional
from ...core.config import settings

class TrainingConfig(BaseModel):
    # Model Configuration
    base_model_id: str = settings.SD_MODEL_ID
    output_dir: str = "models/fine_tuned"
    
    # Training Parameters
    train_batch_size: int = 1
    gradient_accumulation_steps: int = 4
    learning_rate: float = 1e-5
    max_train_steps: int = 1000
    save_steps: int = 100
    mixed_precision: str = "fp16"  # or "no" for full precision
    
    # Dataset Parameters
    resolution: int = 768
    center_crop: bool = True
    random_flip: bool = True
    
    # Architectural Styles
    styles: List[str] = settings.ARCHITECTURAL_STYLES
    
    # Prompt Templates
    prompt_templates: List[str] = [
        "professional architectural visualization of {style} style building",
        "detailed architectural rendering of {style} architecture",
        "high quality architectural design in {style} style",
        "professional {style} architectural visualization",
        "{style} style architectural elevation drawing",
        "detailed {style} architectural facade design"
    ]
    
    # Negative Prompts
    negative_prompt: str = "low quality, blurry, distorted, unrealistic, poor architecture, bad proportions"

training_config = TrainingConfig() 