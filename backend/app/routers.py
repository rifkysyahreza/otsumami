from fastapi import APIRouter, HTTPException
from typing import List
from .models import RecommendRequest, RecommendResponse, Otsumami
from .services import OtsumamiService

router = APIRouter()
service = OtsumamiService()

@router.post("/recommend", response_model=RecommendResponse)
async def recommend(request: RecommendRequest):
    """Get otsumami recommendations based on weather, budget, and allergens"""
    try:
        recommendations = service.get_recommendations(request)
        return RecommendResponse(recommendations=recommendations)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend/enhanced", response_model=RecommendResponse)
async def recommend_enhanced(request: RecommendRequest):
    """Get enhanced otsumami recommendations using new fields for better matching"""
    try:
        recommendations = service.get_recommendations_enhanced(request)
        return RecommendResponse(recommendations=recommendations)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/otsumami", response_model=List[Otsumami])
async def get_all_otsumami():
    """Get all otsumami data"""
    try:
        return service.get_all_otsumami()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/otsumami/category/{category}", response_model=List[Otsumami])
async def get_otsumami_by_category(category: str):
    """Get otsumami by category"""
    try:
        return service.get_otsumami_by_category(category)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/otsumami/region/{region}", response_model=List[Otsumami])
async def get_otsumami_by_region(region: str):
    """Get otsumami by regional origin"""
    try:
        return service.get_otsumami_by_region(region)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Otsumami API is running"} 