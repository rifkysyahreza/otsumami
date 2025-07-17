"use client";

import { useState, useEffect } from "react";
import WeatherSelector from '@/components/forms/WeatherSelector';
import BudgetSelector from '@/components/forms/BudgetSelector';
import AllergenSelector from '@/components/forms/AllergenSelector';
import RecommendationCard from '@/components/ui/RecommendationCard';
import { useWeather } from '@/hooks/useWeather';
import { useRecommendations } from '@/hooks/useRecommendations';
import { Otsumami } from '@/types/otsumami';
const WEATHER_OPTIONS = [
  { value: "晴れ", label: "晴れ (Sunny)" },
  { value: "雨", label: "雨 (Rain)" },
  { value: "曇り", label: "曇り (Cloudy)" },
  { value: "寒い", label: "寒い (Cold)" },
  { value: "暑い", label: "暑い (Hot)" },
];

const BUDGET_OPTIONS = [
  { value: 500, label: "¥500 (Under ¥500)" },
  { value: 1000, label: "¥1000 (Under ¥1000)" },
  { value: 1500, label: "¥1500 (Under ¥1500)" },
  { value: 2000, label: "¥2000 (Under ¥2000)" },
  { value: 3000, label: "¥3000 (Under ¥3000)" },
  { value: 5000, label: "¥5000 (Under ¥5000)" }
];

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
  const [budget, setBudget] = useState<number>(1000);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  
  const {
    weatherMode, 
    setWeatherMode, 
    manualWeather, 
    setManualWeather, 
    currentWeather, 
    weatherLoading, 
    getCurrentWeather 
  } = useWeather();
  
  const { recommendations, loading: recLoading, error: recError, fetchRecommendations } = useRecommendations();

  // Get current weather when auto mode is selected
  useEffect(() => {
    if (weatherMode === 'auto') {
      getCurrentWeather();
    }
  }, [weatherMode, getCurrentWeather]);

  const handleGetRecommendations = () => {
    const weather = weatherMode === 'auto' ? currentWeather : manualWeather;
    if (!weather) return;
    
    fetchRecommendations({
      weather,
      budget,
      allergens: selectedAllergens
    });
  };

  const handleAllergenChange = (allergen: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            おつまみ推薦
          </h1>
          <p className="text-gray-600">
            Find the perfect Japanese drinking snacks for your mood and budget
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Weather</h2>
            <WeatherSelector 
              weatherMode={weatherMode}
              manualWeather={manualWeather}
              onWeatherModeChange={setWeatherMode}
              onManualWeatherChange={setManualWeather}
              weatherOptions={WEATHER_OPTIONS}
              loading={weatherLoading}
              currentWeather={currentWeather}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Budget Range</h2>
            <BudgetSelector 
              budget={budget}
              onBudgetChange={setBudget}
              budgetOptions={BUDGET_OPTIONS}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Allergens to Avoid</h2>
            <AllergenSelector 
              selectedAllergens={selectedAllergens}
              onAllergenChange={handleAllergenChange}
              allergens={ALLERGENS}
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleGetRecommendations}
            disabled={weatherLoading || recLoading}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            {recLoading ? 'Finding recommendations...' : 'Get Recommendations'}
          </button>
        </div>

        {recError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6">
            {recError}
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Recommended Otsumami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((otsumami: Otsumami) => (
                <RecommendationCard key={otsumami.id} item={otsumami} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
