# Weather App (Improved Architecture Version)

This project is a simple React weather app that uses a Netlify Function as a small backend helper.

## What this project does

- User enters a city name or uses current location
- Frontend sends a request to `/.netlify/functions/weather`
- Netlify runs the server-side function in `netlify/functions/weather.js`
- That function securely reads the API key from environment variables
- The function calls OpenWeather and returns only the required fields
- Frontend updates loading, error, and success states

## Folder meaning

- `src/App.jsx` -> main frontend logic and UI flow
- `src/components/` -> small UI pieces like SearchBar and WeatherCard
- `src/hooks/useWeather.js` -> reusable weather-fetching logic
- `src/services/weatherApi.js` -> frontend request layer to Netlify Function
- `src/utils/` -> helper functions for formatting and cleaning input
- `netlify/functions/weather.js` -> mini backend / serverless function

## Run locally

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the root folder and add:

```env
OPENWEATHER_KEY=your_openweather_api_key_here
```

3. Start the frontend

```bash
npm run dev
```

## Deploy to Netlify

1. Push this project to GitHub
2. Import the repo into Netlify
3. Set environment variable in Netlify:
   - `OPENWEATHER_KEY`
4. Netlify will use:
   - build command: `npm run build`
   - publish directory: `dist`
   - functions directory: `netlify/functions`

## Interview explanation

**How frontend talks to Netlify Function:**

"The frontend uses `fetch` to call a route like `/.netlify/functions/weather`. Netlify maps that route to the serverless function file inside `netlify/functions/weather.js`. That function runs on the server side, reads the API key securely, calls the weather provider, filters the response, and sends clean JSON back to the frontend. Then React updates state and re-renders the UI." 
