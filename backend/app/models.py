from pydantic import BaseModel
from typing import List, Optional

class Otsumami(BaseModel):
    id: int
    name_kanji: str
    name_kana: str
    name_en: str
    category: str
    subcategory: str
    price_range: List[int]
    calories: int
    serving_temp: str
    alcohol_pairing: List[str]
    allergens: List[str]
    season: List[str]
    weather_match: List[str]
    description_jp: str
    description_en: str
    popularity: int
    common_places: List[str]
    image_url: str
    flavor_profile: List[str]
    texture: List[str]
    meal_time: List[str]
    pairing_intensity: str
    regional_origin: str

class RecommendRequest(BaseModel):
    weather: str
    budget: int
    allergens: List[str]

class RecommendResponse(BaseModel):
    recommendations: List[Otsumami] 