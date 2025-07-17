import React from 'react';

interface WeatherSelectorProps {
  weatherMode: 'auto' | 'manual';
  manualWeather: string;
  onWeatherModeChange: (mode: 'auto' | 'manual') => void;
  onManualWeatherChange: (weather: string) => void;
  weatherOptions: { value: string; label: string }[];
  loading?: boolean;
  currentWeather?: string;
}

export const WeatherSelector: React.FC<WeatherSelectorProps> = ({
  weatherMode,
  manualWeather,
  onWeatherModeChange,
  onManualWeatherChange,
  weatherOptions,
  loading = false,
  currentWeather
}) => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-700">Weather Selection</label>
    <div className="flex space-x-4">
      <label className="flex items-center space-x-2 bg-blue-50/60 rounded-md px-2 py-1 cursor-pointer hover:bg-blue-100 transition">
        <input
          type="radio"
          name="weatherMode"
          value="auto"
          checked={weatherMode === 'auto'}
          onChange={() => onWeatherModeChange('auto')}
          className="accent-blue-400 w-4 h-4"
        />
        <span className="text-xs text-gray-700">Current Weather</span>
      </label>
      <label className="flex items-center space-x-2 bg-blue-50/60 rounded-md px-2 py-1 cursor-pointer hover:bg-blue-100 transition">
        <input
          type="radio"
          name="weatherMode"
          value="manual"
          checked={weatherMode === 'manual'}
          onChange={() => onWeatherModeChange('manual')}
          className="accent-blue-400 w-4 h-4"
        />
        <span className="text-xs text-gray-700">Manual Selection</span>
      </label>
    </div>
    {weatherMode === 'auto' && currentWeather && (
      <div className="p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          Current Weather: <span className="font-medium">{currentWeather}</span>
        </p>
        {loading && <p className="text-xs text-blue-600">Loading weather data...</p>}
      </div>
    )}
    {weatherMode === 'manual' && (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Weather Condition</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {weatherOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="manualWeather"
                value={option.value}
                checked={manualWeather === option.value}
                onChange={() => onManualWeatherChange(option.value)}
                className="accent-blue-400 w-4 h-4"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default WeatherSelector; 