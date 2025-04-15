import React, { useState, useEffect } from 'react';

export function Weather() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch('weatherforecast');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setForecast(data);
      setLoading(false);
    } catch (e) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;
  if (!forecast) return <p>No weather data available</p>;

  return (
    <div className="weather-container">
      <h2>Jacksonville Weather</h2>
      <div className="weather-card">
        <h3>{forecast.date}</h3>
        <div className="temperature">
          <p>{forecast.temperatureF}°F / {forecast.temperatureC}°C</p>
        </div>
        <div className="forecast">
          <p><strong>{forecast.summary}</strong></p>
          <p>{forecast.detailedForecast}</p>
        </div>
      </div>
    </div>
  );
} 