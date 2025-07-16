"use client";

import { useState } from "react";
import { fetchRecommendations, RecommendationRequest, Otsumami } from "./api";

const ALLERGENS = [
  "小麦", // Wheat
  "鶏肉", // Chicken
  "大豆", // Soybean
  "豚肉", // Pork
  "魚介類", // Seafood
  "ごま", // Sesame
  "卵",   // Egg
  "ピーナッツ", // Peanut
  "乳製品", // Dairy
  "そば", // Buckwheat
  "ナッツ類" // Tree nuts
];

const WEATHER_OPTIONS = [
  { value: "晴れ", label: "晴れ (Sunny)" },
  { value: "雨", label: "雨 (Rain)" },
  { value: "曇り", label: "曇り (Cloudy)" },
  { value: "寒い", label: "寒い (Cold)" },
  { value: "暑い", label: "暑い (Hot)" },
];

export default function Home() {
  const [weather, setWeather] = useState(WEATHER_OPTIONS[0].value);
  const [budget, setBudget] = useState(1000);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Otsumami[] | null>(null);

  const handleAllergenChange = (allergen: string) => {
    setAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations(null);
    const req: RecommendationRequest = { weather, budget, allergens };
    try {
      const recs = await fetchRecommendations(req);
      setRecommendations(recs);
    } catch (err: any) {
      setError(err.message || "Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-blue-50 to-green-100 p-4">
      <div className="w-full max-w-md bg-white/80 rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-md mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-500">Otsumami AI Recommender</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <fieldset className="border-none p-0">
            <legend className="block text-sm font-medium text-gray-700 mb-2">Weather</legend>
            <div className="flex flex-wrap gap-2">
              {WEATHER_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center space-x-2 bg-blue-50/60 rounded-md px-2 py-1 cursor-pointer hover:bg-blue-100 transition">
                  <input
                    type="radio"
                    name="weather"
                    value={opt.value}
                    checked={weather === opt.value}
                    onChange={() => setWeather(opt.value)}
                    className="accent-blue-400 w-4 h-4"
                  />
                  <span className="text-xs text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget (¥)</label>
            <input
              type="number"
              min={500}
              max={2000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 px-4 py-2 bg-pink-50/50 text-gray-800 placeholder-gray-400 outline-none transition"
              required
            />
          </div>
          <fieldset className="border-none p-0">
            <legend className="block text-sm font-medium text-gray-700 mb-2">Allergens</legend>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {ALLERGENS.map((allergen) => (
                <label key={allergen} className="flex items-center space-x-2 bg-green-50/60 rounded-md px-2 py-1 cursor-pointer hover:bg-green-100 transition">
                  <input
                    type="checkbox"
                    checked={allergens.includes(allergen)}
                    onChange={() => handleAllergenChange(allergen)}
                    className="accent-pink-400 w-4 h-4"
                  />
                  <span className="text-xs text-gray-700">{allergen}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-300 via-blue-200 to-green-200 text-blue-900 font-semibold shadow hover:from-pink-200 hover:to-green-100 transition text-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
      {recommendations && (
        <div className="w-full max-w-2xl bg-white/80 rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-md">
          <h2 className="text-xl font-bold text-blue-500 mb-4 text-center">Recommended Otsumami</h2>
          {recommendations.length === 0 ? (
            <div className="text-center text-gray-500">No recommendations found for your criteria.</div>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {recommendations.map((item) => (
                <li key={item.id} className="flex flex-col items-center bg-pink-50/60 rounded-lg p-4 shadow hover:bg-pink-100 transition">
                  <img
                    src={item.image_url}
                    alt={item.name_en}
                    className="w-24 h-24 object-cover rounded mb-2 border border-pink-200"
                  />
                  <div className="font-bold text-blue-700 text-lg mb-1">{item.name_en} <span className="text-xs text-gray-500">({item.name_kanji})</span></div>
                  <div className="text-sm text-gray-700 mb-1">{item.description_en}</div>
                  <div className="text-xs text-gray-500 mb-1">Category: {item.category} / {item.subcategory}</div>
                  <div className="text-xs text-gray-500 mb-1">Price: ¥{item.price_range[0]}–{item.price_range[1]}</div>
                  <div className="text-xs text-gray-500 mb-1">Calories: {item.calories} kcal</div>
                  <div className="text-xs text-gray-500">Pairs with: {item.alcohol_pairing.join(", ")}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
