export default function SearchBar({ city, onCityChange, onSearch, onUseLocation, disabled }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-row" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={city}
        onChange={(event) => onCityChange(event.target.value)}
        placeholder="Enter city name"
        disabled={disabled}
      />
      <button className="primary-btn" type="submit" disabled={disabled}>
        Search
      </button>
      <button className="secondary-btn" type="button" onClick={onUseLocation} disabled={disabled}>
        Use my location
      </button>
    </form>
  );
}
