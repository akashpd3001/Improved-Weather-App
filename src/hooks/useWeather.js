import { useRef, useState } from 'react';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../services/weatherApi';

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const runRequest = async (requestFn) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError('');

    try {
      const result = await requestFn(controller.signal);
      setData(result);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setData(null);
      setError(err.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const searchByCity = async (city, units) => {
    await runRequest((signal) => fetchWeatherByCity(city, units, signal));
  };

  const searchByCoords = async (lat, lon, units) => {
    await runRequest((signal) => fetchWeatherByCoords(lat, lon, units, signal));
  };

  return {
    data,
    loading,
    error,
    searchByCity,
    searchByCoords,
  };
}
