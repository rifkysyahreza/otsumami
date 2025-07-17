from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API Configuration
    api_title: str = "Otsumami AI API"
    api_version: str = "1.0.0"
    api_description: str = "AI-powered Japanese otsumami recommendation system"
    
    # CORS Configuration
    cors_origins: List[str] = ["http://localhost:3000"]
    cors_allow_credentials: bool = True
    cors_allow_methods: List[str] = ["*"]
    cors_allow_headers: List[str] = ["*"]
    
    # Data Configuration
    dataset_path: str = "dataset/seed.json"
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings() 