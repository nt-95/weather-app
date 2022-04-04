import "./WeatherApp.css";
import { useEffect, useState } from "react";
import LocationForm from "./widgets/LocationForm";
import { WeatherData } from "./models/weatherDataInterface";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  );
  const [submittedCity, setSubmittedCity] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!submittedCity) {
      return;
    }
    async function fetchData(): Promise<void> {
      setIsWeatherLoading(true);
      const APIKEY = process.env.REACT_APP_API_KEY;
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${submittedCity}&appid=${APIKEY}`;
      try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        setWeatherData({
          country: data.sys.country,
          temperature: data.main.temp,
          city: data.name,
        });
        setErrorMessage(undefined);
      } catch {
        setWeatherData(undefined);
        setErrorMessage(`Couldn't find weather of ${submittedCity}`);
      } finally {
        setIsWeatherLoading(false);
      }
    }
    fetchData();
  }, [submittedCity]);

  const displayWeather = (): string => {
    if (errorMessage) {
      return errorMessage;
    }
    if (isWeatherLoading) {
      return "LOADING";
    }
    if (weatherData) {
      return `${weatherData?.country} - ${weatherData?.city} - ${weatherData?.temperature}º C`;
    }
    return "";
  };

  return (
    <div className="weather-app">
      <LocationForm setSubmittedCity={setSubmittedCity} />
      <p>{displayWeather()}</p>
    </div>
  );
}

export default WeatherApp;
