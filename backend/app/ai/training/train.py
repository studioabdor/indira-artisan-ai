import argparse
import logging
from pathlib import Path
from .trainer import StableDiffusionTrainer
from ...core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def setup_training_directories(data_root: str, output_dir: str):
    """Setup training directories."""
    data_path = Path(data_root)
    output_path = Path(output_dir)
    
    # Create style directories if they don't exist
    for style in settings.ARCHITECTURAL_STYLES:
        style_dir = data_path / style
        style_dir.mkdir(parents=True, exist_ok=True)
        
    # Create output directory
    output_path.mkdir(parents=True, exist_ok=True)
    
    return data_path, output_path

def main():
    parser = argparse.ArgumentParser(description="Train Stable Diffusion for Indian Architecture")
    parser.add_argument(
        "--data_root",
        type=str,
        default="data/training",
        help="Root directory containing training images"
    )
    parser.add_argument(
        "--output_dir",
        type=str,
        default="models/fine_tuned",
        help="Directory to save model checkpoints"
    )
    parser.add_argument(
        "--use_wandb",
        action="store_true",
        help="Enable Weights & Biases logging"
    )
    parser.add_argument(
        "--wandb_project",
        type=str,
        default="indira-architecture",
        help="Weights & Biases project name"
    )
    parser.add_argument(
        "--resume_from",
        type=str,
        help="Path to checkpoint to resume training from"
    )
    
    args = parser.parse_args()
    
    # Setup directories
    data_path, output_path = setup_training_directories(args.data_root, args.output_dir)
    
    logger.info(f"Training data directory: {data_path}")
    logger.info(f"Output directory: {output_path}")
    
    # Initialize trainer
    trainer = StableDiffusionTrainer(
        data_root=str(data_path),
        output_dir=str(output_path),
        use_wandb=args.use_wandb,
        wandb_project=args.wandb_project
    )
    
    # Resume from checkpoint if specified
    if args.resume_from:
        logger.info(f"Resuming training from checkpoint: {args.resume_from}")
        trainer.load_checkpoint(args.resume_from)
    
    # Start training
    logger.info("Starting training...")
    trainer.train()
    logger.info("Training completed!")

if __name__ == "__main__":
    main() 