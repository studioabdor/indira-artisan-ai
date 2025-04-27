import os
import uuid
from fastapi import UploadFile
from typing import List
from ..core.config import settings

class FileHandler:
    @staticmethod
    async def save_upload_file(upload_file: UploadFile, folder: str = "uploads") -> str:
        """
        Save an uploaded file and return its path.
        """
        # Create folder if it doesn't exist
        os.makedirs(folder, exist_ok=True)
        
        # Generate unique filename
        file_extension = os.path.splitext(upload_file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(folder, unique_filename)
        
        # Save file
        content = await upload_file.read()
        with open(file_path, "wb") as f:
            f.write(content)
        
        return file_path

    @staticmethod
    async def save_multiple_files(
        upload_files: List[UploadFile],
        folder: str = "uploads"
    ) -> List[str]:
        """
        Save multiple uploaded files and return their paths.
        """
        file_paths = []
        for upload_file in upload_files:
            file_path = await FileHandler.save_upload_file(upload_file, folder)
            file_paths.append(file_path)
        return file_paths

    @staticmethod
    def delete_file(file_path: str) -> bool:
        """
        Delete a file from the filesystem.
        """
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                return True
            return False
        except Exception:
            return False

    @staticmethod
    def get_file_url(file_path: str) -> str:
        """
        Generate a URL for a file.
        In production, this would return a CDN or S3 URL.
        """
        # For development, return a local URL
        return f"/static/{file_path}"

    @staticmethod
    def is_valid_file_type(filename: str, allowed_extensions: List[str]) -> bool:
        """
        Check if a file has an allowed extension.
        """
        return any(filename.lower().endswith(ext) for ext in allowed_extensions)

    @staticmethod
    def get_file_size(file_path: str) -> int:
        """
        Get the size of a file in bytes.
        """
        return os.path.getsize(file_path) 