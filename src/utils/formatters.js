export function formatTemperature(value, units) {
  if (typeof value !== 'number') return '--';
  return `${Math.round(value)}°${units === 'metric' ? 'C' : 'F'}`;
}

export function formatWind(value, units) {
  if (typeof value !== 'number') return '--';
  return `${value.toFixed(1)} ${units === 'metric' ? 'm/s' : 'mph'}`;
}

export function formatTime(isoString) {
  if (!isoString) return '--';
  const date = new Date(isoString);
  return date.toLocaleString();
}
