from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
from pathlib import Path

app = FastAPI(title="Otsumami Weather Recommender", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset
DATASET_PATH = Path(__file__).parent / "dataset" / "seed.json"
def load_dataset() -> List[Dict[str, Any]]:
    try:
        with open(DATASET_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("otsumami_list", [])
    except Exception as e:
        print(f"Warning: Could not load dataset: {e}")
        return []

otsumami_data = load_dataset()

# Pydantic models
class RecommendationRequest(BaseModel):
    weather: str
    budget: int
    allergens: List[str]

class RecommendationResponse(BaseModel):
    recommendations: List[Dict[str, Any]]
    total_count: int
    weather_used: str

@app.get("/")
def root():
    return {"message": "Otsumami Weather Recommender API"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "data_count": len(otsumami_data)}

@app.post("/recommendations", response_model=RecommendationResponse)
def get_recommendations(request: RecommendationRequest):
    filtered_items = []
    for item in otsumami_data:
        # Weather match
        weather_match = request.weather in item.get("weather_match", [])
        # Budget match
        price_range = item.get("price_range", [0, 0])
        budget_match = price_range[1] <= request.budget if price_range else False
        # Allergen filter
        item_allergens = item.get("allergens", [])
        allergen_match = not any(a in item_allergens for a in request.allergens)
        if weather_match and budget_match and allergen_match:
            filtered_items.append(item)
    # Sort by popularity descending
    filtered_items.sort(key=lambda x: x.get("popularity", 0), reverse=True)
    return RecommendationResponse(
        recommendations=filtered_items,
        total_count=len(filtered_items),
        weather_used=request.weather
    )

@app.get("/allergens")
def get_allergens():
    allergens = set()
    for item in otsumami_data:
        allergens.update(item.get("allergens", []))
    return {"allergens": sorted(list(allergens))}

@app.get("/weather-options")
def get_weather_options():
    weather_options = set()
    for item in otsumami_data:
        weather_options.update(item.get("weather_match", []))
    return {"weather_options": sorted(list(weather_options))}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
