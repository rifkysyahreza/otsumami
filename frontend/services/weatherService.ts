import { WeatherData, WeatherAPIResponse, LocationData } from../types/weather';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ||
const WEATHER_API_BASE =https://api.openweathermap.org/data/20.5port class WeatherService {
  static async getCurrentWeather(lat: number, lon: number): Promise<WeatherData>[object Object] try {
      const response = await fetch(
        `${WEATHER_API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data: WeatherAPIResponse = await response.json();
      
      return {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }

  static async getLocationByIP(): Promise<LocationData>[object Object] try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      return {
        lat: data.latitude,
        lon: data.longitude,
        city: data.city,
        country: data.country_name
      };
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }

  static async getLocationByCity(city: string): Promise<LocationData>[object Object] try {
      const response = await fetch(
        `${WEATHER_API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      
      return {
        lat: data.coord.lat,
        lon: data.coord.lon,
        city: data.name,
        country: data.sys.country
      };
    } catch (error) {
      console.error('Error getting location by city:', error);
      throw error;
    }
  }

  static mapWeatherToRecommendation(weatherData: WeatherData): string {
    const { temperature, condition } = weatherData;
    
    if (temperature <10) return '寒い';
    if (temperature >25) return '暑い';
    if (condition.toLowerCase().includes(rain')) return '雨';
    if (condition.toLowerCase().includes(cloud')) return 曇り';
    return '晴れ';
  }
} 