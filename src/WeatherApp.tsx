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
      return "... LOADING ...";
    }
    if (weatherData) {
      return `The weather in ${weatherData?.city} (${weatherData?.country}) is ${weatherData?.temperature}º C`;
    }
    return "";
  };

  return (
    <div className="weather-app weather-app__container">
      <div className="weather-app__content">
        <h1>Search weather in a city</h1>
        <LocationForm setSubmittedCity={setSubmittedCity} />
        <p className="weather-app__result">{displayWeather()}</p>
      </div>
    </div>
  );
}

export default WeatherApp;
