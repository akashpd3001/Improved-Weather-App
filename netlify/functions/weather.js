const allowedUnits = new Set(['metric', 'imperial']);

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  try {
    const params = event.queryStringParameters || {};
    const city = params.city?.trim();
    const lat = params.lat;
    const lon = params.lon;
    const units = allowedUnits.has(params.units) ? params.units : 'metric';

    const hasCity = Boolean(city);
    const hasCoords = lat !== undefined && lon !== undefined;

    if (!hasCity && !hasCoords) {
      return jsonResponse(400, { error: 'Please provide a city or latitude/longitude.' });
    }

    const apiKey = process.env.OPENWEATHER_KEY;
    if (!apiKey) {
      return jsonResponse(500, { error: 'Server configuration error. Missing API key.' });
    }

    let providerUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    if (hasCity) {
      providerUrl += `q=${encodeURIComponent(city)}`;
    } else {
      providerUrl += `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
    }

    providerUrl += `&units=${encodeURIComponent(units)}&appid=${encodeURIComponent(apiKey)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    let providerResponse;
    try {
      providerResponse = await fetch(providerUrl, { signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }

    const providerData = await providerResponse.json();

    if (!providerResponse.ok) {
      const providerMessage = providerData?.message || 'Weather provider error';
      const statusCode = providerResponse.status === 404 ? 404 : providerResponse.status || 500;
      return jsonResponse(statusCode, { error: providerMessage });
    }

    const cleanData = {
      city: providerData.name,
      country: providerData.sys?.country || '',
      temperature: providerData.main?.temp,
      feelsLike: providerData.main?.feels_like,
      humidity: providerData.main?.humidity,
      wind: providerData.wind?.speed,
      condition: providerData.weather?.[0]?.main || 'Unknown',
      description: providerData.weather?.[0]?.description || 'No description available',
      icon: providerData.weather?.[0]?.icon || '01d',
      fetchedAt: new Date().toISOString(),
    };

    return jsonResponse(200, cleanData);
  } catch (error) {
    if (error.name === 'AbortError') {
      return jsonResponse(503, { error: 'Weather provider timed out. Please try again.' });
    }

    return jsonResponse(500, { error: 'Internal server error' });
  }
}
