"use client";

import { useState } from "react";

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

export default function Home() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState(1000);
  const [allergens, setAllergens] = useState<string[]>([]);

  const handleAllergenChange = (allergen: string) => {
    setAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For MVP, just log the values
    alert(
      `Location: ${location}\nBudget: ¥${budget}\nAllergens: ${allergens.join(", ")}`
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-50 to-green-100 p-4">
      <div className="w-full max-w-md bg-white/80 rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-500">Otsumami AI Recommender</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Tokyo"
              className="w-full rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 px-4 py-2 bg-blue-50/50 text-gray-800 placeholder-gray-400 outline-none transition"
              required
            />
          </div>
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
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
