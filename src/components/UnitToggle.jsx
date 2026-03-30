export default function UnitToggle({ units, onChange }) {
  return (
    <div className="toggle-wrap" aria-label="Temperature unit toggle">
      <button
        type="button"
        className={`toggle-btn ${units === 'metric' ? 'active' : ''}`}
        onClick={() => onChange('metric')}
      >
        °C
      </button>
      <button
        type="button"
        className={`toggle-btn ${units === 'imperial' ? 'active' : ''}`}
        onClick={() => onChange('imperial')}
      >
        °F
      </button>
    </div>
  );
}
