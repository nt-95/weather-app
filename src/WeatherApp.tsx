import "./WeatherApp.css";
import { useEffect, useState } from "react";
import { CurrentResponse } from "./types/CurrentResponse";
import LocationForm from "./widgets/LocationForm";
// import axios, { AxiosResponse } from "axios";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState({
    country: "",
    temperature: "",
    city: "",
  });
  const [submittedCity, setSubmittedCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  const APIKEY = process.env.REACT_APP_API_KEY;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${submittedCity}&appid=${APIKEY}`;

  useEffect(() => {
    if (submittedCity === "") {
      return;
    }
    async function fetchData(): Promise<any> {
      setIsWeatherLoading(true);
      try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        setWeatherData({
          country: data.sys.country,
          temperature: data.main.temp,
          city: data.name,
        });
        console.log(data);
        setErrorMessage("");
      } catch {
        setErrorMessage(`Couldn't find weather of ${submittedCity}`);
        setWeatherData({ country: "", temperature: "", city: "" });
      } finally {
        setIsWeatherLoading(false);
      }
    }
    fetchData();
  }, [submittedCity]);

  const displayWeather = (): string => {
    if (errorMessage !== "") {
      return errorMessage;
    }
    if (isWeatherLoading) {
      return "LOADING";
    }
    if (
      weatherData.country !== "" &&
      weatherData.temperature !== "" &&
      weatherData.city !== ""
    ) {
      return `${weatherData.country} - ${weatherData.city} - ${weatherData.temperature}º C`;
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
