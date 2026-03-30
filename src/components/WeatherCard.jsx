import { formatTemperature, formatWind, formatTime } from '../utils/formatters';

export default function WeatherCard({ data, units }) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-top">
        <div>
          <h2>
            {data.city}, {data.country}
          </h2>
          <p className="weather-meta">
            {data.condition} · {data.description}
          </p>
          <p className="weather-meta">Last updated: {formatTime(data.fetchedAt)}</p>
        </div>
        <img src={iconUrl} alt={data.condition} width="100" height="100" />
      </div>

      <div className="weather-main">
        <div className="info-pill">
          <span className="info-label">Temperature</span>
          <span className="info-value">{formatTemperature(data.temperature, units)}</span>
        </div>

        <div className="info-pill">
          <span className="info-label">Feels Like</span>
          <span className="info-value">{formatTemperature(data.feelsLike, units)}</span>
        </div>

        <div className="info-pill">
          <span className="info-label">Humidity</span>
          <span className="info-value">{data.humidity}%</span>
        </div>

        <div className="info-pill">
          <span className="info-label">Wind</span>
          <span className="info-value">{formatWind(data.wind, units)}</span>
        </div>
      </div>
    </div>
  );
}
