export interface Otsumami {
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
} 