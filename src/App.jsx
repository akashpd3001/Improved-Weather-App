import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import WeatherCard from './components/WeatherCard';
import { useWeather } from './hooks/useWeather';
import { normalizeCity } from './utils/normalizeCity';

export default function App() {
  const [city, setCity] = useState('');
  const [units, setUnits] = useState('metric');
  const { data, loading, error, searchByCity, searchByCoords } = useWeather();

  const handleSearch = async () => {
    const cleanCity = normalizeCity(city);
    if (!cleanCity) return;
    await searchByCity(cleanCity, units);
  };

  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported in this browser.');
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await searchByCoords(latitude, longitude, units);
      },
      () => {
        alert('Unable to get your location. Please allow location access.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <div className="app-header">
          <div>
            <p className="eyebrow">React + Netlify Functions</p>
            <h1>Weather App</h1>
            <p className="subtitle">
              Search any city and view current weather with clean loading and error handling.
            </p>
          </div>
          <UnitToggle units={units} onChange={setUnits} />
        </div>

        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
          disabled={loading}
        />

        <div className="content-area">
          {loading && <Loader />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && data && <WeatherCard data={data} units={units} />}
          {!loading && !error && !data && (
            <div className="empty-state">
              <h2>Start with a city</h2>
              <p>
                Example: Delhi, Bhubaneswar, London. You can also use the “Use my location” button.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
