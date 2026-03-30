const BASE_URL = '/.netlify/functions/weather';

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch weather');
  }

  return data;
}

export async function fetchWeatherByCity(city, units = 'metric', signal) {
  const params = new URLSearchParams({ city, units });
  const response = await fetch(`${BASE_URL}?${params.toString()}`, { signal });
  return handleResponse(response);
}

export async function fetchWeatherByCoords(lat, lon, units = 'metric', signal) {
  const params = new URLSearchParams({ lat: String(lat), lon: String(lon), units });
  const response = await fetch(`${BASE_URL}?${params.toString()}`, { signal });
  return handleResponse(response);
}
