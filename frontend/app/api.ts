export type RecommendationRequest = {
  weather: string;
  budget: number;
  allergens: string[];
};

export type Otsumami = {
  id: number;
  name_kanji: string;
  name_kana: string;
  name_en: string;
  category: string;
  subcategory: string;
  price_range: [number, number];
  calories: number;
  serving_temp: string;
  alcohol_pairing: string[];
  allergens: string[];
  season: string[];
  weather_match: string[];
  description_jp: string;
  description_en: string;
  popularity: number;
  common_places: string[];
  image_url: string;
  flavor_profile: string[];
  texture: string[];
  meal_time: string[];
  pairing_intensity: string;
  regional_origin: string;
};

export async function fetchRecommendations(
  req: RecommendationRequest
): Promise<Otsumami[]> {
  const res = await fetch("http://localhost:8000/api/v1/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }
  const data = await res.json();
  return data.recommendations as Otsumami[];
}

export async function fetchEnhancedRecommendations(
  req: RecommendationRequest
): Promise<Otsumami[]> {
  const res = await fetch("http://localhost:8000/api/v1/recommend/enhanced", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch enhanced recommendations");
  }
  const data = await res.json();
  return data.recommendations as Otsumami[];
}

export async function fetchAllOtsumami(): Promise<Otsumami[]> {
  const res = await fetch("http://localhost:8000/api/v1/otsumami");
  if (!res.ok) {
    throw new Error("Failed to fetch all otsumami");
  }
  return res.json() as Promise<Otsumami[]>;
}

export async function fetchOtsumamiByCategory(category: string): Promise<Otsumami[]> {
  const res = await fetch(`http://localhost:8000/api/v1/otsumami/category/${category}`);
  if (!res.ok) {
    throw new Error("Failed to fetch otsumami by category");
  }
  return res.json() as Promise<Otsumami[]>;
}

export async function fetchOtsumamiByRegion(region: string): Promise<Otsumami[]> {
  const res = await fetch(`http://localhost:8000/api/v1/otsumami/region/${region}`);
  if (!res.ok) {
    throw new Error("Failed to fetch otsumami by region");
  }
  return res.json() as Promise<Otsumami[]>;
} 