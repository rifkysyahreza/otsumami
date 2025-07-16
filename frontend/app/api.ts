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
};

export async function fetchRecommendations(
  req: RecommendationRequest
): Promise<Otsumami[]> {
  const res = await fetch("http://localhost:8000/recommend", {
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