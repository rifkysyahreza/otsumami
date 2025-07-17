import json
import os
from typing import List
from .models import Otsumami, RecommendRequest

class OtsumamiService:
    def __init__(self):
        self.data = self._load_data()
    
    def _load_data(self) -> List[Otsumami]:
        """Load otsumami data from JSON file"""
        data_path = os.path.join(os.path.dirname(__file__), "..", "dataset", "seed.json")
        with open(data_path, encoding="utf-8") as f:
            raw_data = json.load(f)
            return [Otsumami(**item) for item in raw_data["otsumami_list"]]
    
    def get_recommendations(self, request: RecommendRequest) -> List[Otsumami]:
        """Get filtered recommendations based on request criteria"""
        filtered = []
        
        for item in self.data:
            # Check budget range
            if not (request.budget >= item.price_range[0] and request.budget <= item.price_range[1]):
                continue
            
            # Check allergens (exclude items with any of the specified allergens)
            if any(allergen in item.allergens for allergen in request.allergens):
                continue
            
            # Check weather match
            if request.weather not in item.weather_match:
                continue
            
            filtered.append(item)
        
        # Sort by popularity (descending) and return
        return sorted(filtered, key=lambda x: x.popularity, reverse=True)
    
    def get_recommendations_enhanced(self, request: RecommendRequest) -> List[Otsumami]:
        """Enhanced recommendations using new fields for better matching"""
        filtered = []
        
        for item in self.data:
            # Basic filters
            if not (request.budget >= item.price_range[0] and request.budget <= item.price_range[1]):
                continue
            
            if any(allergen in item.allergens for allergen in request.allergens):
                continue
            
            if request.weather not in item.weather_match:
                continue
            
            filtered.append(item)
        
        # Enhanced scoring based on new fields
        scored_items = []
        for item in filtered:
            score = item.popularity  # Base score
            
            # Bonus for weather-appropriate pairing intensity
            if request.weather in ["寒い", "雨"] and item.pairing_intensity == "strong":
                score += 2
            elif request.weather in ["暑い", "晴れ"] and item.pairing_intensity == "light":
                score += 2
            
            # Bonus for appropriate meal time (assuming dinner/late_night for otsumami)
            if "dinner" in item.meal_time or "late_night" in item.meal_time:
                score += 1
            
            # Bonus for regional variety (if multiple items from same region)
            regional_count = sum(1 for f in filtered if f.regional_origin == item.regional_origin)
            if regional_count <= 2:  # Prefer variety
                score += 1
            
            scored_items.append((item, score))
        
        # Sort by enhanced score and return items
        scored_items.sort(key=lambda x: x[1], reverse=True)
        return [item for item, score in scored_items]
    
    def get_all_otsumami(self) -> List[Otsumami]:
        """Get all otsumami data"""
        return self.data
    
    def get_otsumami_by_category(self, category: str) -> List[Otsumami]:
        """Get otsumami by category"""
        return [item for item in self.data if item.category == category]
    
    def get_otsumami_by_region(self, region: str) -> List[Otsumami]:
        """Get otsumami by regional origin"""
        return [item for item in self.data if item.regional_origin == region] 