import os
from typing import Dict, List, Tuple
from PIL import Image
import torch
from torch.utils.data import Dataset
from torchvision import transforms
from .config import training_config
import random
import json
from pathlib import Path

class IndianArchitectureDataset(Dataset):
    def __init__(
        self,
        data_root: str,
        tokenizer,
        size: int = 768,
        center_crop: bool = True,
        random_flip: bool = True
    ):
        self.data_root = Path(data_root)
        self.tokenizer = tokenizer
        self.size = size
        self.center_crop = center_crop
        self.random_flip = random_flip
        
        self.image_paths = []
        self.metadata = {}
        self._load_dataset()
        
        self.transform = transforms.Compose([
            transforms.Resize(size, interpolation=transforms.InterpolationMode.BILINEAR),
            transforms.CenterCrop(size) if center_crop else transforms.Lambda(lambda x: x),
            transforms.RandomHorizontalFlip() if random_flip else transforms.Lambda(lambda x: x),
            transforms.ToTensor(),
            transforms.Normalize([0.5], [0.5])
        ])

    def _load_dataset(self):
        """Load dataset and metadata."""
        # Load metadata if exists
        metadata_file = self.data_root / "metadata.json"
        if metadata_file.exists():
            with open(metadata_file, "r") as f:
                self.metadata = json.load(f)
        
        # Scan for images
        for style in training_config.styles:
            style_dir = self.data_root / style
            if not style_dir.exists():
                continue
                
            for img_path in style_dir.glob("*.jpg"):
                self.image_paths.append({
                    "path": str(img_path),
                    "style": style,
                    "metadata": self.metadata.get(str(img_path), {})
                })

    def _generate_prompt(self, style: str, metadata: Dict) -> str:
        """Generate a prompt for the image using templates."""
        template = random.choice(training_config.prompt_templates)
        prompt = template.format(style=style)
        
        # Add additional details from metadata if available
        if "features" in metadata:
            prompt += f", featuring {', '.join(metadata['features'])}"
        if "materials" in metadata:
            prompt += f", built with {', '.join(metadata['materials'])}"
            
        return prompt

    def __len__(self) -> int:
        return len(self.image_paths)

    def __getitem__(self, idx: int) -> Tuple[torch.Tensor, Dict]:
        item = self.image_paths[idx]
        image = Image.open(item["path"]).convert("RGB")
        
        # Apply transformations
        if self.transform is not None:
            image = self.transform(image)
            
        # Generate prompt
        prompt = self._generate_prompt(item["style"], item["metadata"])
        
        # Tokenize prompt
        tokenized_prompt = self.tokenizer(
            prompt,
            padding="max_length",
            max_length=self.tokenizer.model_max_length,
            truncation=True,
            return_tensors="pt"
        ).input_ids[0]
        
        return {
            "image": image,
            "prompt_ids": tokenized_prompt,
            "prompt": prompt,
            "style": item["style"]
        }

    @staticmethod
    def collate_fn(examples: List[Dict]) -> Dict:
        """Collate examples for DataLoader."""
        pixel_values = torch.stack([example["image"] for example in examples])
        prompt_ids = torch.stack([example["prompt_ids"] for example in examples])
        
        return {
            "pixel_values": pixel_values,
            "prompt_ids": prompt_ids,
            "prompts": [example["prompt"] for example in examples],
            "styles": [example["style"] for example in examples]
        } 