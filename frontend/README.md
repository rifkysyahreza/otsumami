# Otsumami Frontend

This is the frontend for the Otsumami Weather Recommender, built with Next.js14 and TypeScript.

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   └── page.tsx           # Main application page
├── components/             # React components
│   ├── forms/             # Form components
│   │   ├── WeatherSelector.tsx
│   │   ├── BudgetSelector.tsx
│   │   └── AllergenSelector.tsx
│   └── ui/                # UI components
│       └── RecommendationCard.tsx
├── hooks/                 # Custom React hooks
│   ├── useWeather.ts
│   └── useRecommendations.ts
├── services/              # API services
├── types/                 # TypeScript type definitions
│   └── otsumami.ts
└── package.json
```

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp ../env.example .env.local
```

Edit `.env.local` and add your OpenWeatherMap API key:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:800``

3. **Start the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

### Components

- **WeatherSelector**: Handles weather selection (auto/manual mode)
- **BudgetSelector**: Manages budget range selection
- **AllergenSelector**: Manages allergen preferences
- **RecommendationCard**: Displays individual otsumami recommendations

### Hooks

- **useWeather**: Manages weather state and OpenWeatherMap API integration
- **useRecommendations**: Handles recommendation fetching from backend API

### Types

- **Otsumami**: TypeScript interface for otsumami data structure
- **RecommendationRequest**: Interface for API request payload

## Development

### Adding New Components

1. Create component in appropriate directory (`components/forms/` or `components/ui/`)
2. Define TypeScript interface for props
3. Export as default component4 Import and use in `app/page.tsx`

### Adding New Hooks
1. Create hook in `hooks/` directory
2. Define return type interface
3. Export hook function4 Import and use in components

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
