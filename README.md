# Otsumami Weather Recommender

An AI-powered Japanese otsumami (drinking snacks) recommendation app that suggests perfect snacks based on current weather conditions, budget, and dietary restrictions.

## DISCLAIMER
This project is build by using **Vibe Coding** method as my educational purpose

## Features

- **Weather-Based Recommendations**: Automatically detects current weather or allows manual selection
- **Budget Filtering**: Choose from predefined budget ranges (¥500-¥5000)
- **Allergen Filtering**: Avoid specific allergens in recommendations
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Weather Integration**: Uses OpenWeatherMap API for current weather data
- **Modular Architecture**: Clean separation of components, hooks, and services

## Technologies Used

### Frontend
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Hooks

### Backend
- FastAPI
- Pydantic
- Python 3.8+

### APIs
- OpenWeatherMap API for weather data
- IP Geolocation for location detection

## Project Structure

```
Otsumami/
├── frontend/                 # Next.js frontend
│   ├── app/                 # Next.js app directory
│   │   └── page.tsx        # Main application page
│   ├── components/          # React components
│   │   ├── forms/          # Form components
│   │   │   ├── WeatherSelector.tsx
│   │   │   ├── BudgetSelector.tsx
│   │   │   └── AllergenSelector.tsx
│   │   └── ui/             # UI components
│   │       └── RecommendationCard.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useWeather.ts
│   │   └── useRecommendations.ts
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   │   └── otsumami.ts
│   └── package.json
├── backend/                 # FastAPI backend
│   ├── main.py             # Main FastAPI application
│   └── requirements.txt    # Python dependencies
├── dataset/                # Data files
│   └── seed.json           # Otsumami dataset (100s)
└── env.example             # Environment variables template
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### 1. Environment Setup

Copy the environment template and add your API key:

inside frontend folder, create a file name `.env.local`

Edit `.env.local` and add your OpenWeatherMap API key:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:8000``
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

Backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Architecture

### Frontend Modular Structure

- **Components**: Reusable UI components separated by functionality
  - `forms/`: Form input components (weather, budget, allergens)
  - `ui/`: Display components (recommendation cards)
- **Hooks**: Custom React hooks for data management
  - `useWeather`: Weather state and API integration
  - `useRecommendations`: Recommendation fetching and state
- **Types**: TypeScript interfaces for type safety
- **Services**: API communication layer

### Backend API

- `GET /` - API information
- `GET /health` - Health check
- `POST /recommendations` - Get otsumami recommendations
- `GET /allergens` - Get available allergens
- `GET /weather-options` - Get available weather options

## Weather Integration

The app supports two weather modes:

1. **Automatic Mode**: Uses your current location to fetch real-time weather data
2. **Manual Mode**: Allows you to select weather conditions manually

Weather conditions are mapped to Japanese terms:
- 晴れ (Sunny)
- 曇り (Cloudy)
- 雨 (Rainy)
- 寒い (Cold)
- 暑い (Hot)

## Data Structure

The otsumami dataset includes100tems with:
- Basic information (name in Japanese/English)
- Price ranges and calories
- Weather compatibility
- Allergen information
- Alcohol pairing suggestions
- Flavor profiles and textures
- Regional origins
- Meal time preferences

## Development

### Adding New Components

1. Create component in appropriate directory (`components/forms/` or `components/ui/`)
2. Define TypeScript interface for props
3. Export as default component4 Import and use in `app/page.tsx`

### Adding New Hooks
1. Create hook in `hooks/` directory
2. Define return type interface
3. Export hook function4 Import and use in components

### Adding New Otsumami

Add new items to `dataset/seed.json` following the existing structure:

```json
{
      "id": 100,
      "name_kanji": "肉じゃが",
      "name_kana": "にくじゃが",
      "name_en": "Nikujaga",
      "category": "煮物",
      "subcategory": "家庭料理",
      "price_range": [400, 600],
      "calories": 250,
      "serving_temp": "hot",
      "alcohol_pairing": ["日本酒", "焼酎"],
      "allergens": ["牛肉"],
      "season": ["autumn", "winter"],
      "weather_match": ["寒い", "雨"],
      "description_jp": "じゃがいもと肉を甘辛く煮た家庭料理の定番。",
      "description_en": "Classic home-cooked dish of potatoes and meat in sweet soy sauce.",
      "popularity": 5,
      "common_places": ["居酒屋", "家庭"],
      "image_url": "https://example.com/nikujaga.jpg",
      "flavor_profile": ["sweet", "savory", "comforting"],
      "texture": ["tender", "soft", "hearty"],
      "meal_time": ["dinner", "late_night"],
      "pairing_intensity": "light",
      "regional_origin": "Nationwide"
    }
```

## Troubleshooting

### Common Issues
1. **Weather API Errors**: Ensure your OpenWeatherMap API key is valid
2. **Backend Connection Issues**: Check that the backend is running on port 8000. **CORS Errors**: The backend includes CORS middleware for localhost:3000

### Windows Installation Issues

If you encounter pydantic compilation issues on Windows:

1. Try using an older Python version (3.9 or 3.10)2tall Visual Studio Build Tools
3. Use conda instead of pip:
```bash
conda install fastapi uvicorn pydantic python-multipart
```

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions, please create an issue in the repository. 