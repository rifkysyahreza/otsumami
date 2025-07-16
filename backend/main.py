from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
import json
import os

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"] ,
)

# Load dataset once at startup
DATASET_PATH = os.path.join(os.path.dirname(__file__), "dataset", "seed.json")
with open(DATASET_PATH, encoding="utf-8") as f:
    DATA = json.load(f)["otsumami_list"]

class RecommendRequest(BaseModel):
    weather: str
    budget: int
    allergens: List[str]

@app.post("/recommend")
def recommend(req: RecommendRequest) -> Any:
    # Filter by budget, allergens, and weather
    filtered = [
        item for item in DATA
        if req.budget >= item["price_range"][0]
        and req.budget <= item["price_range"][1]
        and not any(allergen in item["allergens"] for allergen in req.allergens)
        and (req.weather in item["weather_match"])
    ]
    return {"recommendations": filtered}
