from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Any
import json
import os

app = FastAPI()

# Load dataset once at startup
DATASET_PATH = os.path.join(os.path.dirname(__file__), "dataset", "seed.json")
with open(DATASET_PATH, encoding="utf-8") as f:
    DATA = json.load(f)["otsumami_list"]

class RecommendRequest(BaseModel):
    location: str
    budget: int
    allergens: List[str]

@app.post("/recommend")
def recommend(req: RecommendRequest) -> Any:
    # Filter by budget and allergens
    filtered = [
        item for item in DATA
        if req.budget >= item["price_range"][0]
        and req.budget <= item["price_range"][1]
        and not any(allergen in item["allergens"] for allergen in req.allergens)
    ]
    # For MVP, just return the filtered list (could add more logic later)
    return {"recommendations": filtered}
