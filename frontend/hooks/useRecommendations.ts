import { useState } from 'react';
import { Otsumami } from '../types/otsumami';

export interface RecommendationRequest {
  weather: string;
  budget: number;
  allergens: string[];
}

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Otsumami[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (req: RecommendationRequest) => {
    setLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error('Failed to fetch recommendations');
      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  return {
    recommendations,
    loading,
    error,
    fetchRecommendations,
  };
} 