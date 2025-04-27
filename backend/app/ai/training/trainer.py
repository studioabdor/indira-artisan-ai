import os
import torch
import torch.nn.functional as F
from accelerate import Accelerator
from diffusers import StableDiffusionPipeline, DDPMScheduler
from diffusers.optimization import get_scheduler
from tqdm.auto import tqdm
from torch.utils.data import DataLoader
from .dataset import IndianArchitectureDataset
from .config import training_config
import logging
from pathlib import Path
from typing import Optional, Dict
import wandb

logger = logging.getLogger(__name__)

class StableDiffusionTrainer:
    def __init__(
        self,
        data_root: str,
        output_dir: str,
        use_wandb: bool = True,
        wandb_project: str = "indira-architecture"
    ):
        self.data_root = Path(data_root)
        self.output_dir = Path(output_dir)
        self.use_wandb = use_wandb
        self.wandb_project = wandb_project
        
        # Initialize accelerator
        self.accelerator = Accelerator(
            gradient_accumulation_steps=training_config.gradient_accumulation_steps,
            mixed_precision=training_config.mixed_precision
        )
        
        # Load model and tokenizer
        self.pipeline = StableDiffusionPipeline.from_pretrained(
            training_config.base_model_id,
            torch_dtype=torch.float16 if training_config.mixed_precision == "fp16" else torch.float32
        )
        self.tokenizer = self.pipeline.tokenizer
        
        # Initialize dataset
        self.dataset = IndianArchitectureDataset(
            data_root=data_root,
            tokenizer=self.tokenizer,
            size=training_config.resolution,
            center_crop=training_config.center_crop,
            random_flip=training_config.random_flip
        )
        
        # Initialize optimizer and scheduler
        self.optimizer = None
        self.lr_scheduler = None

    def _init_training(self):
        """Initialize training components."""
        # Create dataloader
        train_dataloader = DataLoader(
            self.dataset,
            batch_size=training_config.train_batch_size,
            shuffle=True,
            collate_fn=self.dataset.collate_fn
        )
        
        # Create optimizer
        self.optimizer = torch.optim.AdamW(
            self.pipeline.unet.parameters(),
            lr=training_config.learning_rate
        )
        
        # Create learning rate scheduler
        self.lr_scheduler = get_scheduler(
            "cosine",
            optimizer=self.optimizer,
            num_warmup_steps=100,
            num_training_steps=training_config.max_train_steps
        )
        
        # Prepare everything with accelerator
        self.pipeline.unet, self.optimizer, train_dataloader, self.lr_scheduler = \
            self.accelerator.prepare(
                self.pipeline.unet,
                self.optimizer,
                train_dataloader,
                self.lr_scheduler
            )
            
        return train_dataloader

    def train(self):
        """Run the training pipeline."""
        logger.info("Starting training pipeline")
        
        # Initialize wandb if enabled
        if self.use_wandb:
            wandb.init(project=self.wandb_project)
        
        train_dataloader = self._init_training()
        
        # Training loop
        global_step = 0
        progress_bar = tqdm(total=training_config.max_train_steps)
        
        while global_step < training_config.max_train_steps:
            for batch in train_dataloader:
                with self.accelerator.accumulate(self.pipeline.unet):
                    # Convert images to latent space
                    latents = self.pipeline.vae.encode(
                        batch["pixel_values"].to(dtype=self.pipeline.unet.dtype)
                    ).latent_dist.sample()
                    latents = latents * 0.18215
                    
                    # Sample noise and add to latents
                    noise = torch.randn_like(latents)
                    timesteps = torch.randint(
                        0,
                        self.pipeline.scheduler.config.num_train_timesteps,
                        (latents.shape[0],),
                        device=latents.device
                    )
                    noisy_latents = self.pipeline.scheduler.add_noise(
                        latents,
                        noise,
                        timesteps
                    )
                    
                    # Predict noise
                    noise_pred = self.pipeline.unet(
                        noisy_latents,
                        timesteps,
                        batch["prompt_ids"]
                    ).sample
                    
                    # Calculate loss
                    loss = F.mse_loss(noise_pred, noise, reduction="none").mean()
                    self.accelerator.backward(loss)
                    
                    if self.accelerator.sync_gradients:
                        self.accelerator.clip_grad_norm_(self.pipeline.unet.parameters(), 1.0)
                    
                    self.optimizer.step()
                    self.lr_scheduler.step()
                    self.optimizer.zero_grad()
                
                # Logging
                if self.use_wandb:
                    wandb.log({
                        "train_loss": loss.detach().item(),
                        "learning_rate": self.lr_scheduler.get_last_lr()[0]
                    })
                
                # Save checkpoint
                if global_step % training_config.save_steps == 0:
                    self._save_checkpoint(global_step)
                
                progress_bar.update(1)
                global_step += 1
                
                if global_step >= training_config.max_train_steps:
                    break
        
        # Save final model
        self._save_checkpoint("final")
        
        if self.use_wandb:
            wandb.finish()

    def _save_checkpoint(self, step: Union[int, str]):
        """Save a checkpoint of the model."""
        logger.info(f"Saving checkpoint at step {step}")
        
        # Create checkpoint directory
        checkpoint_dir = self.output_dir / f"checkpoint-{step}"
        checkpoint_dir.mkdir(parents=True, exist_ok=True)
        
        # Save the pipeline
        self.pipeline.save_pretrained(checkpoint_dir)
        
        # Save optimizer state
        torch.save(self.optimizer.state_dict(), checkpoint_dir / "optimizer.pt")
        
        logger.info(f"Checkpoint saved at {checkpoint_dir}")

    def load_checkpoint(self, checkpoint_dir: str):
        """Load a checkpoint."""
        checkpoint_dir = Path(checkpoint_dir)
        
        # Load pipeline
        self.pipeline = StableDiffusionPipeline.from_pretrained(
            checkpoint_dir,
            torch_dtype=torch.float16 if training_config.mixed_precision == "fp16" else torch.float32
        )
        
        # Load optimizer state if exists
        optimizer_path = checkpoint_dir / "optimizer.pt"
        if optimizer_path.exists():
            self.optimizer.load_state_dict(torch.load(optimizer_path))
            
        logger.info(f"Loaded checkpoint from {checkpoint_dir}") 