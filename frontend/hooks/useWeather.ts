import { useState, useCallback } from 'react';

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
  weather: { main: string }[];
}

export function useWeather() {
  const [weatherMode, setWeatherMode] = useState<'auto' | 'manual'>('auto');
  const [manualWeather, setManualWeather] = useState<string>('晴れ');
  const [currentWeather, setCurrentWeather] = useState<string>('');
  const [weatherLoading, setWeatherLoading] = useState(false);

  const getCurrentWeather = useCallback(async () => {
    try {
      setWeatherLoading(true);
      const locationResponse = await fetch('https://ipapi.co/json/');
      const locationData = await locationResponse.json();
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      if (!apiKey) throw new Error('Weather API key not configured');
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${apiKey}&units=metric`
      );
      if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
      const weatherData: WeatherData = await weatherResponse.json();
      setCurrentWeather(mapWeatherToRecommendation(weatherData));
    } catch (error) {
      setCurrentWeather('晴れ');
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  const mapWeatherToRecommendation = (weatherData: WeatherData): string => {
    const { temperature, weather } = weatherData;
    if (temperature < 10) return '寒い';
    if (temperature > 25) return '暑い';
    if (weather[0].main.toLowerCase().includes('rain')) return '雨';
    if (weather[0].main.toLowerCase().includes('cloud')) return '曇り';
    return '晴れ';
  };

  return {
    weatherMode,
    setWeatherMode,
    manualWeather,
    setManualWeather,
    currentWeather,
    setCurrentWeather,
    weatherLoading,
    getCurrentWeather,
    mapWeatherToRecommendation,
  };
} 