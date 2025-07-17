import { RecommendationRequest, RecommendationResponse } from '../types/otsumami';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class RecommendationService {
  static async getRecommendations(request: RecommendationRequest): Promise<RecommendationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }
} 